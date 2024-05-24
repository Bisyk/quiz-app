import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { QuizType } from "../../shared.types";
import { quizesActions } from "../../redux/quizes-slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const quizes = useAppSelector((state) => state.quizes.quizes);

  const handleDeleteQuiz = (title: string) => {
    dispatch(quizesActions.deleteQuiz({ title: title }));
  };

  return (
    <div>
      <p className="flex justify-between items-center px-4 mt-2 mb-2">
        My Quizes
        <Link to="/quiz/new">
          <button className="bg-blue-400 px-4 py-2 rounded-xl">New Quiz</button>
        </Link>
      </p>
      <hr></hr>
      <div className="">
        {quizes.map((quiz: QuizType) => (
          <div className="flex w-full px-2" key={quiz.title}>
            <div className="w-[94%]">
              <Link to={`/quiz/${quiz.title}`} key={quiz.title}>
                <div className="flex justify-between p-4 mr-2 border border-gray-400 rounded-xl my-2 cursor-pointer hover:bg-slate-200 duration-300">
                  <h2>{quiz.title}</h2>
                </div>
              </Link>
            </div>
            <div className="flex gap-4">
              <Link to={`/quiz/${quiz.title}/edit`} className="flex">
                <button className="text-blue-400 font-semibold">Edit</button>
              </Link>
              <button
                onClick={() => handleDeleteQuiz(quiz.title)}
                className="text-rose-400 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
