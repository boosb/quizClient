import { createReducer, on } from "@ngrx/store"
import { answerRight, answerSelect, answerWrong, completeGame, nextQuestion, previousQuestion, startGame, startGameSuccess } from "../actions/quiz-game.actions"
import { IQuestion } from "../models/question"
import { IQuiz } from "../models/quiz"
import { IAnswer } from "../models/answer"

export interface GameState {
    quiz: IQuiz | null
    questions: IQuestion[] | null
    currentQuestion: IQuestion | null
    counter: number
    countQuestions: number
    selectedAnswer: IAnswer | null
    btnState: {
        nextDisabled: boolean
        previousDisabled: boolean,
        answerDisabled: boolean
    }
    history: {
        [key:number]: number // 1 - right, 0 - wrong
    }
    isComplete: boolean
}

const initialGameState: GameState = {
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
    history: {},
    isComplete: false
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
        const history = {
            ...state.history,
        };
        history[state.counter] = 1;
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
            history
        }
    }),
    on(answerWrong, (state, {}) => {
        const nextQuestionNumber = state.counter + 1;
        const history = {
            ...state.history,
        };
        history[state.counter] = 0;
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
            history
        }
    }),
    on(completeGame, (state, {}) => {
        return {
            ...state,
            currentQuestion: null,
            counter: 0,
            selectedAnswer: null,
            btnState: {
                ...state.btnState,
                answerDisabled: true,
                nextDisabled: true,
                previousDisabled: true
            },
            isComplete: true
        }
    })
)