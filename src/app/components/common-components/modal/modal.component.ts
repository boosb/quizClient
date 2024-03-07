import { ChangeDetectorRef, Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { QuestionModalComponent } from '../../admin-side-components/question-modal/question-modal.component';
import { Store, select } from '@ngrx/store';
import { AppState, selectModalData, selectModalDialog } from '../../../store';
import { Subscription } from 'rxjs';
import { closeModal } from '../../../store/actions/modal.actions';
import { AnswerModalComponent } from '../../admin-side-components/answer-modal/answer-modal.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy {

  private dlgTypeSubs: Subscription

  private dlgDataSubs: Subscription

  @ViewChild('content', { read: ViewContainerRef })

  private viewRef: ViewContainerRef

  private dlgType: string | null

  private dlgData: {
    [key:string]: any
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.dlgTypeSubs = this.store.pipe(select(selectModalDialog)).subscribe(type => this.dlgType = type)
    this.dlgDataSubs = this.store.pipe(select(selectModalData)).subscribe(data => this.dlgData = data)
  }

  ngOnDestroy(): void {
    this.dlgTypeSubs.unsubscribe()
    this.dlgDataSubs.unsubscribe()
  }

  ngAfterViewInit() {
    this.viewRef.clear()
    const componentRef = this._getCreatedComponent()
    this._loadDataComponent(componentRef)
    
    this.cdRef.detectChanges(); 
  }

  close() {
    this.store.dispatch(closeModal())
  }

  _getCreatedComponent() {
    switch(this.dlgType) {
      case 'question':
        return this.viewRef.createComponent(QuestionModalComponent)
      case 'answer':
        return this.viewRef.createComponent(AnswerModalComponent)
      case 'confirm':
        return this.viewRef.createComponent(ConfirmComponent)
      default:
        return null
    }
  }

  _loadDataComponent(componentRef: any) {
    if(!componentRef) {
      return
    }
    Object.assign(componentRef.instance, this.dlgData)
  }
}