import { Injectable } from '@angular/core';

@Injectable()
export class LabelService {
  
  private label: Object;

  public loadScreenLabelConfiguration(config: Object): void {
    this.label = config;
  }

  public transform(key: string): string {
    return this.label[key] || key;
  }

}