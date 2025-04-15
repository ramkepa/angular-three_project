import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDSceneComponent } from './three-d-scene.component';

describe('ThreeDSceneComponent', () => {
  let component: ThreeDSceneComponent;
  let fixture: ComponentFixture<ThreeDSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDSceneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
