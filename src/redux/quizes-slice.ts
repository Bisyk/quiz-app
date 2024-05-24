import { createSlice } from "@reduxjs/toolkit";
import { QuizType } from "../shared.types";

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
    deleteQuiz: (state, action) => {
      state.quizes = state.quizes.filter(
        (quiz: QuizType) => quiz.title !== action.payload.title
      );
      localStorage.setItem("quizes", JSON.stringify(state.quizes));
    },
  },
});

export const quizesActions = quizesSlice.actions;
export default quizesSlice.reducer;
