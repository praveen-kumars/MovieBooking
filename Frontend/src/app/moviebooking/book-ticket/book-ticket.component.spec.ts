import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookTicketComponent } from './book-ticket.component';
import { ViewMoviesService } from '../view-movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, of } from 'rxjs';
import { Ticket } from './ticket.model';
import { bookedTicket } from './bookedTicket.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('BookTicketComponent', () => {
  let component: BookTicketComponent;
  let fixture: ComponentFixture<BookTicketComponent>;
  let mockMovieService: jasmine.SpyObj<ViewMoviesService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('ViewMoviesService', ['getData', 'bookticket', 'sendTicket']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['get user']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [BookTicketComponent],
      providers: [
        { provide: ViewMoviesService, useValue: mockMovieService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookTicketComponent);
    component = fixture.componentInstance;

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('should retrieve movie data and set availableSeats', () => {
  //     const mockMovieData = {
  //       movie: {
  //         movieName: 'Test Movie',
  //         theatres: [
  //           {
  //             theatreName: 'Test Theatre',
  //             seatNumber: [1, 2, 3, 4, 5],
  //             totalTicket: 5,
  //             ticketStatus:""
          
  //           }
  //         ]
  //       }
  //     };
  //     // mockMovieService.getData.and.returnValue(mockMovieData.movie);
  //     mockMovieService.getData.and.returnValue(mockMovieData.movie);
  //     component.ngOnInit();
  //     expect(component.availableSeats).toEqual(mockMovieData.movie.theatres[0].seatNumber);
  //     expect(component.userName).toEqual('Test User');
      
  //   });
  // });

  describe('toggleSeatSelection', () => {
    it('should add seat to selectedSeats if it is not already selected', () => {
      component.selectedSeats = [1, 2, 3];

      component.toggleSeatSelection(4);

      expect(component.selectedSeats).toEqual([1, 2, 3, 4]);
    });

    it('should remove seat from selectedSeats if it is already selected', () => {
      component.selectedSeats = [1, 2, 3, 4];

      component.toggleSeatSelection(4);

      expect(component.selectedSeats).toEqual([1, 2, 3]);
    });

    it('should update seatsCount', () => {
      component.selectedSeats = [1, 2, 3];

      component.toggleSeatSelection(4);

      expect(component.seatsCount).toEqual(4);
    });
  });

  describe('isSeatSelected', () => {
    it('should return true if seat is in selectedSeats', () => {
      component.selectedSeats = [1, 2, 3, 4, 5];

      const result = component.isSeatSelected(3);

      expect(result).toBeTrue();
    });

    it('should return false if seat is not in selectedSeats', () => {
      component.selectedSeats = [1, 2, 4, 5];
    });
  
});

});



// describe('BookTicketComponent', () => {
//   let component: BookTicketComponent;
//   let fixture: ComponentFixture<BookTicketComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,FormsModule],
//       declarations: [ BookTicketComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(BookTicketComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
