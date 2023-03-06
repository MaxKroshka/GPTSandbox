export interface SessionData {
  numRounds: number;
  roundLength: number;
}

export interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
}
