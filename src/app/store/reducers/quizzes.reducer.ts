import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { addedSuccess, deletedSuccess, loadQuizzesSuccess, selectQuiz, updatedSuccess } from '../actions/quizzes.actions';
import { IQuiz } from '../models/quiz';
import { createReducer, on } from '@ngrx/store';

export interface QuizzesState extends EntityState<IQuiz> {
  selectedQuizId: number | null;
}

export const adapter: EntityAdapter<IQuiz> = createEntityAdapter<IQuiz>();

const initialQuizzesState: QuizzesState = adapter.getInitialState({
  selectedQuizId: null
});

export const quizzesReducer = createReducer(
  initialQuizzesState,

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
  on(selectQuiz, (state, { quizId }) => {
    return {
      ...state,
      selectedQuizId: quizId
    }
  })
);

export const getSelectedQuizId = (state: QuizzesState) => state.selectedQuizId;

// get the selectors
export const { 
  selectIds: selectQuizIds, 
  selectEntities: selectQuizEntities, 
  selectAll: selectAllQuizzes, 
  selectTotal: selectQuizTotal
} = adapter.getSelectors();