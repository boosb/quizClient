import { Component, Input, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectLastImgPath } from '../../../store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { addQuestionRequest, updateQuestionRequest } from '../../../store/actions/questions.actions';
import { Update } from '@ngrx/entity';
import { IQuestion } from '../../../store/models/question';
import { selectCurrentQuizId } from '../../../store/selectors/quizzes.selectors';
import { selectCurrentQuestion } from '../../../store/selectors/questions.selectors';
import { ImgService } from '../../../services/img.service';
import { uploadImgQuestionRequest } from '../../../store/actions/files.actions';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: [
    './question-modal.component.scss',
    '../../../app.component.scss'
  ]
})
export class QuestionModalComponent implements OnDestroy {

  @Input() isUpdate: boolean;

  private quizIdSubs: Subscription;

  private currentQuestionSubs: Subscription;

  private imgPathSubs: Subscription;

  private quizId: number | null;

  private currentQuestion: IQuestion | null | undefined;

  formData: FormData = new FormData();

  imgPath: string | undefined;

  form = new FormGroup({
    questionText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get questionText() {
    return this.form.controls.questionText as FormControl;
  }

  get img() {
    return this.currentQuestion?.img ? this.currentQuestion?.img : this.imgPath; // todo шо-то ка кбудто рудимент
  }

  constructor(
    private store: Store<AppState>,
    public imgService: ImgService
  ) {
    imgService.includeCameraIcon();

    this.quizIdSubs = this.store.pipe(select(selectCurrentQuizId)).subscribe(id => this.quizId = id);
    this.currentQuestionSubs = this.store.pipe(select(selectCurrentQuestion)).subscribe(question => {
      this.currentQuestion = question;
      this.imgPath = question?.img;
      this.questionText.setValue(question?.text);
    });

    this.imgPathSubs = this.store.pipe(select(selectLastImgPath)).subscribe(imgPath => this.imgPath = imgPath);
  }

  ngOnDestroy(): void {
    this.quizIdSubs.unsubscribe();
    this.currentQuestionSubs.unsubscribe();
    this.imgPathSubs.unsubscribe();
  }

  submit() {
    this.isUpdate ? this._updateQuestion() : this._createQuestion();
  }

  _createQuestion() {
    const {questionText} = this.form.value;
    this.store.dispatch(addQuestionRequest({
      question: {
        text: questionText as string,
        quizId: Number(this.quizId),
        img: this.imgPath
      }
    }));
  }

  _updateQuestion() {
    const {questionText} = this.form.value;
    const questionUpdate: Update<IQuestion> = {
      id: String(this.currentQuestion?.id),
      changes: {
        text: questionText as string,
        quizId: this.quizId || null,
        img: this.imgPath
      }
    }
    this.store.dispatch(updateQuestionRequest({update: questionUpdate}));
  }

  changeImgQuestion(event: any) {
    this._setFormDataAvatar('questions', event.target.files[0]);
    this.store.dispatch(uploadImgQuestionRequest({formData: this.formData}));
  }

  _setFormDataAvatar(fieldName: string, file: any) {
    this.formData.delete(fieldName);
    this.formData.append(fieldName, file, file.name);
  }
}
