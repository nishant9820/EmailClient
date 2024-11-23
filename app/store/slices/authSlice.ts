import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: { email: string; isAuthenticated: boolean } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.user = { email: action.payload.email, isAuthenticated: true };
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

// Async Actions
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    if (email === "nishdesai676@gmail.com" && password === "Deepak9820@") {
      const userData = { email, isAuthenticated: true };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      dispatch(loginSuccess({ email }));
      return true;
    } else {
      return false;
    }
  };

export const logout = () => async (dispatch: any) => {
  await AsyncStorage.removeItem("user");
  dispatch(logoutSuccess());
};
