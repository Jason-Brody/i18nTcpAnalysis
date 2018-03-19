import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarComponent } from './har.component';

describe('HarComponent', () => {
  let component: HarComponent;
  let fixture: ComponentFixture<HarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
