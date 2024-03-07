import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IAnswer } from "../models/answer";
import { createReducer, on } from "@ngrx/store";
import { addedAnswerSuccess, deletedAnswerSuccess, loadAnswersSuccess, selectAnswer, updatedAnswerSuccess } from "../actions/answers.actions";

export interface AnswersState extends EntityState<IAnswer> {
    selectedAnswerId: number | null | undefined;
}

export const adapterAnswer: EntityAdapter<IAnswer> = createEntityAdapter<IAnswer>();  

const initialAnswerState: AnswersState = adapterAnswer.getInitialState({
    selectedAnswerId: null
})
  
export const answersReducer = createReducer(
    initialAnswerState,

    on(selectAnswer, (state, { answerId }) => {
        return {
            ...state,
            selectedAnswerId: answerId
        }
    }),
    on(loadAnswersSuccess, (state, { answers }) => {
        return adapterAnswer.setAll(answers, state)
    }),
    on(addedAnswerSuccess, (state, { answer }) => {
        return adapterAnswer.addOne(answer, state)
    }),
    on(deletedAnswerSuccess, (state, { answerId }) => {
        return adapterAnswer.removeOne(answerId, state)
    }),
    on(updatedAnswerSuccess, (state, { update }) => {
        return adapterAnswer.updateOne(update, state)
    })
)

export const getSelectedAnswerId = (state: AnswersState) => state.selectedAnswerId;

// get the selectors
export const { 
    selectIds: selectAnswerIds, 
    selectEntities: selectAnswerEntities, 
    selectAll: selectAllAnswers, 
    selectTotal: selectAnswersTotal
} = adapterAnswer.getSelectors();