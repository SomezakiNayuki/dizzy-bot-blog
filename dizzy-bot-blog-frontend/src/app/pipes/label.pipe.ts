import { Pipe, PipeTransform } from '@angular/core';
import { LabelService } from 'src/app/pipes/label.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class LabelPipe implements PipeTransform {

  constructor(private labelService: LabelService) {}

  public transform(key: string): string {
    return this.labelService.transform(key);
  }

}