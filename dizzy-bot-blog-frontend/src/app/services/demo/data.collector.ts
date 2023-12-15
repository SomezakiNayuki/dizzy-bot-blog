import { Injectable } from "@angular/core";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: 'root'
})
export class DataCollector {

  public users: User[] = new Array<User>();

}