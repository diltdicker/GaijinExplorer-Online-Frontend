import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { from, Observable } from 'rxjs';
import { IMangaLite } from '../interfaces/IMangaLite';

@Component({
  selector: 'app-manga-selection',
  templateUrl: './manga-selection.component.html',
  styleUrls: ['./manga-selection.component.scss']
})
export class MangaSelectionComponent implements OnInit {

  public mangas: IMangaLite[] = [];

  public testString = 'test';

  constructor(private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {
    this._mangaManagerService.getMangas().subscribe(
      data => this.mangas = data
    );
  }

}
