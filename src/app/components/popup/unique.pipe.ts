import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {
  transform(value: any, propertyName: string): any {
    if (!Array.isArray(value) || value.length === 0 || !propertyName) {
      return value;
    }

    const uniqueValues = new Set();
    return value.filter((item: any) => {
      if (!uniqueValues.has(item[propertyName])) {
        uniqueValues.add(item[propertyName]);
        return true;
      }
      return false;
    });
  }
}