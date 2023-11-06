import { Component, Input } from '@angular/core';
import { PersonalInfo } from 'src/app/models/personal-info';

@Component({
  selector: 'dzb-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrls: ['./personal-info-card.component.css']
})
export class PersonalInfoCardComponent{

  // inputted variables
  @Input() public personalInfo: PersonalInfo;

}
