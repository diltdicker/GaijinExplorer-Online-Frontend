import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-manga-selection',
  templateUrl: './manga-selection.component.html',
  styleUrls: ['./manga-selection.component.scss']
})
export class MangaSelectionComponent implements OnInit {

  public mangaObjs = [];

  constructor() { }

  ngOnInit() {
  }

}
