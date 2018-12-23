import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaManagerService } from '../manga-manager.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.scss']
})
export class MangaComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    this._route.params.subscribe(
      function(params) {
        console.log('params: ' + params.id);
        // console.log(params['id']);
      }
    );
  }

}
