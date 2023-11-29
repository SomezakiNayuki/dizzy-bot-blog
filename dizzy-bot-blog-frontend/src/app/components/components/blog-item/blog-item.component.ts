import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dzb-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {

  // inputted variables
  @Input() public blogs: Blog[];

  constructor(private dataService: DataService, private userService: UserService, private loginService: LoginService) {}

  // To avoid re-rendering list causing animation flickering
  protected detectChange(index: number, item: any): any {
    return item.id;
  }

  protected delete(id: number): void {
    this.dataService.deleteBlog(id);
  }

  protected isBlogOwner(blog: Blog): boolean {
    return this.loginService.getIsLoggedIn() && blog.username === this.userService.getUser().username;
  }

}
