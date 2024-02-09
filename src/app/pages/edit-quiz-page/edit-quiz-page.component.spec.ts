import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizPageComponent } from './edit-quiz-page.component';

describe('EditQuizPageComponent', () => {
  let component: EditQuizPageComponent;
  let fixture: ComponentFixture<EditQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuizPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
