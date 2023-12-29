import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { LabelService } from 'src/app/pipes/label.service';
import { DataService } from 'src/app/services/data.service';
import * as label from 'src/app/components/components/experience-card/experience-card.label.json';

@Component({
  selector: 'dzb-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css'],
  providers: [LabelService]
})
export class ExperienceCard implements OnInit {

  @Input() public experiences: Experience[];
  @Input() public isEditting: boolean;

  constructor(
    private dataService: DataService,
    private labelService: LabelService
  ) {}
  
  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

  // To avoid re-rendering list causing animation flickering
  protected detectChange(index: number, item: any): any {
    return item.id;
  }

  protected delete(id: number): void {
    this.dataService.deleteExperience(id);
  }

  protected getSortedExperiences(): Experience[] {
    return this.experiences?.reverse();
  }
  
}
