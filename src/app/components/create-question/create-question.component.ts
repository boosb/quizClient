import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})
export class CreateQuestionComponent { // todo ля, а это не правильный компонент, начать от сюда
  constructor(
    private questionService: QuestionService,
    private modalServise: ModalService,
    private notificationService : NotificationService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    this.questionService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 42,
        count: 1
      }
    }).subscribe(() => {
      this.modalServise.close();
      // todo хотелось бы все это вынести в константы, разобраться в бест практиках для ангуляра
      this.notificationService.show('Question has been created!', 'successfully');
    });
  }
}
