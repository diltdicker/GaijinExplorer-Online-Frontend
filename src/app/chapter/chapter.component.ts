import {
   Component,
   OnInit,
   ComponentFactoryResolver,
   Directive,
   ViewChild,
   ViewContainerRef,
   ComponentRef,
   ComponentFactory,
   Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChapter } from '../interfaces/IChapter';
import { MangaManagerService } from '../manga-manager.service';
import { Observable, from } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  @ViewChild('imageContainer', {read: ViewContainerRef}) entry: ViewContainerRef;

  public cdnURL: string;
  public chapter: IChapter = { images: [] }; // use this
  public images: string[];
  public chapterImages = [];

  public tmpChapter: IChapter = { images: [] };
  public tmpIndex = 0;
  public imageData;

  public asyncImages;
  public asyncImage;

  tmpInterval: any;

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService,
     private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.cdnURL = this._mangaManagerService.getImageURL();
    console.log('chapter');
    this._route.params.subscribe(
      params => {
        console.log(params);
        this._mangaManagerService.getObservableChapter(params.chapterId).subscribe(
          (chapterData: IChapter) => {
            this.tmpChapter = chapterData;
          }
        );
      }
    );
    this.nextImage();
  }

  public nextImage() {
    console.log('called');
    this.entry.clear();
    const factory = this._componentFactoryResolver.resolveComponentFactory(ImageComponent);
    const componentRef = this.entry.createComponent(factory);
    this.entry.createComponent(factory);
    this.entry.createComponent(factory);
  }

  public appImagedLoaded() {
    console.log('imaged loaded');
  }

}
