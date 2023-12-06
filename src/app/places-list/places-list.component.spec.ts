import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListComponent } from './places-list.component';

describe('PlacesListComponent', () => {
  let component: PlacesListComponent;
  let fixture: ComponentFixture<PlacesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacesListComponent]
    });
    fixture = TestBed.createComponent(PlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
