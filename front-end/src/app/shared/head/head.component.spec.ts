import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HEADComponent } from './head.component';

describe('HEADComponent', () => {
  let component: HEADComponent;
  let fixture: ComponentFixture<HEADComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HEADComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HEADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
