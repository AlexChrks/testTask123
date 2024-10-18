import React from "react";
import { Box } from "@mui/system";
import styles from "./Question.module.css";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
const Question = ({ text, options, index, handleDelete }) => (
  <Draggable draggableId={text + index} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={styles.question}
        key={text}
      >
        <Box className={styles.questionAnswersWrapper}>
          <Box>{text}</Box>
          <Box className={styles.answers}>
            {options?.map((option) => (
              <Box className={styles.answer}>{option}</Box>
            ))}
          </Box>
        </Box>

        <Box
          className={styles.deleteBtn}
          onClick={() => handleDelete(text, index)}
        >
          <DeleteIcon />
        </Box>
      </div>
    )}
  </Draggable>
);

export default Question;
