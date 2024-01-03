import {ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dzb-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() public message: string;
  @Input() public show: boolean;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.show = false;
  }

  public detectChange(): void {
    this.cdr.detectChanges();
  }

}
