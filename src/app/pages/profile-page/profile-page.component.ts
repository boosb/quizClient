import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../store/models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { Subscription } from 'rxjs';
import { selectError, selectUser } from '../../store/selectors/auth.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateEmailUser, updateUser, uploadAvatar } from '../../store/actions/auth.actions';
import { Update } from '@ngrx/entity';
import { ImgService } from '../../services/img.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: [
    './profile-page.component.scss',
    '../../app.component.scss'
  ]
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  userSubs: Subscription;

  user: IUser | null;

  formData: FormData = new FormData();

  errorTextSubs: Subscription;

  errorText: string | null;

  // todo не забыть облажить тут все валидацией
  form = new FormGroup({
    aliasText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    emailText: new FormControl<string>('', []),
  });

  get aliasText() {
    return this.form.controls.aliasText as FormControl;
  }

  get emailText() {
    return this.form.controls.emailText as FormControl;
  }

  constructor(
    private readonly store: Store<AppState>,
    public imgService: ImgService,
  ) {
    imgService.includeSomeIcon();
  }

  ngOnInit(): void {
    this.userSubs = this.store.pipe(select(selectUser)).subscribe(currentUser => {
      this.user = currentUser;
      this._setUserValues(); // todo подумать как сделать так чтобы записывался новый еиеил
    });
    this.errorTextSubs = this.store.pipe(select(selectError)).subscribe(errorText => this.errorText = errorText);

    this.emailText.setValue(this.user?.email);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.errorTextSubs.unsubscribe();
  }

  submit() {
    this._updateDataUser();
    this._updateEmailUser();
  }

  changeAvatar(event: any) {
    this._setFormDataAvatar('avatar', event.target.files[0]);

    this.store.dispatch(uploadAvatar({
      userId: this.user?.id, 
      formData: this.formData
    }));
  }

  _setFormDataAvatar(fieldName: string, file: any) {
    this.formData.delete(fieldName);
    this.formData.append(fieldName, file, file.name);
  }

  _setUserValues() {
    this.aliasText.setValue(this.user?.alias);
    //this.emailText.setValue(this.user?.email);
  }

  _updateDataUser() {
    const {aliasText} = this.form.value;
    const userUpdate: Update<IUser> = {
      id: String(this.user?.id),
      changes: {
        alias: aliasText as string,
        //isEmailConfirmed: // todo Все хуйня, надо в БД oldEmail добавлять
      }
    };
    this.store.dispatch(updateUser({ update: userUpdate }));
  }

  _updateEmailUser() {
    const oldEmail = this.user?.email;
    const {emailText} = this.form.value;

    if(oldEmail === emailText) {
      return;
    }

    const userUpdate: Update<IUser> = {
      id: String(this.user?.id),
      changes: {
        oldEmail,
        email: emailText as string,
        isEmailConfirmed: false
      }
    };
    this.store.dispatch(updateEmailUser({ update: userUpdate }));
  }
}
