import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';;

export const BASE_PAGE_SIZE = 3;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() entities: any[] | undefined;

  @Input() length: number | undefined;

  @Output() onChange = new EventEmitter();

  showEntities: any[] | undefined;

  pageSize = BASE_PAGE_SIZE;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 10];
  pageEvent: PageEvent;

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.showEntities = this._getShowEntities();

    this.onChange.emit(this.showEntities);
  }

  _getShowEntities() {
    if(!this.entities) {
      return;
    }
    const startPoint = this.pageIndex * this.pageSize;
    const endPoint = startPoint + this.pageSize;
    return this._cutQuestions(startPoint, endPoint);
  }

  _cutQuestions(startPoint: number, endPoint: number) {
    if(!this.entities) {
      return;
    } 
    return this.entities.slice(startPoint, endPoint);
  }
}
