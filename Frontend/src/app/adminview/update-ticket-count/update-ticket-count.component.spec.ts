import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdminViewService } from '../adminview.service';
import { ViewMoviesService } from 'src/app/moviebooking/view-movies.service';
import { UpdateTicketCountComponent } from './update-ticket-count.component';
import { movie, theatres } from 'src/app/moviebooking/view-movie.model';

describe('UpdateTicketCountComponent', () => {
  let component: UpdateTicketCountComponent;
  let fixture: ComponentFixture<UpdateTicketCountComponent>;
  let mockViewMoviesService: jasmine.SpyObj<ViewMoviesService>;
  let mockAdminViewService: jasmine.SpyObj<AdminViewService>;

  beforeEach(() => {
    mockViewMoviesService = jasmine.createSpyObj('ViewMoviesService', ['getAllMovies']);
    mockAdminViewService = jasmine.createSpyObj('AdminViewService', ['getTotalTickets', 'getTotalTicketsByTheatre', 'setStatus']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UpdateTicketCountComponent],
      providers: [
        { provide: ViewMoviesService, useValue: mockViewMoviesService },
        { provide: AdminViewService, useValue: mockAdminViewService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTicketCountComponent);
    component = fixture.componentInstance;
  });

  it('should retrieve total ticket count', () => {
    const selectedOption = 'movie1';
    const totalTicketCount = 100;

    mockAdminViewService.getTotalTickets.and.returnValue(of(totalTicketCount));

    component.selectedOption = selectedOption;
    component.retrieveTotal();

    expect(component.totalTicket).toEqual(totalTicketCount);
    expect(mockAdminViewService.getTotalTickets).toHaveBeenCalledWith(selectedOption);
  });

  it('should retrieve total ticket count by theatre', () => {
    const movieOption: movie = {
      movieName: 'movie1',
      theatres: [
        { theatreName: 'theatre1', seatNumber: [], totalTicket: 50,ticketStatus:"" },
        { theatreName: 'theatre2', seatNumber: [], totalTicket: 30,ticketStatus:"" }
      ]
    };
    const theatreOption = 'theatre1';
    const totalTicketCountByTheatre = 50;

    mockAdminViewService.getTotalTicketsByTheatre.and.returnValue(of(totalTicketCountByTheatre));

    component.movieOption = movieOption;
    component.theatreOption = theatreOption;
    component.retrieveByTheatre();

    expect(component.totalTicketPerTheatre).toEqual(totalTicketCountByTheatre);
    expect(mockAdminViewService.getTotalTicketsByTheatre).toHaveBeenCalledWith(
      movieOption.movieName,
      theatreOption
    );
  });

  it('should set ticket status', () => {
    const movieOption: movie = {
      movieName: 'movie1',
      theatres: [
        { theatreName: 'theatre1', seatNumber: [], totalTicket: 50, ticketStatus: 'AVAILABLE' },
        { theatreName: 'theatre2', seatNumber: [], totalTicket: 30, ticketStatus: 'SOLD OUT' }
      ]
    };
    const theatreOption = 'theatre1';
    const ticketStatus = 'SOLD OUT';

    mockAdminViewService.setStatus.and.returnValue(of(null));

    component.movieOption = movieOption;
    component.theatreOption = theatreOption;
    component.ticketStatus = ticketStatus;
    component.setStatus();

    expect(mockAdminViewService.setStatus).toHaveBeenCalledWith(movieOption.movieName, theatreOption, ticketStatus);
  });

  // Other test cases...

});




// describe('UpdateTicketCountComponent', () => {
//   let component: UpdateTicketCountComponent;
//   let fixture: ComponentFixture<UpdateTicketCountComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,
//       FormsModule
//       ], 
//       declarations: [ UpdateTicketCountComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UpdateTicketCountComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
