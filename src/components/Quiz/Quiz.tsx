import { useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {
  const [answer, setAnswer] = useState("");

  const handleChosenAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  return (
    <div className="px-4">
      <QuizHeader />
      <QuizQuestion answer={answer} handleChosenAnswer={handleChosenAnswer} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
};

export default Quiz;
