import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSelectionComponent } from './manga-selection.component';

describe('MangaSelectionComponent', () => {
  let component: MangaSelectionComponent;
  let fixture: ComponentFixture<MangaSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
