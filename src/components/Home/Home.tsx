import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { QuizType } from "../../shared.types";

const Home = () => {
  const quizes = useAppSelector((state) => state.quizes.quizes);

  return (
    <div>
      <p className="flex justify-between items-center px-4 mt-2 mb-2">
        My Quizes
        <Link to="/quiz/new">
          <button className="bg-blue-400 px-4 py-2 rounded-xl">New Quiz</button>
        </Link>
      </p>
      <hr></hr>
      <div>
        {quizes.map((quiz: QuizType) => (
          <Link to={`/quiz/${quiz.title}`} key={quiz.title}>
            <div
              key={quiz.title}
              className="p-4 mx-4 border border-gray-400 rounded-xl my-2 cursor-pointer hover:bg-slate-200 duration-300"
            >
              <h2>{quiz.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
