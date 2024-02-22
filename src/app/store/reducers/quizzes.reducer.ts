import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { addedSuccess, deletedSuccess, loadQuizzes, loadQuizzesSuccess, updatedSuccess } from '../actions/quizzes.actions';
import { IQuiz } from '../models/quiz';
import { IQuestion } from '../models/question';
import { createReducer, on } from '@ngrx/store';

export interface QuizzesState extends EntityState<IQuiz> {
  quizzes: IQuiz[];
  currentQuestions: IQuestion[];
  selectedQuizId: number | null;
}

export const adapter: EntityAdapter<IQuiz> = createEntityAdapter<IQuiz>();

const initialQuizzesState: QuizzesState = adapter.getInitialState({
  quizzes: [],
  currentQuestions: [],
  selectedQuizId: null
});
/*
export function quizzesReducer(
  state: QuizzesState = initialQuizzesState,
  action: QuizzesActions
) {
  switch (action.type) {
      case QuizzesActionTypes.LoadedSuccess:
        return {
          ...state,
          quizzes: action.payload.quizzes
        };

       // return adapter.setAll(action.payload.quizzes, state);

      case QuizzesActionTypes.AddedSuccess:
        return {
          ...state,
          quizzes: [...state.quizzes, action.payload.quiz]
        };
        return adapter.addOne(action.payload.quiz, state);

      case QuizzesActionTypes.DeletedSuccess:
        return {
          ...state,
          quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload.quizId)
        }

      case QuizzesActionTypes.UpdatedSuccess:
        return {
          ...state,
          quizzes: state.quizzes // todo но вот тут я не обнавляю массив после обновы квиза
        }

      case QuizzesActionTypes.ADD_QUESTION_REQUEST:
        const { question } = action.payload
        console.log( question, ' >>. question-test=1' )
        const quiz = state.quizzes.find(quiz => quiz.id === question.quizId)
        console.log(state.quizzes, ' >>> state.quizzes')
        console.log( quiz, ' >>> quiz----test----0')
        if(quiz?.questions) {
          //quiz?.questions.push(question)

          quiz.questions = [...quiz.questions, question]
        }
        console.log(quiz,'  >>>> quiz-test-1')
        return {
          ...state,
          quizzes: state.quizzes
        }

      default:
          return state;
  }
}*/

export const quizzesReducer = createReducer(
  initialQuizzesState,
  on(loadQuizzesSuccess, (state, { quizzes }) => {
    console.log(state, ' >>> HELLO')
    const testTwo = adapter.setAll(quizzes, state);
    console.log(testTwo, ' >>> testTwo-testTwo-testTwo')
    return adapter.setAll(quizzes, state)
  }),
  on(addedSuccess, (state, { quiz }) => {
    return adapter.addOne(quiz, state)
  }),
  on(deletedSuccess, (state, { quizId }) => {
    return adapter.removeOne(quizId, state)
  }),
  on(updatedSuccess, (state, { update }) => {
    return adapter.updateOne(update, state)
  }),
  /*on(UserActions.setUser, (state, { user }) => {
    return adapter.setOne(user, state)
  }),*/
);

export const getSelectedQuizId = (state: QuizzesState) => state.selectedQuizId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;