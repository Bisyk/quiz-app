import { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import { QuizType } from "../../shared.types";

type QuizProps = {
  activeQuiz: QuizType;
};

const Quiz = ({ activeQuiz }: QuizProps) => {
  const [answer, setAnswer] = useState("");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const activeQuestion = activeQuiz.questions[activeQuestionIdx];
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
      {activeQuiz.questions.length < activeQuestionNumber ? (
        <p className="text-3xl font-bold text-center">
          Quiz is OVER! You got {correctAnswers} out of{" "}
          {activeQuiz.questions.length}
        </p>
      ) : (
        <>
          <QuizHeader
            quizTitle={activeQuiz.title}
            questionCount={activeQuiz.questions.length}
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
