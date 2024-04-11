import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IQuestion } from "../models/question";
import { createReducer, on } from "@ngrx/store";
import { addedQuestionSuccess, deletedQuestionSuccess, loadQuestionsSuccess, selectQuestion, updatedQuestionSuccess } from "../actions/questions.actions";

export interface QuestionsState extends EntityState<IQuestion> {
    selectedQuestionId: number | null | undefined;
}

export const adapterQuestions: EntityAdapter<IQuestion> = createEntityAdapter<IQuestion>();  

const initialQuestionState: QuestionsState = adapterQuestions.getInitialState({
    selectedQuestionId: null,
    lastImgPath: undefined
})
  
export const qustionsReducer = createReducer(
    initialQuestionState,

    on(selectQuestion, (state, { questionId }) => {
        return {
            ...state,
            selectedQuestionId: questionId,
        }
    }), 
    on(loadQuestionsSuccess, (state, { questions }) => {
        return adapterQuestions.setAll(questions, state)
    }),  
    on(addedQuestionSuccess, (state, { question }) => {
        return adapterQuestions.addOne(question, state)
    }),
    on(deletedQuestionSuccess, (state, { questionId }) => {
        return adapterQuestions.removeOne(questionId, state)
    }),
    on(updatedQuestionSuccess, (state, { update }) => {
        return adapterQuestions.updateOne(update, state)
    }),
)


export const getSelectedQuestionId = (state: QuestionsState) => state.selectedQuestionId;

// get the selectors
export const { 
    selectIds: selectQuestionIds,
    selectEntities: selectQuestionEntities,
    selectAll: selectAllQuestions,
    selectTotal: selectQuestionTotal
} = adapterQuestions.getSelectors();