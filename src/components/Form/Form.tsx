import React from "react";
import { Box } from "@mui/system";
import { Button, OutlinedInput, InputLabel } from "@mui/material";

import styles from "./Form.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const Form = ({
  newQuestionName,
  handleQuestionTextChange,
  newQuestionOptions,
  removeAnswerOption,
  newOptionName,
  handleOptionTextChange,
  isAddOptionDisabled,
  addOption,
  isAddQuestionDisabled,
  addQuestion,
}) => {
  return (
    <Box className={styles.form}>
      <Box className={styles.questionAnswersWrapper}>
        <Box className={styles.question}>
          <InputLabel>Question</InputLabel>
          <OutlinedInput
            value={newQuestionName}
            placeholder="Question text"
            onChange={handleQuestionTextChange}
            sx={{ width: "100%", marginTop: "10px" }}
          />
        </Box>

        <Box className={styles.answers}>
          <InputLabel>Answers</InputLabel>
          <OutlinedInput
            value={newOptionName}
            placeholder="Answer option text"
            onChange={handleOptionTextChange}
            sx={{ width: "100%", marginTop: "10px" }}
          />
          <Box className={styles.newAnswersWrapper}>
            {newQuestionOptions.map((option, index) => (
              <Box className={styles.answer}>
                {option}
                <Box
                  className={styles.deleteBtn}
                  onClick={removeAnswerOption(index)}
                >
                  <DeleteIcon />
                </Box>
              </Box>
            ))}
          </Box>

          <Button
            disabled={isAddOptionDisabled}
            variant="outlined"
            onClick={addOption}
          >
            Add answer option
          </Button>
        </Box>
      </Box>

      <Box className={styles.addQuestionButtonWrapper}>
        <Button
          disabled={isAddQuestionDisabled}
          variant="contained"
          onClick={addQuestion}
        >
          Add question
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
