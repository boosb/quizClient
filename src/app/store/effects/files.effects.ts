import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { uploadAvatar, uploadImgQuestionRequest, uploadImgQuestionSuccess } from "../actions/files.actions";
import { EMPTY, catchError, map, mergeMap, switchMap } from "rxjs";
import { FileService } from "../../services/file.service";
import { getAuthUser } from "../actions/auth.actions";

@Injectable()
export class FilesEffects {
    updateUserAvatar$ = createEffect(() => this.actions$.pipe(
        ofType(uploadAvatar),
        switchMap((action) => this.filesService.uploadUserAvatar(action.userId, action.formData)
          .pipe(
            map(() => getAuthUser({userId: action.userId})),
            catchError(() => EMPTY)
          ))
        )  
      );

    uploadImgQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(uploadImgQuestionRequest),
        mergeMap((action) => this.filesService.uploadImgQuestion(action.formData)
        .pipe(
            map((img) => uploadImgQuestionSuccess({imgPath: img.path})),
            catchError(() => EMPTY)
        ))
        )
    );

    constructor(
        private actions$: Actions,
        private filesService: FileService
    ) {}
}