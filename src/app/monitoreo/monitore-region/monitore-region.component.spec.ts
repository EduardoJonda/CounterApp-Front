import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreRegionComponent } from './monitore-region.component';

describe('MonitoreRegionComponent', () => {
  let component: MonitoreRegionComponent;
  let fixture: ComponentFixture<MonitoreRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoreRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoreRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
