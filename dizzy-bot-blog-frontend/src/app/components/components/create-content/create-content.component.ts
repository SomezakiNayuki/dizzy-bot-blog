import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dzb-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  // functional variables
  protected isCreating: boolean = false;

  constructor() { }

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
