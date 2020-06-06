import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(workers: any[], type: number): any[] {
    switch (+type) {
      case 0:
        return workers.sort((worker1, worker2) => worker1.id - worker2.id);
      case 1:
        return workers.sort((worker1, worker2) => worker2.id - worker1.id);
      case 2:
        return workers.sort((worker1, worker2) => this.dateDiff(worker1.date, worker2.date));
      case 3:
        return workers.sort((worker1, worker2) => this.dateDiff(worker2.date, worker1.date));
      default:
        console.error('Error getting type of sort');
    }
  }
  dateDiff(date1: string, date2: string): number {
    let day1 = date1.substring(0, 2);
    let month1 = date1.substring(3, 5);
    let year1 = date1.substring(6, 10);
    let dob1 = new Date(+year1, +month1 - 1, +day1);
    let day2 = date2.substring(0, 2);
    let month2 = date2.substring(3, 5);
    let year2 = date2.substring(6, 10);
    let dob2 = new Date(+year2, +month2 - 1, +day2);
    return (+dob1 - +dob2);
  }
}