import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as shelterAPI from "../api/shelterAPI";

export const fetchShelters = createAsyncThunk("shelters/fetchAll", async () => {
  const response = await shelterAPI.fetchAll();
  return response.shelters;
});

export const sheltersSlice = createSlice({
  name: "shelters",
  initialState: { entities: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShelters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShelters.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(fetchShelters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { actions, reducer } = sheltersSlice;
export default reducer;
