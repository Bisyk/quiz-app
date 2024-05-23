interface QuizQuestionProps {
  answer: string;
  handleChosenAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizQuestion = ({ answer, handleChosenAnswer }: QuizQuestionProps) => {
  return (
    <div>
      <p>What is react?</p>
      <div>
        <p className="bg-gray-400 p-2 my-2">
          <input
            type="radio"
            id="a"
            name="a"
            value="a"
            checked={answer === "a"}
            onChange={handleChosenAnswer}
          />
          <label htmlFor="a1">A</label>
        </p>
        <p className="bg-gray-400 p-2 my-2">
          <input
            type="radio"
            id="b"
            name="b"
            value="b"
            checked={answer === "b"}
            onChange={handleChosenAnswer}
          />
          <label htmlFor="b">B</label>
        </p>
        <p className="bg-gray-400 p-2 my-2">
          <input
            type="radio"
            id="c"
            name="c"
            value="c"
            checked={answer === "c"}
            onChange={handleChosenAnswer}
          />
          <label htmlFor="c">C</label>
        </p>
        <p className="bg-gray-400 p-2 my-2">
          <input
            type="radio"
            id="d"
            name="d"
            value="d"
            checked={answer === "d"}
            onChange={handleChosenAnswer}
          />
          <label htmlFor="d">D</label>
        </p>
      </div>
    </div>
  );
};

export default QuizQuestion;
