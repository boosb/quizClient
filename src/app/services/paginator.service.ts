import { Injectable } from "@angular/core";

interface PaginatorData {
    pageSize: number;
    showEntities: any[];
    length: number;
    options: number[];
    pageIndex: number;
}

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    // todo Возникла проблема. Причина, что разные пагинаторы опираются на одинаковые данные. Это приводит к массе проблем
    /*pageSize: number = 3;

    showEntities: any[];

    length: number;

    options: number[] = [3, 5, 10, 15];

    pageIndex: number = 0;*/

    data: {
        [key: string]: PaginatorData
    } = {}

    initialData: PaginatorData = {
        pageSize: 3,
        showEntities: [],
        length: 0,
        options: [3, 5, 10, 15],
        pageIndex: 0
    }


    /*get componentData() {
        return data[]
    }*/


    /*
    get startPoint() {
        return this.pageIndex * this.pageSize;
    }

    get endPoint() {
        return this.startPoint + this.pageSize;
    }*/

    init(key: string, entities: any[] | undefined | null) {
        if(!entities) {
            return;
        }
console.log(key,  ' >>> key')
        if(!this.data.hasOwnProperty(key)) {
            console.log('1')
            this.data[key] = this.initialData;
        }
        console.log('2')
        this.data[key].length = entities.length;
        this.data[key].showEntities = entities.slice(this._getStartPoint(key), this._getEndPoint(key));

        //this.length = entities.length;
        //this.showEntities = entities.slice(this.startPoint, this.endPoint);
    }

    onPageEvent(key: string, entities: any[] | undefined, event: any) {
        /*if(!entities) {
            return;
        }
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.showEntities = entities.slice(this.startPoint, this.endPoint);*/

        if(!entities) {
            return;
        }

        this.data[key].pageIndex = event.pageIndex;
        this.data[key].pageSize = event.pageSize;
        this.data[key].showEntities = entities.slice(this._getStartPoint(key), this._getEndPoint(key));
    }

    _getStartPoint(key: string) {
        return this.data[key].pageIndex * this.data[key].pageSize;
    }

    _getEndPoint(key: string) {
        const startPoint = this._getStartPoint(key);
        return startPoint + this.data[key].pageSize;
    }

    getPaginatorData(key: string) {
        console.log( this.data, ' >>>  this.data')
        return this.data[key];
    }
}