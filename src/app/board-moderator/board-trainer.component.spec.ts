import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTrainerComponent } from './board-trainer.component';

describe('BoardTrainerComponent', () => {
  let component: BoardTrainerComponent;
  let fixture: ComponentFixture<BoardTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
