import { createSlice } from "@reduxjs/toolkit";

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: { currentStep: 1, completedSteps: [] },

  reducers: {
    nextStep: (state) => {
      if (!state.completedSteps.includes(state.currentStep)) {
        state.completedSteps.push(state.currentStep);
      }

      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { actions, reducer } = stepperSlice;
export default reducer;
