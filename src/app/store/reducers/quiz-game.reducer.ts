import { createReducer, on } from "@ngrx/store"
import { addedHistoryQuizzesSuccess, answerRight, answerSelect, answerWrong, closeGame, nextQuestion, previousQuestion, startGameSuccess } from "../actions/quiz-game.actions"
import { IQuestion } from "../models/question"
import { IQuiz } from "../models/quiz"
import { IAnswer } from "../models/answer"
import { GameButtons } from "../models/game-buttons"
import { IHistory } from "../models/history"

// todo Тут появляется важный вопрос. С обной стороны данный редьюсер и стайт кажется мне слишком раздутым, хочется разбить на части
// Но с другой стороны, не совсем понятно как это грамотно сделать. Мои попытки наткнылись на подводные камни
export interface GameState {
    quiz: IQuiz | null                 // квиз в который играем
    questions: IQuestion[] | null      // вопросы квиза в который играем
    currentQuestion: IQuestion | null  // текущий вопрос 
    counter: number                    // номер текущего вопроса
    countQuestions: number             // общее количество вопросов
    selectedAnswer: IAnswer | null     // выбранный ответ
    btnState: GameButtons              // состояния кнопок
    isComplete: boolean                // признак завершенной игры
    history: IHistory
    isLastAnswer: boolean
}

export const initialGameState: GameState = {
    quiz: null,                    
    questions: null,
    currentQuestion: null,
    counter: 0,
    countQuestions: 0,
    selectedAnswer: null,
    btnState: {
        nextDisabled: false,
        previousDisabled: true,
        answerDisabled: true
    },
    isComplete: false,
    history: {
        currentHistory: {},
        lastHistoryQuizzes: null
    },
    isLastAnswer: false
}
  
export const gameReducer = createReducer(
    initialGameState,

    on(startGameSuccess, (state, { quiz, questions }) => {        
        return {
            ...state,
            quiz,
            questions: questions || [],
            currentQuestion: questions ? questions[0] : null,
            counter: 1,
            countQuestions: questions ? questions.length : 0
        }
    }),
    on(nextQuestion, (state, { questionNumber }) => {
        return { 
            ...state,
            currentQuestion: state.questions && questionNumber <= state.countQuestions ? state.questions[questionNumber-1] : null,
            counter: questionNumber,
            selectedAnswer: null,
            btnState: {
                ...state.btnState,
                answerDisabled: true,
                nextDisabled: questionNumber === state.countQuestions,
                previousDisabled: questionNumber <= 1
            }
        }
    }),
    on(previousQuestion, (state, { questionNumber }) => {
        return {
            ...state,
            currentQuestion: state.questions && questionNumber >= 1 ? state.questions[questionNumber-1] : null,
            counter: questionNumber,
            selectedAnswer: null,
            btnState: {
                ...state.btnState,
                answerDisabled: true,
                nextDisabled: questionNumber === state.countQuestions,
                previousDisabled: questionNumber <= 1
            }
        }
    }),
    on(answerSelect, (state, { selectedAnswer }) => {
        return {
            ...state,
            selectedAnswer,
            btnState: {
                ...state.btnState,
                answerDisabled: false
            }
        }
    }),
    on(answerRight, (state, {}) => {
        const nextQuestionNumber = state.counter + 1;
        const currentHistory = {
            ...state.history.currentHistory
        };
        currentHistory[state.counter] = 1;

        // todo по сути я заполняю только историю, а все остальное как в экшене nextQuestion. МБ можно сделать интереснее
        return {
            ...state,
            currentQuestion: state.questions && state.counter <= state.countQuestions ? state.questions[state.counter] : null,
            counter: state.counter + 1,
            selectedAnswer: null,
            btnState: {
                ...state.btnState,
                answerDisabled: true,
                nextDisabled: nextQuestionNumber === state.countQuestions,
                previousDisabled: nextQuestionNumber <= 1
            },
            history: {
                ...state.history,
                currentHistory
            },
            isLastAnswer: state.counter === state.countQuestions
        }
    }),
    on(answerWrong, (state, {}) => {
        const nextQuestionNumber = state.counter + 1;
        const currentHistory = {
            ...state.history.currentHistory
        };
        currentHistory[state.counter] = 0;

        // todo по сути я заполняю только историю, а все остальное как в экшене nextQuestion. МБ можно сделать интереснее
        return {
            ...state,
            currentQuestion: state.questions && state.counter <= state.countQuestions ? state.questions[state.counter] : null,
            counter: nextQuestionNumber,
            selectedAnswer: null,
            btnState: {
                ...state.btnState,
                answerDisabled: true,
                nextDisabled: nextQuestionNumber === state.countQuestions,
                previousDisabled: nextQuestionNumber <= 1
            },
            history: {
                ...state.history,
                currentHistory
            },
            isLastAnswer: state.counter === state.countQuestions
        }
    }),
    on(closeGame, (state, {}) => {
        return initialGameState
    }),
    on(addedHistoryQuizzesSuccess, (state, { historyQuizzes }) => {
        return {
            ...state,
            isComplete: true,
            history: {
                ...state.history,
                lastHistoryQuizzes: historyQuizzes
            }
        }
    }),
)