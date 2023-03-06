import React, { useState } from "react";
import axios from "axios";

interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
}

interface JoinerViewProps {
  session: string | null;
  question: QuestionData | null;
  submitAnswer: (answer: string) => Promise<void>;
}

function JoinerView(props: JoinerViewProps): JSX.Element {
  const { session, question, submitAnswer } = props;
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = async (): Promise<void> => {
    await submitAnswer(answer);
    setAnswer("");
  };

  return (
    <div>
      <h2>Joiner View</h2>
      {session && (
        <div>
          <h3>Session: {session}</h3>
          {question && (
            <div>
              <h4>Question:</h4>
              <p>{question.question}</p>
              <ul>
                {question.choices.map((choice, i) => (
                  <li key={i}>{choice}</li>
                ))}
              </ul>
              <div>
                <label>Your Answer:</label>
                <input
                  type="text"
                  value={answer}
                  onChange={handleAnswerChange}
                />
                <button onClick={handleSubmitAnswer}>Submit Answer</button>
              </div>
            </div>
          )}
          {!question && (
            <div>
              <p>Waiting for admin to start session...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JoinerView;
