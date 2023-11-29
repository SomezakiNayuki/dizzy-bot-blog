import { Component, Input } from "@angular/core";
import { Experience } from "src/app/models/experience";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'dzb-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCard {

  // inputted variables
  @Input() public experiences: Experience[];

  // functional variable
  @Input() public isEditting: boolean;

  constructor(private dataService: DataService) {}

  // To avoid re-rendering list causing animation flickering
  protected detectChange(index: number, item: any): any {
    return item.id;
  }

  protected delete(id: number): void {
    this.dataService.deleteExperience(id);
  }
  
}
