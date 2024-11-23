import { createSelector } from "reselect";
import { RootState } from "../index";

export const selectSentDrafts = createSelector(
  (state: RootState) => state.drafts.drafts,
  (drafts) => drafts.filter((draft) => draft.status === "Sent")
);
