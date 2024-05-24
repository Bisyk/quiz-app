type Option = { id: string; text: string };

export type Question = {
  id: string;
  question: string;
  options: Option[];
  correctOptionId: string;
};

export interface QuizType {
  title: string;
  questions: {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
    }[];
    answer: string;
  }[];
}
