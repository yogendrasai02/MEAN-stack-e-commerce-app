import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdCategoryComponent } from './upd-category.component';

describe('UpdCategoryComponent', () => {
  let component: UpdCategoryComponent;
  let fixture: ComponentFixture<UpdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
