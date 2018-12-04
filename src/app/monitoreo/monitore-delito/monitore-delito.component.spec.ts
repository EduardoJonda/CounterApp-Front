import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreDelitoComponent } from './monitore-delito.component';

describe('MonitoreDelitoComponent', () => {
  let component: MonitoreDelitoComponent;
  let fixture: ComponentFixture<MonitoreDelitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoreDelitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoreDelitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
