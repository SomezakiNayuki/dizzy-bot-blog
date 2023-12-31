export interface FormDefinition {
  formDefinition: {
    formName: string
  },
  templateDefinition: {
    htmlType: string,
    inputType?: string,
    placeholder?: string,
    validator?: string,
    isRequired: boolean,
    cssClass: string,
    rows?: number,
    additionalAttrs?: []
  }
}