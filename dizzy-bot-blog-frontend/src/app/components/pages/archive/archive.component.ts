import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'dzb-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  protected archivedBlogIds$: Observable<Blog[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.archivedBlogIds$ = this.dataService.getArchivedBlogs();
  }

}
