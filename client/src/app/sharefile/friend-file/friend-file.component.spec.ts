import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendFileComponent } from './friend-file.component';

describe('FriendFileComponent', () => {
  let component: FriendFileComponent;
  let fixture: ComponentFixture<FriendFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
