import { Injectable } from '@angular/core';
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

  public sharedChapterImageIndex = -1;

  private _sharedMangaList: BehaviorSubject<IMangaLite[]> = new BehaviorSubject(new Array<IMangaLite>());
  private _shuffledMangas: BehaviorSubject<IMangaLite[]> = new BehaviorSubject(new Array<IMangaLite>());
  private _sharedChapter: BehaviorSubject<IChapter> = new BehaviorSubject({
    images: new Array<any>()
  });
  private _sharedImageURL: BehaviorSubject<string> = new BehaviorSubject('');
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
  private _apiURL = 'https://www.mangaeden.com/api/';
  private _imageURL = 'https://cdn.mangaeden.com/mangasimg/';

  constructor(private _http: HttpClient) {
    this.assignSharedMangas();
   }

  // STATIC FUNCTIONS

   static shuffle(list: any[]): any[] {
    for (let i = list.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [list[i], list[r]] = [list[r], list[i]];
      if (i % 25 === 0) {
      }
    }
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

  // METHODS

  /**
   * queries the API for the complete collection of mangas
   * !!! This method is to only be called ONCE !!!
   */
   assignSharedMangas() {
    this._http.get<IMangaList>(this._apiURL + 'list/0').subscribe(
      data => {
        this._sharedMangaList.next(data.manga);
        this._shuffledMangas.next(MangaManagerService.shuffleAndReturn144(data.manga));
      }
    );
   }

  /**
   * returns the starting URL path for images that need to be accessed from the CDN
   */
  getImageURL(): string {
    return this._imageURL;
  }

  /**
   * returns the entire collecetion of mangas that can be subscribed to
   */
  getSharedMangas(): BehaviorSubject<IMangaLite[]> {
    return this._sharedMangaList;
  }

  /**
   * returns a Behavior subject of shuffled mangas that can be subscribed to
   */
  getShuffledMangas(): BehaviorSubject<IMangaLite[]> {
    return this._shuffledMangas;
  }

  /**
   * returns a the current shared Chapter as a BehaviorSubject
   */
  getSharedChapter(): BehaviorSubject<IChapter> {
    return this._sharedChapter;
  }

  /**
   * sets the current chapter values and initializes ImageIndex
   * @param id string - id of the chapter
   * @param callback callback method - optional
   */
  assignCurrentChapter(id: string, callback?: () => void) {
    this._http.get<IChapter>(this._apiURL + 'chapter/' + id).subscribe(
      (data: IChapter) => {
        data.images = data.images.reverse();
        this._sharedChapter.next(data);
        this.sharedChapterImageIndex = 0;
        if (callback !== undefined) {
          callback();
        }
      }
    );
  }

  /**
   * Sets the current manga as a shared observable after grabbing it
   * @param id string - id of the manga to be set as the shared manga
   */
  assignCurrentManga(id: string) {
    this._http.get<IManga>(this._apiURL + 'manga/' + id).subscribe(
      data => {
        this._sharedCurrentManga.next(data);
      }
    );
  }

  /**
   * Grabs the current manga (shared observable)
   */
  getCurrentManga(): BehaviorSubject<IManga> {
    return this._sharedCurrentManga;
  }

  getNextImage(): any {
    this._sharedChapter.subscribe(
      (data: IChapter) => {
        if (this.sharedChapterImageIndex < data.images.length && this.sharedChapterImageIndex !== -1) {
          this.sharedChapterImageIndex++;
          return (this._imageURL + data.images[this.sharedChapterImageIndex - 1][1]);
        } else {
          return null;
        }
      }
    );
  }

  queueNextImage() {
    this._sharedChapter.subscribe(
      (data: IChapter) => {
        this.sharedChapterImageIndex++;
        if (this.sharedChapterImageIndex !== -1 && this.sharedChapterImageIndex < data.images.length) {
          this._sharedImageURL.next(this._imageURL + data.images[this.sharedChapterImageIndex][1]);
        }
      }
    );
  }

  getNextImageObservable(): BehaviorSubject<string> {
    return this._sharedImageURL;
  }

  assignNextImageObservable() {
    this._sharedChapter.subscribe(
      (data: IChapter) => {
        if (this.sharedChapterImageIndex !== -1 && this.sharedChapterImageIndex < data.images.length) {
          this._sharedImageURL.next(this._imageURL + data.images[this.sharedChapterImageIndex][1]);
        }
      }
    );
  }

  /**
   * [image number (number), image path, hits?, hits?]
   * @param chapterId string - id of the chapter
   */
  getObservableChapter(chapterId: string): Observable<IChapter> {
    return new Observable((observer) => {
      this._http.get<IChapter>(this._apiURL + 'chapter/' + chapterId).subscribe(
        (data: IChapter) => {
          data.images = data.images.reverse(); // sorts images in correct order
          observer.next(data);
          observer.complete();
        }
      );
    });
  }
}
