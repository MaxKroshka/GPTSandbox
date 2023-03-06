import React, { useState } from "react";
import axios from "axios";

interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
}

interface AdminViewProps {
  session: string | null;
  question: QuestionData | null;
  startSession: () => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
}

function AdminView(props: AdminViewProps): JSX.Element {
  const { session, question, startSession, submitAnswer } = props;
  const [numRounds, setNumRounds] = useState<number>(0);
  const [roundLength, setRoundLength] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const handleNumRoundsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNumRounds(Number(e.target.value));
  };

  const handleRoundLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRoundLength(Number(e.target.value));
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswer(e.target.value);
  };

  const handleStartSession = async (): Promise<void> => {
    await startSession();
  };

  const handleSubmitAnswer = async (): Promise<void> => {
    await submitAnswer(answer);
    setAnswer("");
  };

  return (
    <div>
      <h2>Admin View</h2>
      {!session && (
        <div>
          <label>Number of Rounds:</label>
          <input
            type="number"
            value={numRounds}
            onChange={handleNumRoundsChange}
          />
          <label>Round Length (in seconds):</label>
          <input
            type="number"
            value={roundLength}
            onChange={handleRoundLengthChange}
          />
          <button onClick={() => createSession(numRounds, roundLength)}>
            Create Session
          </button>
        </div>
      )}
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
              <button onClick={handleStartSession}>Start Session</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminView;
