import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupmeComponent } from './groupme.component';

describe('GroupmeComponent', () => {
  let component: GroupmeComponent;
  let fixture: ComponentFixture<GroupmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
