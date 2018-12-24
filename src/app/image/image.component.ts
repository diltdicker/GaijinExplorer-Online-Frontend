import { Component, OnInit, Input } from '@angular/core';
import { MangaManagerService } from '../manga-manager.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() imgPath: string;

  constructor(private _mangaManagerService: MangaManagerService) { }

  ngOnInit() {}

  public nextImage() {
    console.log('get next image');
  }

}
