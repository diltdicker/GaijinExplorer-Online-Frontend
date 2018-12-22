import { Component, OnInit } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
