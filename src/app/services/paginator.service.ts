import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    pageSize: number = 3;

    showEntities: any[];

    length: number;

    options: number[] = [3, 5, 10, 15];

    pageIndex: number = 0;

    get startPoint() {
        return this.pageIndex * this.pageSize;
    }

    get endPoint() {
        return this.startPoint + this.pageSize;
    }

    init(entities: any[]) {
        this.length = entities.length;
        this.showEntities = entities.slice(this.startPoint, this.endPoint);
    }

    onPageEvent(entities: any[] | undefined, event: any) {
        if(!entities) {
            return;
        }
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.showEntities = entities.slice(this.startPoint, this.endPoint);
    }
}