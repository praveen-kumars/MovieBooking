import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PaymentComponent } from './payment.component';
import { ViewMoviesService } from '../view-movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { bookedTicket } from '../book-ticket/bookedTicket.model';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let mockViewMoviesService: jasmine.SpyObj<ViewMoviesService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockViewMoviesService = jasmine.createSpyObj('ViewMoviesService', ['getTicket']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      providers: [
        { provide: ViewMoviesService, useValue: mockViewMoviesService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
  });

  it('should retrieve the ticket on initialization', () => {
    const ticket: bookedTicket = { id: 1,userName:"praveen", movieName: 'movie1', theatreName: 'theatre1', seatNumber:[], ticketCount: 10 };

    mockViewMoviesService.getTicket.and.returnValue(ticket);

    fixture.detectChanges();

    expect(mockViewMoviesService.getTicket).toHaveBeenCalled();
    expect(component.ticket).toEqual(ticket);
  });

  it('should navigate to the viewMovie route when goback is called', () => {
    component.goback();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['./viewMovie']);
  });

  it('should navigate to the movie/ticket route when viewOrders is called', () => {
    component.viewOrders();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/ticket']);
  });

  // Other test cases...

});


// describe('PaymentComponent', () => {
//   let component: PaymentComponent;
//   let fixture: ComponentFixture<PaymentComponent>;
//   let mockMovieService: jasmine.SpyObj<ViewMoviesService>;
//   let mockAuthService: jasmine.SpyObj<AuthService>;
//   let mockRouter: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     // Create mock instances
//     mockMovieService = jasmine.createSpyObj('ViewMoviesService', ['getTicket']);
//     mockAuthService = jasmine.createSpyObj('AuthService', []);
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       declarations: [PaymentComponent],
//       providers: [
//         { provide: ViewMoviesService, useValue: mockMovieService },
//         { provide: AuthService, useValue: mockAuthService },
//         { provide: Router, useValue: mockRouter }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PaymentComponent);
//     component = fixture.componentInstance;
//   });

//   it('should retrieve ticket data on ngOnInit', () => {
//     const mockTicket: bookedTicket = {
//        id:1,
//        userName:"praveen",
//        movieName:"movie 1",
//        theatreName:"theatre1",
//        ticketCount:5,
//        seatNumber:[]

//       // Define the properties of the mock ticket
//       // ...
//     };

//     // Set the mock ticket as the return value for the getTicket() spy
//     mockMovieService.getTicket.and.returnValue(mockTicket);

//     fixture.detectChanges();

//     expect(component.ticket).toEqual(mockTicket);
//   });

//   it('should navigate to viewMovie on goback', () => {
//     component.goback();

//     expect(mockRouter.navigate).toHaveBeenCalledWith(['./viewMovie']);
//   });

//   it('should navigate to movie/ticket on viewOrders', () => {
//     component.viewOrders();

//     expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/ticket']);
//   });
// });




// describe('PaymentComponent', () => {
//   let component: PaymentComponent;
//   let fixture: ComponentFixture<PaymentComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
      
//       imports: [HttpClientTestingModule], 
//       declarations: [ PaymentComponent ],
//       providers:[ViewMoviesService],
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PaymentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
