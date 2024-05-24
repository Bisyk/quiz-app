import { Link } from "react-router-dom";

type QuizHeaderProps = {
  questionCount: number;
  quizTitle: string;
  activeQuestionNumber: number;
};

const QuizHeader = ({
  questionCount,
  quizTitle,
  activeQuestionNumber,
}: QuizHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold flex justify-between">
        {quizTitle}
        <Link to="/">Close</Link>
      </h1>
      <h2 className="text-xl font-semibold">
        Question {activeQuestionNumber}/{questionCount}
      </h2>
    </div>
  );
};

export default QuizHeader;
