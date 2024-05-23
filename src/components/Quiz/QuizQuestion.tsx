type Option = { id: string; text: string };

type QuizQuestionProps = {
  answer: string;
  handleChosenAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  question: {
    id: string;
    question: string;
    options: Option[];
    answer: string;
  };
};

const QuizQuestion = ({
  answer,
  handleChosenAnswer,
  question,
}: QuizQuestionProps) => {
  return (
    <div>
      <p>{question.question}</p>
      <div>
        {question.options.map((option) => (
          <p key={option.id} className="bg-gray-400 p-2 my-2 rounded">
            <input
              type="radio"
              id={option.id}
              name={option.id}
              value={option.id}
              checked={answer === option.id}
              onChange={handleChosenAnswer}
            />
            <label htmlFor={option.id}>{option.text}</label>
          </p>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
