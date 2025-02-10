import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreazionemovimentiComponent } from './creazionemovimenti.component';

describe('CreazionemovimentiComponent', () => {
  let component: CreazionemovimentiComponent;
  let fixture: ComponentFixture<CreazionemovimentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreazionemovimentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreazionemovimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
