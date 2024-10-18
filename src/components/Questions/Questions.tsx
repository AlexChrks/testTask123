import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Stack } from "@mui/system";
import Question from "../Question/Question.tsx";
const Questions = ({ onDragEnd, questions, handleQuestionDelete }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <Stack
            spacing="sm"
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={"questionsWrapper"}
          >
            {questions.map(({ text, options }, index) => (
              <Question
                options={options}
                text={text}
                index={index}
                handleDelete={handleQuestionDelete}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Questions;
