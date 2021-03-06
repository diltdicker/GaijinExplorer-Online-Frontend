import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ResponsiveModule } from 'ngx-responsive';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MangaSelectionComponent } from './manga-selection/manga-selection.component';
import { MangaComponent } from './manga/manga.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { MangaManagerService } from './manga-manager.service';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { from } from 'rxjs';
import { ImageComponent } from './image/image.component';
// import { TestServService } from './test-serv.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MangaSelectionComponent,
    MangaComponent,
    ChapterComponent,
    SearchResultComponent,
    NotFoundComponent,
    MangaDetailsComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResponsiveModule.forRoot(),
    HttpClientModule,
    LazyLoadImageModule
  ],
  entryComponents: [ImageComponent],
  providers: [MangaManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
