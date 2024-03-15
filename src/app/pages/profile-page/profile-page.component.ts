import { Component, OnDestroy } from '@angular/core';
import { IUser } from '../../store/models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/selectors/auth.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePageService } from '../../services/profile-page.service';
import { updateUser } from '../../store/actions/auth.actions';
import { Update } from '@ngrx/entity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: [
    './profile-page.component.scss',
    '../../app.component.scss'
  ]
})
export class ProfilePageComponent implements OnDestroy {
  userSubs: Subscription;

  user: IUser | null;

  formData: FormData = new FormData();

  // todo не забыть облажить тут все валидацией
  form = new FormGroup({
    aliasText: new FormControl<string>('ghggfgf', [
      Validators.required,
      Validators.minLength(6)
    ]),
    emailText: new FormControl<boolean>(false, []),
    avatarFile: new FormControl('', [Validators.required]),
  });

  get aliasText() {
    return this.form.controls.aliasText as FormControl;
  }

  get emailText() {
    return this.form.controls.emailText as FormControl;
  }

  get avatarFile() {
    return this.form.controls.avatarFile as FormControl;
  }

  constructor(
    private readonly store: Store<AppState>,
    public profilePageService: ProfilePageService,
    private userService: UserService
  ) {
    this.userSubs = store.pipe(select(selectUser)).subscribe(currentUser => {
      this.user = currentUser
      console.log(this.user, ' >>> SUPER TEST')
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();

  }

  submit() {
    const {aliasText, emailText} = this.form.value;
    const userUpdate: Update<IUser> = {
      id: String(this.user?.id),
      changes: {
        alias: aliasText as string,
        // todo где-то тут надо описать логику, чтобы при смене почты надо было ее подтвердить 
        // todo добавить обновление аватара
      }
    };
    console.log('kkk')
    this.store.dispatch(updateUser({ update: userUpdate }));
  }

  uploadAvatar() {
    console.log(this.form.value.avatarFile, ' >>> this.form.value.avatarFile')
    console.log(this.formData.get('avatar'), ' >>>> this.formData')
    this.userService.uploadAvatar(this.user?.id, this.formData).subscribe()
  }

  test(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files[0], ' >>> event.target.files[0]')

    this.formData.append('avatar', file, file.name);
  }
}
