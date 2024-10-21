import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEvaluationComponent } from './save-evaluation.component';

describe('SaveEvaluationComponent', () => {
  let component: SaveEvaluationComponent;
  let fixture: ComponentFixture<SaveEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
