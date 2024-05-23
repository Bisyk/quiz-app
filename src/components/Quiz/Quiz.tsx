import { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";

const QUIZ = {
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
};

const Quiz = () => {
  const [answer, setAnswer] = useState("");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const activeQuestion = QUIZ.questions[activeQuestionIdx];
  const activeQuestionNumber = activeQuestionIdx + 1;
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleChosenAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSetActiveQuestionIdx = () => {
    setActiveQuestionIdx((prev) => prev + 1);
    if (answer === activeQuestion.answer) setCorrectAnswers((prev) => prev + 1);
    setAnswer("");
  };

  return (
    <div className="px-4">
      {QUIZ.questions.length < activeQuestionNumber ? (
        <p className="text-3xl font-bold text-center">
          Quiz is OVER! You got {correctAnswers} out of {QUIZ.questions.length}
        </p>
      ) : (
        <>
          <QuizHeader
            quizTitle={QUIZ.title}
            questionCount={QUIZ.questions.length}
            activeQuestionNumber={activeQuestionNumber}
          />
          <QuizQuestion
            answer={answer}
            handleChosenAnswer={handleChosenAnswer}
            question={activeQuestion}
          />
          <button
            onClick={handleSetActiveQuestionIdx}
            className={`${
              answer === ""
                ? "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            disabled={answer === ""}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
