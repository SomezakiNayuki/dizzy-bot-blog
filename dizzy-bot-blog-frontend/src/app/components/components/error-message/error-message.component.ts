import {ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dzb-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() public message: string;
  @Input() public show: boolean = null;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    if (this.show != null) {
      this.show = true;
    }
  }

  public detectChange(): void {
    this.cdr.detectChanges();
  }

}
