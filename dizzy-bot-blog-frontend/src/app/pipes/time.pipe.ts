import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  public transform(time: string): string {
    return time.replace('T', ' ');
  }
  
}