import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IHistoryQuizzes } from "../models/history-quizzes";
import { createReducer, on } from "@ngrx/store";
import { addedHistoryQuizzesSuccess, loadHistoryQuizzesSuccess } from "../actions/history-quizzes.action";

export interface HistoryQuizzesState extends EntityState<IHistoryQuizzes> {
    selectedHistoryQuizzesId: number | null;
}
  
export const adapter: EntityAdapter<IHistoryQuizzes> = createEntityAdapter<IHistoryQuizzes>();
  
const initialHistoryQuizzesState: HistoryQuizzesState = adapter.getInitialState({
    selectedHistoryQuizzesId: null
});

export const historyQuizzesReducer = createReducer(
    initialHistoryQuizzesState,
  
    on(loadHistoryQuizzesSuccess, (state, { historyQuizzesAll }) => {
      return adapter.setAll(historyQuizzesAll, state)
    }),
    on(addedHistoryQuizzesSuccess, (state, { historyQuizzes }) => {
      return adapter.addOne(historyQuizzes, state)
    }),
);

export const getSelectedQuizId = (state: HistoryQuizzesState) => state.selectedHistoryQuizzesId;
  
// get the selectors
export const { 
    selectIds: selectHistoryQuizzesIds, 
    selectEntities: selectHistoryQuizzesEntities, 
    selectAll: selectAllHistoryQuizzes, 
    selectTotal: selectHistoryQuizzesTotal
  } = adapter.getSelectors();