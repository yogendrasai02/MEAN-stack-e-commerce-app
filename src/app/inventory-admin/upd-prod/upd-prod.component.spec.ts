import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdProdComponent } from './upd-prod.component';

describe('UpdProdComponent', () => {
  let component: UpdProdComponent;
  let fixture: ComponentFixture<UpdProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
