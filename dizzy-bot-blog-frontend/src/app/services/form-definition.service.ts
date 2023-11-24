import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDefinition } from '../models/form-definition';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionService {

  constructor(private http: HttpClient) { }

  public getBlogFormDefinitions(): Observable<FormDefinition[]> {
    return this.http.get<FormDefinition[]>('assets/form-definitions/blogFormDefinitions.json');
  }

  public getEmploymentFormDefinitions(): Observable<FormDefinition[]> {
    return this.http.get<FormDefinition[]>('assets/form-definitions/employmentFormDefinitions.json');
  }

}
