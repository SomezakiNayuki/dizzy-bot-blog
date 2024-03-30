import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { LabelService } from 'src/app/pipes/label.service';
declare var $: any;
import * as label from 'src/app/components/components/blog-detail/blog-detail.label.json';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dzb-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  providers: [LabelService]
})
export class BlogDetailComponent implements OnInit {

  @Input() public blog: Blog;

  constructor(
    private dataService: DataService,
    private labelService: LabelService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

  protected closeBlogDetail(): void {
    $('#blogDetailModal').modal('hide');
  }

  protected archiveBlog(id: number): void {
    if (!this.isArchived(id)) {
      this.dataService.archiveBlog(id);
    } else {
      this.dataService.removeArchivedBlog(id);
    }
  }

  protected isArchived(id: number): boolean {
    return this.userService.getCashedHost()?.archivedBlogIds.find(blogId => blogId === id) != null;
  }

}
