import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularRating } from './circular-rating';

describe('CircularRating', () => {
  let component: CircularRating;
  let fixture: ComponentFixture<CircularRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
