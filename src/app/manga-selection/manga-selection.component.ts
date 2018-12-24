import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { IMangaLite } from '../interfaces/IMangaLite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-selection',
  templateUrl: './manga-selection.component.html',
  styleUrls: ['./manga-selection.component.scss']
})
export class MangaSelectionComponent implements OnInit {

  public mangas: IMangaLite[] = [];
  public cdnURL: string;

  constructor(private _mangaManagerService: MangaManagerService, private _router: Router) { }

  ngOnInit() {
    this.cdnURL = this._mangaManagerService.getImageURL();
    this._mangaManagerService.getShuffledMangas().subscribe(
      data => this.mangas = data
    );
  }

  onClick(manga) {
    this._router.navigate(['/manga', manga.i]);
  }

}
