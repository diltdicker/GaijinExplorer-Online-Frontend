import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { IManga } from '../interfaces/IManga';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.scss']
})
export class MangaDetailsComponent implements OnInit {

  public manga: IManga = {
    id: 'missing',
    title: 'missing',
    artist: 'missing',
    author: 'missing',
    categories: new Array<string>(),
    description: 'missing',
    chapters: new Array<Array<any>>(),
    last_chapter_date: 0
  };

  constructor(private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    this._mangaManagerService.getCurrentManga().subscribe(
      (currentManga: IManga) => {
        this.manga = currentManga;
      }
    );
  }

}
