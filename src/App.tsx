import { useState } from "react";
import "./App.css";

import { Box, Container, Stack } from "@mui/system";
import { Input, Button, InputLabel, List, ListItem, ListItemText } from "@mui/material";

type Question = {
	text: string;
	options: string[];
};

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([]);

	const [newQuestionName, setNewQuestionName] = useState("");
	const [newOptionName, senNewOptionName] = useState("");

	const isAddOptionDisabled = !Boolean(newOptionName);
	const isAddQuestionDisabled = !Boolean(newQuestionName) || !Boolean(newQuestionOptions.length);

	const handleQuestionTextChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = target;
		setNewQuestionName(value);
	};

	const handleOptionTextChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = target;
		senNewOptionName(value);
	};

	const addOption = () => {
		setNewQuestionOptions((prev) => [...prev, newOptionName]);
		senNewOptionName("");
	};

	const addQuestion = () => {
		setQuestions((prev) => [
			...prev,
			{ text: newQuestionName, options: [...newQuestionOptions] }
		]);
		setNewQuestionName("");
		setNewQuestionOptions([]);
	};

	const removeAnswerOption = (optionIndex: number) => () => {
		const newOptions = [...newQuestionOptions];
		newOptions.splice(optionIndex, 1);

		setNewQuestionOptions([...newOptions]);
	};

	return (
		<Container>
			<Stack>
				<InputLabel>Question text:</InputLabel>
				<Input
					value={newQuestionName}
					placeholder="Question text"
					onChange={handleQuestionTextChange}
				/>

				<List dense>
					<ListItemText primary="Answer options:" />
					{newQuestionOptions.map((option, index) => (
						<ListItem key={option}>
							<ListItemText primary={option} />
							<Button variant="text" onClick={removeAnswerOption(index)}>
								Remove
							</Button>
						</ListItem>
					))}
				</List>

				<Input
					value={newOptionName}
					placeholder="Answer option text"
					onChange={handleOptionTextChange}
				/>
				<Button disabled={isAddOptionDisabled} variant="outlined" onClick={addOption}>
					Add answer option
				</Button>
			</Stack>

			<Button disabled={isAddQuestionDisabled} variant="contained" onClick={addQuestion}>
				Add question
			</Button>

			<Stack spacing="sm">
				{questions?.map(({ text, options }) => (
					<Box key={text}>
						<h3>Question: {text}</h3>
						<h4>Answers:</h4>
						<List>
							{options?.map((option) => (
								<ListItem>{option}</ListItem>
							))}
						</List>
					</Box>
				))}
			</Stack>
		</Container>
	);
}

export default App;
