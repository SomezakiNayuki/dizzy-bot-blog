import { Component, Input, OnInit } from '@angular/core';
import { FormDefinition } from 'src/app/models/form-definition';
import { Submitable } from 'src/app/models/submitable';

@Component({
  selector: 'dzb-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  @Input() public formFields: FormDefinition[];
  @Input() public submitable: Submitable;

  protected isCreating: boolean = false;

  public ngOnInit(): void {
    this.isCreating = false;
  }

  protected create(): void {
    this.isCreating = true;
  }

  protected discard(): void {
    this.isCreating = false;
  }

}
