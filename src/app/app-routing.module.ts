import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaSelectionComponent } from './manga-selection/manga-selection.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MangaComponent } from './manga/manga.component';
import { ChapterComponent } from './chapter/chapter.component';

const routes: Routes = [
  { path: '', component: MangaSelectionComponent },
  { path: 'search', component: SearchResultComponent},
  { path: 'manga/:id', component: MangaComponent },
  { path: 'manga/:id/:chapter', component: ChapterComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
