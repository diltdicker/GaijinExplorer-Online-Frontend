import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaManagerService } from '../manga-manager.service';
import { TestServService } from '../test-serv.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.scss']
})
export class MangaComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService,
    private _testServService: TestServService) { }

  ngOnInit() {
    this._testServService.getServiceValue().subscribe(
      function(num) {
        console.log('manga' + num);
      }
    );
    this._route.params.subscribe(
      function(params) {
        console.log('params: ' + params.id);
        // console.log(params['id']);
      }
    );
  }

}
