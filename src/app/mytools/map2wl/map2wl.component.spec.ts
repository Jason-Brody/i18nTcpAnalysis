import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Map2wlComponent } from './map2wl.component';

describe('Map2wlComponent', () => {
  let component: Map2wlComponent;
  let fixture: ComponentFixture<Map2wlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Map2wlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Map2wlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
