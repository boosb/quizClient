import { OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../store";
import { Subscription } from "rxjs";
import { selectShowDetailsAll } from "../store/selectors/questions.selectors";

export const MAX_TEXT_LENGTH: number = 75;

@Pipe({
    name: 'cutQuestion',
    pure: false
})
export class CutQuestionPipe implements PipeTransform, OnDestroy {
    showDetailsSubs: Subscription;

    showDetails: {
        [key: number]: boolean
    };

    constructor(
        private store: Store<AppState>
    ) {
        this.showDetailsSubs = this.store.pipe(select(selectShowDetailsAll)).subscribe(showDetails => this.showDetails = showDetails);
    }

    ngOnDestroy(): void {
        this.showDetailsSubs.unsubscribe();
    }

    transform(value: string, questionId: number | undefined) {
        if(!questionId) {
            return;
        }

        const tooMachText = value.length > MAX_TEXT_LENGTH;
        const questionState = this.showDetails[questionId];
        return questionState || !tooMachText ? value : `${value.slice(0, MAX_TEXT_LENGTH)}...`;
    }
}