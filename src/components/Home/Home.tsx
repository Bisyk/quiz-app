import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { QuizType } from "../../shared.types";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    localStorage.setItem(
      "quizes",
      JSON.stringify([
        {
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
        },
        {
          title: "ReactQuiz2",
          questions: [
            {
              id: "1",
              question: "What is react2?",
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
              question: "What is TypeScript?2",
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
        },
      ])
    );
  });

  const quizes = useAppSelector((state) => state.quizes.quizes);

  console.log(quizes);

  return (
    <div>
      <p className="flex justify-between items-center px-4 mt-2 mb-2">
        My Quizes
        <button className="bg-blue-400 px-4 py-2 rounded-xl">New Quiz</button>
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
