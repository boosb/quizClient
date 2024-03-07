import { createReducer, on } from "@ngrx/store"
import { closeModal, showConfirm, showModalAnswers, showModalQuestions } from "../actions/modal.actions"
import { Component, ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef } from "@angular/core"
import { QuestionModalComponent } from "../../components/admin-side-components/question-modal/question-modal.component"

// todo Проблемка тут образовалась, которую так и не решил. Хотел передавать сам компонент (типо QuestionModalComponent)
// но пришлось искать обходной путь
// Буду передавать строку, характеризующую тип,  а компонент модалки будет решить что подгрузить

export interface ModalState {
    data: {
        [key:string]: any
    },
    dialog: string | null,
    isShow: boolean
}

const initialMenuState: ModalState = {
    data: {},
    dialog: null,
    isShow: false
}
  
export const modalReducer = createReducer(
    initialMenuState,

    on(showModalQuestions, (state, { data }) => {
        return {
            ...state,
            dialog: 'question',
            data,
            isShow: true
        }
    }),
    on(showModalAnswers, (state, { data }) => {
        return {
            ...state,
            data,
            dialog: 'answer',
            isShow: true
        }
    }),
    on(showConfirm, (state, { data }) => {
        return {
            ...state,
            data,
            dialog: 'confirm',
            isShow: true
        }
    }),
    on(closeModal, (state, {}) => {
        return {
            ...state,
            isShow: false
        }
    })
)