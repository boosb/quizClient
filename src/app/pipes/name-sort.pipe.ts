import { Pipe, PipeTransform } from "@angular/core";

const DATE = 'Date';
const QUIZ_NAME= 'Quiz name';

@Pipe({
    name: 'nameSort',
    pure: false
})
export class NameSortPipe implements PipeTransform {
    /*transform(value: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }*/
    transform(entities: any[] | undefined, byField: string) {
        console.log(byField, ' >>> args')

        if(!entities) {
            return;
        }


        if(byField === DATE) {
            console.log('5')
            return this._dateSorted(entities);
        }

        if(byField === QUIZ_NAME) {
            console.log('6')
            return this._nameSorted(entities);
        }

        return entities
      
       /* const copyEntities = [...entities];
        return copyEntities?.sort((a, b) => a.name > b.name ? -1 : 1);*/
    }

    _dateSorted(entities: any[]) {
        const copyEntities = [...entities]
        return copyEntities?.sort((a, b) => (a.dateTime && b.dateTime) && a.dateTime > b.dateTime ? -1 : 1);
    }

    _nameSorted(entities: any[]) {      
        const copyEntities = [...entities];
        return copyEntities?.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    
}