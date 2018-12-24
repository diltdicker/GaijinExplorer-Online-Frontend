import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { from, Observable } from 'rxjs';
import { IMangaLite } from '../interfaces/IMangaLite';
import { Router } from '@angular/router';
// import { TestServService } from '../test-serv.service';

@Component({
  selector: 'app-manga-selection',
  templateUrl: './manga-selection.component.html',
  styleUrls: ['./manga-selection.component.scss']
})
export class MangaSelectionComponent implements OnInit {

  public mangas: IMangaLite[] = [];
  public cdnURL: string;
  public testImage = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  public testString = 'https://cdn.mangaeden.com/mangasimg/89/895a2f7c551df340121483918440668e585c8a6de6b2300cc6fb2e9d.png';
  public defaultImage = '/assets/load_image.png';

  constructor(private _mangaManagerService: MangaManagerService, private _router: Router) { }

  ngOnInit() {
    this.cdnURL = this._mangaManagerService.getImageURL();
    this._mangaManagerService.getShuffledMangas().subscribe(
      data => this.mangas = data
    );
  }

  onClick(manga) {
    console.log(manga);
    this._router.navigate(['/manga', manga.i]);
  }

}
