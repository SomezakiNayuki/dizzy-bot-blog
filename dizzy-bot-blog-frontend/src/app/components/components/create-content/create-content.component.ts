import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { FormDefinition } from 'src/app/models/form-definition';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dzb-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  // form definitions
  @Input() public formFields: FormDefinition[];

  // submission type
  @Input() public submissionType: string;

  // functional variables
  protected isCreating: boolean = false;

  // form
  protected form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  public ngOnInit(): void {
    this.isCreating = false;

    let formGroup = {};
    this.formFields.forEach(definition => {
      formGroup[definition.formName as string] = definition.isRequired ? ['',  Validators.required] : [''];
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
    let obj = {};
    if (this.form.valid) {
      for (let key in this.form.value) {
        obj[key] = this.form.value[key];
      }
      console.log(obj);

      this.dataService.submit(obj, this.submissionType);
      this.isCreating = false;
    }
  }

}
