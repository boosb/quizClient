import { createSelector } from "@ngrx/store";
import { selectQuestionState } from "..";
import * as fromQuestion from './../reducers/questions.reducer';

export const selectAllQuestions = createSelector(
    selectQuestionState,
    fromQuestion.selectAllQuestions
);

export const selectCurrentQuestionId = createSelector(
    selectQuestionState,
    fromQuestion.getSelectedQuestionId
);

export const selectCurrentQuestion = createSelector(
    selectQuestionState,
    selectCurrentQuestionId,
    (state: fromQuestion.QuestionsState, id) => id ? state.entities[id] : null
);

export const selectShowDetails = createSelector(
    selectQuestionState,
    (state: fromQuestion.QuestionsState, props: any) => {
        console.log( props.questionId, '>>> ID')
        //if(id) console.log(state.showDetails[id], ' >> .state.showDetails[id]')
        return state.showDetails[props.questionId]
    }
);