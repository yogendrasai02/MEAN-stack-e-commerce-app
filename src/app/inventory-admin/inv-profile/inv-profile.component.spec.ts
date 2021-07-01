import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvProfileComponent } from './inv-profile.component';

describe('InvProfileComponent', () => {
  let component: InvProfileComponent;
  let fixture: ComponentFixture<InvProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
