import { Injectable, OnDestroy } from "@angular/core";
import { IAnswer } from "../store/models/answer";
import { BehaviorSubject, Observable, Subject, Subscription, of, throwError } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../store";
import { selectSelectedAnswer } from "../store/selectors/quiz-game.selectors";
import { IQuiz } from "../store/models/quiz";
import { IQuestion } from "../store/models/question";

@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {
    selectedAnswerSubs: Subscription;

    selectedAnswer$ =  new BehaviorSubject<IAnswer|null>(null);

    constructor(
        private store: Store<AppState>
    ) {
        this.selectedAnswerSubs = store.pipe(select(selectSelectedAnswer)).subscribe(answer => this.selectedAnswer$.next(answer));
    }

    ngOnDestroy(): void {
        this.selectedAnswerSubs.unsubscribe();
    }

    checkRightAnswer() {
        return new Observable((observer) => {
            const answer = this.selectedAnswer$.getValue();
            if(!answer?.isRight) {
                throw new Error('The answer is not correct');
            }
            observer.next(answer);
            observer.complete();
        } );
    }
}