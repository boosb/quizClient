import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {
    transform(entities: any[] | undefined) {
        if(!entities) {
            return;
        }
      
        const copyEntities = [...entities]
        return copyEntities?.sort((a, b) => (a.dateTime && b.dateTime) && a.dateTime > b.dateTime ? -1 : 1);
    }
}