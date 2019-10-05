import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakepathComponent } from './fakepath.component';

describe('FakepathComponent', () => {
  let component: FakepathComponent;
  let fixture: ComponentFixture<FakepathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakepathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakepathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
