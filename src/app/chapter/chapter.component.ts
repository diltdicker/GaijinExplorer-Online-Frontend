import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChapter } from '../interfaces/IChapter';
import { MangaManagerService } from '../manga-manager.service';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  public cdnURL: string;
  public chapter: IChapter = { images: [] };
  public images: string[] = [];

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    this.cdnURL = this._mangaManagerService.getImageURL();
    console.log('chapter');
    this._route.params.subscribe(
      params => {
        console.log(params);
        this._mangaManagerService.getObservableChapter(params.chapterId).subscribe(
          (chapterData: IChapter) => {
            // this.chapter = chapterData;
            const tmp = new Array<string>();
            for (let j = 0; j < chapterData.images.length; j++) {
              tmp.push(this.cdnURL + chapterData.images[j][1]);
            }
            this.images = tmp;
          }
        );
      }
    );
  }

}
