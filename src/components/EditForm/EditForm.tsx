import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { quizesActions } from "../../redux/quizes-slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Question, QuizType } from "../../shared.types";

interface Errors {
  title?: string;
  [key: string]: string | undefined;
}

const EditForm = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quiz = useAppSelector((state) =>
    state.quizes.quizes.find((quiz: QuizType) => quiz.title === quizId)
  );

  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      options: [{ id: "1", text: "" }],
      correctOptionId: "1",
    },
  ]);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!title) {
      newErrors.title = "Title is required";
    }
    questions.forEach((q, qIndex) => {
      if (!q.question) {
        newErrors[`question-${q.id}`] = `Question #${qIndex + 1} is required`;
      }
      q.options.forEach((option, oIndex) => {
        if (!option.text) {
          newErrors[`option-${q.id}-${option.id}`] = `Option #${
            oIndex + 1
          } for Question #${qIndex + 1} is required`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateQuiz = () => {
    if (validateForm()) {
      dispatch(quizesActions.updateQuiz({ title, questions }));
      navigate("/");
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: (questions.length + 1).toString(),
        question: "",
        options: [{ id: "1", text: "" }],
        correctOptionId: "1",
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: string, newQuestion: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: newQuestion } : q))
    );
  };

  const handleOptionChange = (
    questionId: string,
    optionId: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text } : opt
              ),
            }
          : q
      )
    );
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: (q.options.length + 1).toString(), text: "" },
              ],
            }
          : q
      )
    );
  };

  const handleRemoveOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      )
    );
  };

  const handleCorrectOptionChange = (
    questionId: string,
    correctOptionId: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctOptionId } : q
      )
    );
  };

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] lg:w-[70%] p-8 border-2 border-stone-500 rounded-xl mt-8 flex flex-col gap-2">
        <p>
          <Link to="/" className="border-2 border-stone-500 rounded-xl p-2">
            Back
          </Link>
        </p>
        <h1>Edit Quiz</h1>
        <div className="flex flex-col">
          <label htmlFor="title">Title (title should be unique)</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-stone-500 rounded-xl p-2"
            required
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        {questions.map((q, qIndex) => (
          <div key={q.id} className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <label htmlFor={`question-${q.id}`}>Question #{qIndex + 1}</label>
              <button
                onClick={() => handleRemoveQuestion(q.id)}
                className="border-2 border-red-500 text-red-500 rounded-xl p-2 my-2"
                disabled={questions.length === 1}
              >
                Remove Question
              </button>
            </div>
            <input
              type="text"
              name={`question-${q.id}`}
              id={`question-${q.id}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(q.id, e.target.value)}
              className="border-2 border-stone-500 rounded-xl p-2"
              required
            />
            {errors[`question-${q.id}`] && (
              <p className="text-red-500">{errors[`question-${q.id}`]}</p>
            )}
            <div className="flex flex-col mt-4">
              <label>Options</label>
              {q.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(q.id, option.id, e.target.value)
                    }
                    required
                    className="border-2 border-stone-500 rounded-xl p-2 flex-1"
                  />
                  {errors[`option-${q.id}-${option.id}`] && (
                    <p className="text-red-500">
                      {errors[`option-${q.id}-${option.id}`]}
                    </p>
                  )}
                  <button
                    onClick={() => handleRemoveOption(q.id, option.id)}
                    className="border-2 border-red-500 text-red-500 rounded-xl p-2"
                    disabled={q.options.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddOption(q.id)}
                className="border-2 border-green-500 text-green-500 rounded-xl p-2 mt-2"
              >
                Add Option
              </button>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor={`correctOption-${q.id}`}>Correct Answer</label>
              <select
                id={`correctOption-${q.id}`}
                value={q.correctOptionId}
                onChange={(e) =>
                  handleCorrectOptionChange(q.id, e.target.value)
                }
                className="border-2 border-stone-500 rounded-xl p-2"
              >
                {q.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text || `Option ${option.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="mt-4 border-2 border-green-500 text-green-500 rounded-xl p-2"
        >
          Add Question
        </button>
        <button
          onClick={updateQuiz}
          className="mt-4 border-2 border-blue-500 text-blue-500 rounded-xl p-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditForm;
