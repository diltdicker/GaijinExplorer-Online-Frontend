import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IManga } from './interfaces/IManga';
import { IMangaLite } from './interfaces/IMangaLite';

@Injectable({
  providedIn: 'root'
})
export class MangaManagerService {

  public mangaObjs = [];

  private _apiURL = '';
  private _imageURL = '';

  constructor(private http: HttpClient) {  }

  getMangas() {
    return this.mangaObjs;
  }

  // requestMangas()
}
