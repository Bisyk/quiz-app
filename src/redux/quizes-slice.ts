import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizes: JSON.parse(localStorage.getItem("quizes") || "[]"),
};

const quizesSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    getQuizes: (state) => state.quizes,
    addQuiz: (state, action) => {
      state.quizes.push(action.payload);
      localStorage.setItem("quizes", JSON.stringify(state.quizes));
    },
  },
});

export const quizesActions = quizesSlice.actions;
export default quizesSlice.reducer;
