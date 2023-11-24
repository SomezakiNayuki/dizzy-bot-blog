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

  // functional variables
  protected isCreating: boolean = false;

  // form
  protected blogForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private userService: UserService, private http: HttpClient) { }

  public ngOnInit(): void {
    this.isCreating = false;

    let formGroup = {};
    this.formFields.forEach(definition => {
      formGroup[definition.formName as string] = definition.isRequired ? ['',  Validators.required] : [''];
    });

    this.blogForm = this.formBuilder.group(formGroup);
  }

  protected create(): void {
    this.ngOnInit();
    this.isCreating = true;
  }

  protected discard(): void {
    this.isCreating = false;
  }

  protected onSubmit(): void {
    // [TODO] Generalize submission
    if (this.blogForm.valid) {
      const title = this.blogForm.get('title').value;
      const subtitle = this.blogForm.get('subtitle').value;
      const content = this.blogForm.get('content').value;
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');

      const blog: Blog = {
        title: title,
        subtitle: subtitle,
        username: this.userService.getUser().username,
        content: content,
        likes: 0,
        date: formattedDate
      }

      this.dataService.createBlogs(blog);
      this.isCreating = false;
    }
  }

}
