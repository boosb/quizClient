import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    pageSize: number = 3;

    showEntities: any[];

    length: number;

    options: number[] = [3, 5, 10, 15];

    init(entities: any[], pageSize: number = 3) {

        this.showEntities = this._cutQuestions(entities, 0, this.pageSize); 
        this.length = entities.length;
        this.pageSize = pageSize
    }

    onPageEvent(entities: any[] | undefined, event: any) {
        if(!entities) {
            return;
        }
        const {pageIndex, pageSize} = event;
        const startPoint = pageIndex * pageSize;
        this.showEntities = this._cutQuestions(entities, startPoint, startPoint + pageSize);
    }

    _cutQuestions(entities: any[], startPoint: number, endPoint: number) {
        return entities.slice(startPoint, endPoint);
    }
}