import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Draft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  name: string;
  status: "Draft" | "Sent";
  timestamp: string;
  imageUris: string[];
}

interface DraftsState {
  drafts: Draft[];
  sentEmails: Draft[];
}

const initialState: DraftsState = {
  drafts: [],
  sentEmails: [],
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    addDraft(state, action: PayloadAction<Draft>) {
      state.drafts.push(action.payload);
    },
    updateDraft(state, action: PayloadAction<Draft>) {
      const index = state.drafts.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) state.drafts[index] = action.payload;
    },
    markAsSent(state, action: PayloadAction<string>) {
      const draftIndex = state.drafts.findIndex((d) => d.id === action.payload);
      if (draftIndex !== -1) {
        const sentDraft = state.drafts.splice(draftIndex, 1)[0];
        sentDraft.status = "Sent";
        state.sentEmails.push(sentDraft);
      }
    },
    setDrafts(state, action: PayloadAction<Draft[]>) {
      state.drafts = action.payload;
    },
    removeDraft: (state, action) => {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload
      );
    },

    setSentEmails(state, action: PayloadAction<Draft[]>) {
      state.sentEmails = action.payload;
    },
    removeEmail: (state, action) => {
      state.sentEmails = state.sentEmails.filter(
        (sentEmails) => sentEmails.id !== action.payload
      );
    },
    addSentEmails(state, action: PayloadAction<Draft>) {
      state.sentEmails.push(action.payload);
    },
  },
});

export const {
  addDraft,
  updateDraft,
  markAsSent,
  setDrafts,
  setSentEmails,
  addSentEmails,
  removeDraft,
  removeEmail,
} = draftsSlice.actions;

export default draftsSlice.reducer;
