export interface Submitable {
  submit(): void,
  toObject(object: Submitable): Object
}