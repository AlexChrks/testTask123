import { useState } from "react";
import "./App.css";

type Question = {
	text: string;
	options: string[];
};

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([]);

	const [newQuestionName, setNewQuestionName] = useState("");
	const [newOptionName, senNewOptionName] = useState("");

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
	};

	return (
		<>
			<div>
				{questions?.map(({ text, options }) => (
					<div>
						<div key={text}>{text}</div>
						<div>
							{options?.map((option) => (
								<span>{option}</span>
							))}
						</div>
					</div>
				))}
			</div>
			<div>
				<input
					value={newQuestionName}
					placeholder="Question text"
					onChange={handleQuestionTextChange}
				/>

				<input
					value={newOptionName}
					placeholder="Answer option text"
					onChange={handleOptionTextChange}
				/>
				<button onClick={addOption}>Add answer option</button>

				<button onClick={addQuestion}>Add question</button>
			</div>
		</>
	);
}

export default App;
