import {
   Component,
   OnInit,
   ComponentFactoryResolver,
   ViewChild,
   ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaManagerService } from '../manga-manager.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  @ViewChild('imageContainer', {read: ViewContainerRef}) imageContainer: ViewContainerRef;

  public cdnURL: string;

  constructor(private _route: ActivatedRoute, private _mangaManagerService: MangaManagerService,
     private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.imageContainer.clear();
    this.cdnURL = this._mangaManagerService.getImageURL();
    this._route.params.subscribe(
      params => {
        this._mangaManagerService.assignCurrentChapter(params.chapterId, () => {
          this._mangaManagerService.assignNextImageObservable();
          this.nextImage();
        });
      }
    );
  }

  /**
   * Loads the Next Image and pushes it onto the image container
   * getNextImageObservable() pushes the next image everytime a new one is queued
   */
  public nextImage() {
    const factory = this._componentFactoryResolver.resolveComponentFactory(ImageComponent);
    this._mangaManagerService.getNextImageObservable().subscribe(
      (img) => {
        if (img !== undefined && img !== null) {
          const componentRef = this.imageContainer.createComponent(factory);
          componentRef.instance.imgPath = img;
        }
      }
    );
  }

}
