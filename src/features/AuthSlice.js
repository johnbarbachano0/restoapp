import { createSlice } from "@reduxjs/toolkit";
import { addMinutes } from "../components/misc";

const initialState = {
  value: {
    authData: {
      idToken: null,
      email: null,
      expiresIn: null,
      localId: null,
      refreshToken: null,
    },
  },
};

// const initialState = {
//   value: {
//     authData: {
//       kind: "identitytoolkit#VerifyPasswordResponse",
//       localId: "SeRchT20mggsfyLBtmTrLkQFarf1",
//       email: "john.barbachano0@gmail.com",
//       displayName: "",
//       idToken:
//         "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzdG8tZmZkM2YiLCJhdWQiOiJyZXN0by1mZmQzZiIsImF1dGhfdGltZSI6MTY1NTUxNTg3NiwidXNlcl9pZCI6IlNlUmNoVDIwbWdnc2Z5TEJ0bVRyTGtRRmFyZjEiLCJzdWIiOiJTZVJjaFQyMG1nZ3NmeUxCdG1UckxrUUZhcmYxIiwiaWF0IjoxNjU1NTE1ODc2LCJleHAiOjE2NTU1MTk0NzYsImVtYWlsIjoiam9obi5iYXJiYWNoYW5vMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiam9obi5iYXJiYWNoYW5vMEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.j4x9tI8xe1uJEJRbi57DNvY-lWcE2hT_xcz2DCNdJnAcVmJBodgHkChnBpLvV6ODPEpDvWqJsTXCkz3oQEibnQyfCzos2wVGoIABEFlJd9Gl6cAOqXBQB0owe_RFL33GT5cdZf3z5hzZZr0dgwE9A0SZkYm3VVYj6j-P8qPlVgaSM3t1G7j1swZslEqv4UsYstfGqs9ovUcXMFv8zNK1HOXlhQzh9mw4qulbJjCRAB2i35ErHdnQmnrtmh6AUyEonMywPySA29HrtjeuOJ_85BX0JVWt1hiPn8iYPeI08DgHq5JVZNFSFrTzQMtX4rBmEq7vA2w5FY5_rpm0zURflQ",
//       registered: true,
//       refreshToken:
//         "AIwUaOnT2KOkELD8Po9kgW1kFpnIs3KoPN3fkXS6KYH-TbOp7zi74Cy_mJvSwUAl1FYkYgPeek5B1ubzQWzXQlym8f5wZnZ1tFCHQowa0Wc183cLPW7O5-OqOIzyueLcXAIdiuI_YNjz9wHwUevCy0DOgegHFqyJCXlaX68-1t5_sBWC8gTHxCuqO9j30F0CmdqzUrZ5qAQui7up3AnMUHGBlHO6ECf2Qw",
//       expiresIn: "3600",
//       loginDate: "2022-06-18T01:31:17.041Z",
//       expiryDate: "2022-06-18T02:31:17.041Z",
//     },
//   },
// };

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { authData } = action.payload;
      const newAuthData = {
        ...authData,
        loginDate: new Date(Date.now()).toISOString(),
        expiryDate: addMinutes(new Date(Date.now()), 60).toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(newAuthData));
      state.value.authData = newAuthData;
    },
    setLogout: (state, action) => {
      state.value.authData = initialState.value.authData;
    },
  },
});

export const { setAuthData, setLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
