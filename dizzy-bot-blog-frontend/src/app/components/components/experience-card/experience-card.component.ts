import { Component, Input } from "@angular/core";
import { Experience } from "src/app/models/experience";

@Component({
  selector: 'dzb-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCard {

  // inputted variables
  @Input() public experiences: Experience[];
  
}
