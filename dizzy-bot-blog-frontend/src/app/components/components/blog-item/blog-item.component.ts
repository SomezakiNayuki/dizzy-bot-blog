import { Component, Input, OnInit } from '@angular/core';
import { PageEnum } from 'src/app/enumerations/page.enum';
import { Blog } from 'src/app/models/blog';
import { LabelService } from 'src/app/pipes/label.service';
import { DataService } from 'src/app/services/data.service';
import { PageNavigationService } from 'src/app/services/page-navigation.service';
import { UserService } from 'src/app/services/user.service';
import * as label from 'src/app/components/components/blog-item/blog-item.label.json';
declare var $: any;

@Component({
  selector: 'dzb-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
  providers: [LabelService]
})
export class BlogItemComponent implements OnInit {

  @Input() public blogs: Blog[];
  @Input() public filtered: boolean;

  protected activeBlog: Blog;

  constructor(
    private dataService: DataService,
    private labelService: LabelService,
    private pageNavigationService: PageNavigationService,
    private userService: UserService
  ) {}
  
  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
    this.activeBlog = null;
  }

  // To avoid re-rendering list causing animation flickering
  protected detectChange(index: number, item: any): any {
    return item.id;
  }

  protected delete(id: number): void {
    this.dataService.deleteBlog(id);
  }

  protected isBlogOwner(blog: Blog): boolean {
    return blog.username === this.userService.getCashedHost()?.username && this.filtered;
  }

  protected viewProfile(username: string): void {
    this.userService.fetchUser(username, () => { this.pageNavigationService.setActive(PageEnum.ABOUT_ME); });
  }

  protected getSortedBlogs(): Blog[] {
    return this.blogs?.reverse();
  }

  protected getBriefContent(content: string): string {
    return content.slice(0, 10) + '...';
  }

  protected openBlogDetail(blog: Blog): void {
    this.activeBlog = blog;
    $('#blogDetailModal').modal('show');
  }

  protected archiveBlog(id: number): void {
    if (!this.isArchived(id)) {
      this.dataService.archiveBlog(id);
    } else {
      this.dataService.removeArchivedBlog(id);
    }
  }

  protected isArchived(id: number): boolean {
    const test = this.userService.getCashedHost()?.archivedBlogs;
    return this.userService.getCashedHost()?.archivedBlogs.find(blog => blog.id === id) != null;
  }

}
