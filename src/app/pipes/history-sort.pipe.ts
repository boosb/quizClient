import { Pipe, PipeTransform } from "@angular/core";
import { ICurrentHistory } from "../store/models/current-history";
import { IHistoryQuizzes } from "../store/models/history-quizzes";

const DATE = 'Date';
const QUIZ_NAME= 'Quiz name';
const RIGHT_ANSWERS = 'Number of right answers';

@Pipe({
    name: 'historySort'
})
export class HistorySortPipe implements PipeTransform {
    transform(entities: IHistoryQuizzes[] | undefined, byField: string) {
        if(!entities) {
            return;
        }

        switch(byField) {
            case DATE:
                return this._dateSorted(entities);
            case QUIZ_NAME:
                return this._nameSorted(entities);
            case RIGHT_ANSWERS:
                return this._numberOfRightAnswersSorted(entities);
            default:
                return entities;
        }
    }

    _dateSorted(entities: IHistoryQuizzes[]) {
        const copyEntities = [...entities];
        return copyEntities?.sort((a, b) => (a.dateTime && b.dateTime) && a.dateTime > b.dateTime ? -1 : 1);
    }

    _nameSorted(entities: any[]) {
        const copyEntities = [...entities];
        return copyEntities?.sort((a, b) => a.name > b.name ? -1 : 1);
    }

    _numberOfRightAnswersSorted(entities: IHistoryQuizzes[]) {
        const countedEntities = this._getCountedEntities(entities);

        const copyCountedEntities = [...countedEntities];
        const sortedData = copyCountedEntities?.sort((a, b) => a.countRightAnswer > b.countRightAnswer ? -1 : 1);
        return sortedData.map(obj => obj.entity);
    }

    _getCountedEntities(entities: IHistoryQuizzes[]) {
        return entities?.map(entity => {
            const countRightAnswer = this._getCountRightAnswer(entity.history);
            return {
                entity,
                countRightAnswer
            };
        });
    }

    _getCountRightAnswer(history: ICurrentHistory) {
        let countRightAnswer = 0;
        const historyValues = Object.values(history);
        historyValues.forEach(value => {
            countRightAnswer += value === 1 ? 1 : 0;
        });
        return countRightAnswer;
    }
}