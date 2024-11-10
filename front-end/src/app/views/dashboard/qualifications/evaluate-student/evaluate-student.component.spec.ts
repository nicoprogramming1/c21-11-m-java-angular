import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudentComponent } from './evaluate-student.component';

describe('EvaluateStudentComponent', () => {
  let component: EvaluateStudentComponent;
  let fixture: ComponentFixture<EvaluateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
