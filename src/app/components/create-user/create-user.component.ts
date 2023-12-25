import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  constructor(
    private questionService: QuestionService,
    private modalServise: ModalService
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
    });
  }
}
