import { Question } from "../../shared.types";

type HomeProps = {
  quizes: { title: string; questions: Question[] }[];
  onQuizSelect: (title: string) => void;
};

const Home = ({ quizes, onQuizSelect }: HomeProps) => {
  return (
    <div>
      <p className="flex justify-between items-center px-4 mt-2 mb-2">
        My Quizes
        <button className="bg-blue-400 px-4 py-2 rounded-xl">New Quiz</button>
      </p>
      <hr></hr>
      <div>
        {quizes.map((quiz) => (
          <div
            key={quiz.title}
            className="p-4"
            onClick={() => onQuizSelect(quiz.title)}
          >
            <h2>{quiz.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
