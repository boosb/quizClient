import { Component, OnDestroy } from '@angular/core';
import { IUser } from '../../store/models/user';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { Subscription } from 'rxjs';
import { selectUser } from '../../store/selectors/auth.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePageService } from '../../services/profile-page.service';
import { updateUser, uploadAvatar } from '../../store/actions/auth.actions';
import { Update } from '@ngrx/entity';
import { DomSanitizer } from '@angular/platform-browser';

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

  avatar: any;

  // todo не забыть облажить тут все валидацией
  form = new FormGroup({
    aliasText: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    emailText: new FormControl<boolean>(false, []),
  });

  get aliasText() {
    return this.form.controls.aliasText as FormControl;
  }

  get emailText() {
    return this.form.controls.emailText as FormControl;
  }

  get avatarImg() {
    return this.user?.avatar 
      ? this.sanitizer.bypassSecurityTrustUrl(this.user?.avatar) 
      : '../../../assets/img/default-user.png';
  }

  constructor(
    private readonly store: Store<AppState>,
    public profilePageService: ProfilePageService,
    private sanitizer: DomSanitizer
  ) {
    this.userSubs = store.pipe(select(selectUser)).subscribe(currentUser => {
      this.user = currentUser
      console.log(this.user, ' >>> SUPER TEST')

      // set avatar
      if(currentUser?.avatar) {
        this.avatar = sanitizer.bypassSecurityTrustUrl(currentUser?.avatar);
      }
      
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
    this.store.dispatch(updateUser({ update: userUpdate }));
  }

  changeAvatar(event: any) {
    const file = event.target.files[0];
    this.formData.append('avatar', file, file.name);

    this.store.dispatch(uploadAvatar({
      userId: this.user?.id, 
      formData: this.formData
    }));    
  }
}
