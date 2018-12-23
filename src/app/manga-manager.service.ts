import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable, of, from, BehaviorSubject } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { IManga } from './interfaces/IManga';
import { IMangaLite } from './interfaces/IMangaLite';
import { IMangaList } from './interfaces/IMangaList';
import { IChapter } from './interfaces/IChapter';

@Injectable({
  providedIn: 'root'
})
export class MangaManagerService {

  private _sharedMangaList = new BehaviorSubject(new Array<IMangaLite>());
  private _inMemoryMangas: IMangaLite[] = null;
  private _mangaList: Observable<IMangaLite[]>;
  private _shuffledMangas = new BehaviorSubject(new Array<IMangaLite>());
  private _sharedCurrentManga = new BehaviorSubject({
    id: 'missing',
    title: 'missing',
    artist: 'missing',
    author: 'missing',
    categories: new Array<string>(),
    description: 'missing',
    chapters: new Array<Array<any>>(),
    last_chapter_date: 0
  });
  // TODO make static so that it is not reloaded everytime someoneone goes back to the homepage
  // private _mangaObjs: Observable<IMangaLite[]> = new Observable((observer) => {
  //   this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
  //     function(data) {
  //       // console.log(data.manga);
  //       // this.mangaObjs = of(data.manga);
  //       // console.log();
  //       // this._sharedMangaList = new BehaviorSubject(data.manga);
  //       this._sharedMangaList.next(data.manga);
  //       observer.next(data.manga);
  //       observer.complete();
  //       // console.log(data.manga);
  //     }
  //   );
  // });
  private _currentManga: Observable<IManga>;
  private _currentChapterIndex = -1;
  private _currentChapter: Observable<IChapter>;
  private _apiURL = 'https://www.mangaeden.com/api/';
  private _imageURL = 'https://cdn.mangaeden.com/mangasimg/';
  private isLibLoaded = false;

  static shuffle(list: any[]): any[] {
    for (let i = list.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [list[i], list[r]] = [list[r], list[i]];
      if (i % 25 === 0) {
        // console.log('i:' + i);
      }
    }
    // console.log(list.length);
    return list;
  }

  static shuffleAndReturn144(list: any[]): any[] {
    list = MangaManagerService.shuffle(list);
    if (list.length >= 144) {
      return list.slice(0, 144);
    } else {
      return list;
    }
  }
  // private _sharedMangaList = this._mangaList.share();

  constructor(private _http: HttpClient) {
    console.log('service constructor');
    // this._mangaList = this.getMangaList();
    // this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
    //   function(data) {
    //     this._sharedMangaList.next(data.manga);
    //   }
    // );
    // this._sharedMangaList = new BehaviorSubject({});
    this.assignSharedMangas();
   }

   assignSharedMangas() {
     // this._sharedMangaList.next(data.manga);
    //  function(data: IMangaList) {
    //   this._shuffledMangas.next(MangaManagerService.shuffleAndReturn144(data.manga));
    // }
    this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
      data => {
        this._sharedMangaList.next(data.manga);
        this._shuffledMangas.next(MangaManagerService.shuffleAndReturn144(data.manga));
      }
    );
   }

  // getMangaString() {
  //   // console.log('start req');
  //   return this._apiURL + 'list/0';
  // }

  private getMangaList(): Observable<IMangaLite[]> {
    console.log('Get Manga List');
    return new Observable((observer) => {
      this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
        function(data) {
          console.log('http request');
          observer.next(data.manga);
          observer.complete();
          console.log('size: ' + data.manga.length);
        },
        function(error) {
          console.log(error);
        }
      );
    });
  }

  /**
   * Gets all the mangas in the entire collection
   */
  getMangas(): Observable<IMangaLite[]> {
    // console.log('subscribe');
    return this._mangaList;
  }

  getObservableManga(id): Observable<IManga> {
    this._currentManga = new Observable((observer) => {
      this._http.get<IManga>(this._apiURL + 'manga/' + id + '/').subscribe(
        data => {
          console.log('url: ' + this._apiURL + 'manga/' + id);
          console.log('getObsMnga ' + data.title);
          observer.next(data);
          observer.complete();
        }
      );
    });
    return this._currentManga;
  }

  getChapter(id): Observable<IChapter> {
    this._currentChapter = new Observable((observer) => {
    });
    return this._currentChapter;
  }

  getNextChapter(): string {
    if (this._currentManga === undefined) {
      return null;
    } else {
      return null;
    }
  }

  getPreviousChapter(): string {
    if (this._currentManga === undefined) {
      return null;
    } else {
      return null;
    }
  }

  getImageURL(): string {
    return this._imageURL;
  }

  getShuffled144Mangas(): Observable<IMangaLite[]> {
    return new Observable((observer) => {
      // this._sharedMangaList.subscribe(
      this.getSharedMangas().subscribe(
        function(data) {
          data = MangaManagerService.shuffle(data);
          observer.next(data.slice(0, 144));
          observer.complete();
        }
      );
    });
  }

  getImageBytes() {
    const url = 'https://cdn.mangaeden.com/mangasimg/5b/5b600dd36f47db39394baf3ec3acdba7307d17c5608be7401dbea092.png';
    const headers = new HttpHeaders();
    headers.append('access-control-allow-origin', '*');
    const options = {
      headers: headers
    };
    console.log(options.headers);
    this._http.get(url, options).subscribe(
      function(data) {
        console.log('dl image:');
        console.log(data);
      },
      function(error) {
        console.log(error);
      }
    );
  }

  getSharedMangas(): BehaviorSubject<IMangaLite[]> {
    // return new Observable((observer) => {
    //   this._sharedMangaList.subscribe(
    //     function(data: IMangaLite[]) {
    //       console.log('getSharedMangas: ' + data);
    //       observer.next(data);
    //       observer.complete();
    //     }
    //   );
    // });
    return this._sharedMangaList;
  }

  newShuffledMangas() {

  }

  getShuffledMangas(): BehaviorSubject<IMangaLite[]> {
    return this._shuffledMangas;
  }

  assignCurrentManga(id: string) {
    this._http.get<IManga>(this._apiURL + '/manga' + id + '/').subscribe(
      data => {
        this._sharedCurrentManga.next(data);
      }
    );
  }

  getCurrentManga(): BehaviorSubject<IManga> {
    return this._sharedCurrentManga;
  }

  // setCurrentManga(manga: IMangaLite) {
  //   this._currentManga = {
  //     id: manga.i,
  //     title: manga.t
  //   };
  // }

  // setCurrentManga()

  // pullMangas() {
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
  // }

  getDummyArray() {
    return ['1 pear tree', '2 hens a laying', '3 french hens', '4 doves a cooing', '5 golden rings, bah dum dum dum'];
  }
  // requestMangas()
}
