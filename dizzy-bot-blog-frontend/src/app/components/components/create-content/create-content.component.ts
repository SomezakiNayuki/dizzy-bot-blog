import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDefinition } from 'src/app/models/form-definition';
import { Submitable } from 'src/app/models/submitable';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'dzb-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  @Input() public formFields: FormDefinition[];
  @Input() public submitable: Submitable;

  protected isCreating: boolean = false;
  protected form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private dataService: DataService
  ) {}

  public ngOnInit(): void {
    this.isCreating = false;

    let formGroup = {};
    this.formFields.forEach(definition => {
      formGroup[definition.formName as string] = definition.isRequired ? ['',  Validators.required] : ['', null];
    });

    this.form = this.formBuilder.group(formGroup);
  }

  protected create(): void {
    this.ngOnInit();
    this.isCreating = true;
  }

  protected discard(): void {
    this.isCreating = false;
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      for (let key in this.form.value) {
        this.submitable[key] = this.form.value[key];
      }

      this.dataService.submit(this.submitable);
      this.isCreating = false;
    }
  }

}
