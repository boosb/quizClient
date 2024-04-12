import { OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../store";
import { Subscription } from "rxjs";
import { selectShowDetailsAll } from "../store/selectors/questions.selectors";

@Pipe({
    name: 'cutQuestion',
    pure: false
})
export class CutQuestionPipe implements PipeTransform, OnDestroy {

    private MAX_TEXT_LENGTH: number = 75;

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

    transform(value: any, questionId: number | undefined) {
        if(!questionId) {
            return;
        }

        const questionState = this.showDetails[questionId];
        return questionState ? value : `${value.slice(0, this.MAX_TEXT_LENGTH)}...`;
    }
}