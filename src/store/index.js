import { configureStore } from "@reduxjs/toolkit";
import { reducer as sheltersReducer } from "./shelters";
import { reducer as formReducer } from "redux-form";
import { reducer as stepperReducer } from "./stepper";

export default configureStore({
  reducer: {
    form: formReducer,
    shelters: sheltersReducer,
    stepper: stepperReducer,
  },
});
