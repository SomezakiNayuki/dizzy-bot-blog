import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/pipes/label.service';
import * as label from 'src/app/common/footer/footer.label.json';

@Component({
  selector: 'dzb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [LabelService]
})
export class FooterComponent implements OnInit {

  constructor(
    private labelService: LabelService
  ) {}

  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

}
