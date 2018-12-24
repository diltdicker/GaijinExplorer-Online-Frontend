import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  /**
   * queues up the next image to be loaded
   * is called after the <img> (load) event
   */
  public nextImage() {
    this._mangaManagerService.queueNextImage();
  }

}
