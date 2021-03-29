import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: boolean): any[] {
    if (!items) { return []; }
    // tslint:disable-next-line:triple-equals
    return items.filter(it =>
      // tslint:disable-next-line:triple-equals
      it[field] == value);
  }
}
