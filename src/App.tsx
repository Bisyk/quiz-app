import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import QuizPage from "./pages/Quiz";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/quiz/:quizId", element: <QuizPage /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
