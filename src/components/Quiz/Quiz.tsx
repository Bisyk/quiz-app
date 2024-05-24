import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { QuizType } from "../../shared.types";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {
  const params = useParams();
  const quizes = useAppSelector((state) => state.quizes.quizes);
  const activeQuiz = quizes.find(
    (quiz: QuizType) => quiz.title === params.quizId
  );
  const [answer, setAnswer] = useState("");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const activeQuestion = activeQuiz.questions[activeQuestionIdx];
  const activeQuestionNumber = activeQuestionIdx + 1;
  const initialTimer = 5;
  const [timer, setTimer] = useState(initialTimer);

  const handleChosenAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSetActiveQuestionIdx = () => {
    setActiveQuestionIdx((prev) => prev + 1);
    if (answer && answer === activeQuestion.correctOptionId) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setTimer(initialTimer);
    setAnswer("");
  };

  useEffect(() => {
    if (!activeQuiz) return;

    if (activeQuestionNumber > activeQuiz.questions.length) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          if (answer === "") {
            setActiveQuestionIdx((prev) => prev + 1);
            setTimer(initialTimer);
          } else {
            handleSetActiveQuestionIdx();
          }
          return initialTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeQuestionIdx, activeQuiz, answer]);

  return (
    <div className="px-4">
      {activeQuiz.questions.length < activeQuestionNumber ? (
        <div>
          <p className="text-3xl font-bold text-center">
            Quiz is OVER! You got {correctAnswers} out of{" "}
            {activeQuiz.questions.length}
          </p>
          <p className="text-center">
            <Link to="/">Go back</Link>
          </p>
        </div>
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
          <div className="fixed bottom-4 right-4 bg-white p-2 border-2 border-stone-500 rounded-xl">
            Time left: {timer} seconds
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
