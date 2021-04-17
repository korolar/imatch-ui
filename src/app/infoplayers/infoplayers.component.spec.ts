import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoplayersComponent } from './infoplayers.component';

describe('InfoplayersComponent', () => {
  let component: InfoplayersComponent;
  let fixture: ComponentFixture<InfoplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoplayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
