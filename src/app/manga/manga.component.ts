import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaManagerService } from '../manga-manager.service';
import { IManga } from '../interfaces/IManga';
// import { TestServService } from '../test-serv.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.scss']
})
export class MangaComponent implements OnInit {

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

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    // this._testServService.getServiceValue().subscribe(
    //   function(num) {
    //     console.log('manga' + num);
    //   }
    // );
    this._route.params.subscribe(
      params => {
        this._mangaManagerService.assignCurrentManga(params.id);
        console.log('assigned: ' + params.id);
        // this._mangaManagerService.getObservableManga(params.id).subscribe(
        //   (observedManga: IManga) => {
        //     // console.log('after params: ' + observedManga.chapters);
        //     this.manga = observedManga;
        //   }
        // );
        this._mangaManagerService.getCurrentManga().subscribe(
          (currentManga: IManga) => {
            this.manga = currentManga;
          }
        );
      }
    );
  }



}
