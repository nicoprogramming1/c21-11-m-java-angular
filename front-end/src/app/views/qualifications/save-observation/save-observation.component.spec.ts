import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveObservationComponent } from './save-observation.component';

describe('SaveObservationComponent', () => {
  let component: SaveObservationComponent;
  let fixture: ComponentFixture<SaveObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveObservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
