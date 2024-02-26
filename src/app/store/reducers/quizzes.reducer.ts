import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { addQuestionSuccess, addedSuccess, deletedSuccess, loadQuizzes, loadQuizzesSuccess, updatedSuccess } from '../actions/quizzes.actions';
import { IQuiz } from '../models/quiz';
import { IQuestion } from '../models/question';
import { createReducer, on } from '@ngrx/store';

export interface QuizzesState extends EntityState<IQuiz> {
  selectedQuizId: number | null;
}

export const adapter: EntityAdapter<IQuiz> = createEntityAdapter<IQuiz>();

export const adapterQuestions: EntityAdapter<IQuestion> = createEntityAdapter<IQuestion>();

const initialQuizzesState: QuizzesState = adapter.getInitialState({
  selectedQuizId: null
});

export const quizzesReducer = createReducer(
  initialQuizzesState,

  // Quizzes
  on(loadQuizzesSuccess, (state, { quizzes }) => {
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

  // Questions
 /* on(addQuestionSuccess, (state, { question }) => {
    return adapter.addOne(question, state)
  })*/
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