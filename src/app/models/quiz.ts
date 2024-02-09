import { IQuestion } from "./question";

export interface IQuiz {
    id?: number;
    name: string;
    complexity: number;
    questions?: IQuestion[];
}