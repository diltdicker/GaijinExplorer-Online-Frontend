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

  public manga: IManga;

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    // this._testServService.getServiceValue().subscribe(
    //   function(num) {
    //     console.log('manga' + num);
    //   }
    // );
    this._route.params.subscribe(
      params => {
        console.log('params: ' + params.id);
        this._mangaManagerService.getObservableManga(params.id).subscribe(
          observedManga => {
            console.log('after params: ' + observedManga);
            this.manga = observedManga;
          }
        );
      }
    );
  }



}
