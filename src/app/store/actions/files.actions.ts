import { createAction, props } from "@ngrx/store";

export const uploadAvatar = createAction('[Files API] Upload Avatar', props<{ userId: number | undefined, formData: FormData }>());
export const uploadAvatarSuccess = createAction('[Files API] Upload Avatar Success', props<{ userId: number | undefined, formData: FormData }>());

export const uploadImgQuestionRequest = createAction('[Files API] Questions Upload IMG', props<{ formData: FormData }>());
export const uploadImgQuestionSuccess = createAction('[Files API] Questions Upload IMG Success', props<{ imgPath: string }>());

export const cleanLastImgPath = createAction('[Files API] Clean Img Path');