import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/Home";
import QuizPage from "./pages/Quiz";
import CreatePage from "./pages/Create";
import EditPage from "./pages/Edit";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/quiz/:quizId", element: <QuizPage /> },
  { path: "/quiz/new", element: <CreatePage /> },
  { path: "/quiz/:quizId/edit", element: <EditPage /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
