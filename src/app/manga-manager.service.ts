import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IManga } from './interfaces/IManga';
import { IMangaLite } from './interfaces/IMangaLite';
import { IMangaList } from './interfaces/IMangaList';
import { IChapter } from './interfaces/IChapter';

@Injectable({
  providedIn: 'root'
})
export class MangaManagerService {

  private _mangaObjs: Observable<IMangaLite[]> = new Observable((observer) => {
    this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
      function(data) {
        // console.log(data.manga);
        // this.mangaObjs = of(data.manga);
        // console.log();
        observer.next(data.manga);
        observer.complete();
        console.log(data.manga);
      }
    );
  });
  private _currentManga: Observable<IManga>;
  private _currentChapterIndex = -1;
  private _currentChapter: Observable<IChapter>;
  private _apiURL = 'https://www.mangaeden.com/api/';
  private _imageURL = '';
  private isLibLoaded = false;

  constructor(private _http: HttpClient) {
    console.log('service loaded');
    // this.mangaObjs = ['anime', 'is', 'the', 'best'];
    console.log('constructor done');
  }

  getMangaString() {
    // console.log('start req');
    return this._apiURL + 'list/0';
  }

  getMangas(): Observable<IMangaLite[]> {
    console.log('subscribe');
    return this._mangaObjs;
  }

  pullMangas() {
    // console.log('pull');
    // this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
    //   function(data) {
    //     // console.log(data.manga);
    //     // this.mangaObjs = of(data.manga);
    //     // console.log();
    //     this.mangaObjs = new Observable((observer) => {
    //       observer.next(data.manga);
    //       observer.complete();
    //     });
    //     console.log(data.manga);
    //   }
    // );
  }

  getDummyArray() {
    return ['1 pear tree', '2 hens a laying', '3 french hens', '4 doves a cooing', '5 golden rings, bah dum dum dum'];
  }
  // requestMangas()
}
