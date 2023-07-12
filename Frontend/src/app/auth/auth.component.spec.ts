import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create mock instances
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  // it('should navigate to "movie/viewMovie" if user is already authenticated', () => {
  //   spyOn(component.userSubscription, 'unsubscribe');

  //   const mockUser = {
  //      _username: "praveen",
  //       email:"praveen@gmail.com",
  //      roles:[],
  //       _accessToken:"abc",
  //      tokenType: 1,
  //   };

  //   component.ngOnInit()
  //   expect(mockAuthService.user.subscribe).toHaveBeenCalled();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/viewMovie']);
  //   expect(component.userSubscription.unsubscribe).toHaveBeenCalled();
  // });

  it('should log in successfully and navigate to "movie/viewMovie" on login', () => {
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';

    mockAuthService.login.and.returnValue(of(null));

    component.login(mockUsername, mockPassword);

    
    expect(component.isValidating).toBeFalse();
    expect(component.error).toBeNull();
    expect(mockAuthService.login).toHaveBeenCalledWith({ username: mockUsername, password: mockPassword });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/viewMovie']);
  });

  it('should handle login error and set error message', () => {
    const mockErrorMessage = 'Invalid credentials';
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';

    mockAuthService.login.and.returnValue(throwError(mockErrorMessage));

    component.login(mockUsername, mockPassword);

    expect(component.isValidating).toBeFalse();
    expect(component.wrongpass).toBeTrue();
    expect(component.error).toEqual(mockErrorMessage);
    expect(component.active).toBeTrue();
  });

  // it('should reset form on form submission', () => {
  //   const mockForm: Partial<NgForm> = {
  //     value: {
  //       username: 'testuser',
  //       password: 'testpassword'
  //     },
  //     reset: jasmine.createSpy('reset')
  //   };

  //   component.onSubmit(mockForm as NgForm);

  //   expect(mockForm.reset).toHaveBeenCalled();
  // });

  it('should handle error and clear error message', () => {
    component.handleError();

    expect(component.error).toBeNull();
  });
});


// describe('AuthComponent', () => {
//   let component: AuthComponent;
//   let fixture: ComponentFixture<AuthComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,
//         FormsModule
//         ], 
//       declarations: [ AuthComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AuthComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

  


// });
