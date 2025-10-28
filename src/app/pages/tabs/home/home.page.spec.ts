import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
// --- Minimal mocks ---
class MockRouter { navigate() {} }
fdescribe('HomePage - Simple Test', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the HomePage', () => {
    expect(component).toBeTruthy(); // :white_check_mark: simple test: component exists
  });
  it('should have default selectedSegment as "all-sessions"', () => {
    expect(component.selectedSegment).toBe('all-sessions'); // simple property test
  });
  it('gotToTop should call scrollToTop on content', () => {
    // mock IonContent
    component.content = { scrollToTop: jasmine.createSpy() } as any;
    component.gotToTop();
    expect(component.content.scrollToTop).toHaveBeenCalledWith(1000);
  });
});