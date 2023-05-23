import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendSideComponent } from './trend-side.component';

describe('TrendSideComponent', () => {
  let component: TrendSideComponent;
  let fixture: ComponentFixture<TrendSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendSideComponent]
    });
    fixture = TestBed.createComponent(TrendSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
