import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDefinition } from 'src/app/models/form-definition';
import { Submitable } from 'src/app/models/submitable';
import { LabelService } from 'src/app/pipes/label.service';
import { DataService } from 'src/app/services/data.service';
import * as label from 'src/app/components/components/formmy/formmy.label.json';
import { ErrorMessageComponent } from 'src/app/components/components/error-message/error-message.component';

@Component({
  selector: 'formmy',
  templateUrl: './formmy.component.html',
  styleUrls: ['./formmy.component.css'],
  providers: [LabelService]
})
export class FormmyComponent implements OnInit {

  @Input() public formFields: FormDefinition[];
  @Input() public submitable: Submitable;

  @Output() public eventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('formContainer') formContainer: ElementRef;

  protected form: FormGroup;
  private errorComponents: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService,
    private labelService: LabelService,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
    this.form = new FormGroup({});
  }

  public ngAfterViewInit(): void {
    const formContainer = this.formContainer.nativeElement;

    this.formFields.forEach(definition => {
      const el = this.buildFormElement(definition);
      const formItem = this.renderer.createElement('div');
      this.renderer.addClass(formItem, 'ui');
      this.renderer.addClass(formItem, 'segment');
      this.renderer.addClass(formItem, 'dzb-formmy-create-content-segment-white');

      switch (definition.templateDefinition.htmlType) {
        case 'input':
          this.renderer.setProperty(el, 'type', definition.templateDefinition.inputType);
          this.renderer.setProperty(el, 'placeholder', definition.templateDefinition.placeholder);

          definition.templateDefinition.cssClass.split(' ').forEach(css => {
            this.renderer.addClass(el, css);
          });

          this.renderer.appendChild(formItem, this.buildWrapper(definition, el));
          this.buildError(definition, formItem);
          this.renderer.appendChild(formContainer, formItem);

          this.bindFormContorl(definition, el);
          break;
        case 'textarea':
          this.renderer.setProperty(el, 'rows', definition.templateDefinition.rows);

          definition.templateDefinition.cssClass.split(' ').forEach(css => {
            this.renderer.addClass(el, css);
          });

          this.renderer.appendChild(formItem, this.buildWrapper(definition, el));
          this.buildError(definition, formItem);
          this.renderer.appendChild(formContainer, formItem);

          this.bindFormContorl(definition, el);
          break;
        default:
          break;
      }
    });
  }

  private buildFormElement(definition: FormDefinition): any {
    const el = this.renderer.createElement(definition.templateDefinition.htmlType);

    this.renderer.setProperty(el, '[formControlName]', definition.formDefinition.formName);
    this.renderer.setProperty(el, '[required]', definition.templateDefinition.isRequired);
    
    return el;
  }

  private buildWrapper(definition: FormDefinition, el: any): any {
    if (definition.wrapper) {
      const div = this.renderer.createElement('div');

      definition.wrapper?.cssClass.split(' ').forEach(css => {
        this.renderer.addClass(div, css);
      });

      this.renderer.appendChild(div, el);
      return div;
    } else {
      return el;
    }
  }

  private buildError(definition: FormDefinition, el: any): void {
    if (definition.templateDefinition.isRequired) {
      const errorComponent = this.viewContainerRef.createComponent(ErrorMessageComponent);
      errorComponent.instance.message = "This field is required";
      errorComponent.instance.detectChange();
      this.errorComponents.push(errorComponent);
      const componentNativeElement = (errorComponent.hostView as any).rootNodes[0] as Node;
      this.renderer.appendChild(el, componentNativeElement);
    }
  }

  private bindFormContorl(definition: FormDefinition, el: any): void {
    let formControl = new FormControl('', null);
    this.form.addControl(definition.formDefinition.formName, formControl);
    this.renderer.listen(el, 'input', () => {
      formControl.setValue(el.value);
    });
    if (definition.templateDefinition.isRequired) {
      this.form.controls[definition.formDefinition.formName].addValidators(Validators.required);
    }
    this.cdr.detectChanges();
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      for (let key in this.form.value) {
        this.submitable[key] = this.form.value[key];
      }

      this.dataService.submit(this.submitable);
      this.discard();
    } else {
      this.errorComponents.forEach(ec => {
        ec.instance.show = true;
        ec.instance.detectChange();
      });
    }
  }

  protected discard(): void {
    this.eventEmitter.emit();
  }

}
