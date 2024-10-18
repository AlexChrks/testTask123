import { useState } from "react";
import "./App.css";

import { Container } from "@mui/system";

import Question from "./components/Question/Question.tsx";

import Questions from "./components/Questions/Questions.tsx";
import Form from "./components/Form/Form.tsx";

type Question = {
  text: string;
  options: string[];
};

const mockQ = [
  {
    text: "How are you?",
    options: ["Fine", "Bad"],
  },
  {
    text: "What are you going to do?",
    options: ["Walk", "Sleep"],
  },
];

function App() {
  const [questions, setQuestions] = useState<Question[]>(mockQ);
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([]);

  const [newQuestionName, setNewQuestionName] = useState("");
  const [newOptionName, setNewOptionName] = useState("");

  console.log(questions);

  const isAddOptionDisabled = !Boolean(newOptionName);
  const isAddQuestionDisabled =
    !Boolean(newQuestionName) || !Boolean(newQuestionOptions.length);

  const handleQuestionTextChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewQuestionName(value);
  };

  const handleOptionTextChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewOptionName(value);
  };

  const addOption = () => {
    setNewQuestionOptions((prev) => [...prev, newOptionName]);
    setNewOptionName("");
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { text: newQuestionName, options: [...newQuestionOptions] },
    ]);
    setNewQuestionName("");
    setNewOptionName("");
    setNewQuestionOptions([]);
  };

  const removeAnswerOption = (optionIndex: number) => () => {
    const newOptions = [...newQuestionOptions];
    newOptions.splice(optionIndex, 1);

    setNewQuestionOptions([...newOptions]);
  };

  const handleQuestionDelete = (text: string, deleteIndex: number) => {
    const newQuestions = questions.filter(
      (question, questionIndex) =>
        question.text !== text && questionIndex !== deleteIndex,
    );

    // API request to update questions

    setQuestions(newQuestions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newQuestions = Array.from(questions);
    const [movedQuestion] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, movedQuestion);

    // API request to update questions order
    setQuestions(newQuestions);
  };

  return (
    <Container>
      <Form
        handleOptionTextChange={handleOptionTextChange}
        isAddOptionDisabled={isAddOptionDisabled}
        isAddQuestionDisabled={isAddQuestionDisabled}
        addQuestion={addQuestion}
        handleQuestionTextChange={handleQuestionTextChange}
        addOption={addOption}
        newOptionName={newOptionName}
        newQuestionName={newQuestionName}
        newQuestionOptions={newQuestionOptions}
        removeAnswerOption={removeAnswerOption}
      />

      <Questions
        questions={questions}
        onDragEnd={onDragEnd}
        handleQuestionDelete={handleQuestionDelete}
      />
    </Container>
  );
}

export default App;
