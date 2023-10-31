import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTableComponent } from './games-table.component';

describe('GamesTableComponent', () => {
  let component: GamesTableComponent;
  let fixture: ComponentFixture<GamesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesTableComponent]
    });
    fixture = TestBed.createComponent(GamesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
