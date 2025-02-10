import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzamovimentiComponent } from './visualizzamovimenti.component';

describe('VisualizzamovimentiComponent', () => {
  let component: VisualizzamovimentiComponent;
  let fixture: ComponentFixture<VisualizzamovimentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzamovimentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzamovimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
