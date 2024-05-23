import { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { QuizType } from "./shared.types";

const QUIZES: QuizType[] = [
  {
    title: "ReactQuiz",
    questions: [
      {
        id: "1",
        question: "What is react?",
        options: [
          { id: "1", text: "Library" },
          { id: "2", text: "Framework" },
          { id: "3", text: "Language" },
          { id: "4", text: "Compiler" },
        ],
        answer: "1",
      },
      {
        id: "2",
        question: "What is TypeScript?",
        options: [
          { id: "1", text: "Library" },
          { id: "2", text: "Framework" },
          { id: "3", text: "Language" },
          { id: "4", text: "OS" },
        ],
        answer: "3",
      },
      {
        id: "3",
        question: "What is PHP?",
        options: [
          { id: "1", text: "Library" },
          { id: "2", text: "Framework" },
          { id: "3", text: "Language" },
          { id: "4", text: "Shit" },
        ],
        answer: "3",
      },
    ],
  },
];

const App = () => {
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);

  const handleActiveQuiz = (title: string) => {
    const quiz = QUIZES.find((quiz) => quiz.title === title);
    setActiveQuiz(quiz || null);
  };

  return (
    <div>
      {activeQuiz ? (
        <Quiz activeQuiz={activeQuiz} />
      ) : (
        <Home quizes={QUIZES} onQuizSelect={handleActiveQuiz} />
      )}
    </div>
  );
};

export default App;
