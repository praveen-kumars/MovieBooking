import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ViewMoviesService } from './view-movies.service';
import { movie } from './view-movie.model';
import { Ticket } from './book-ticket/ticket.model';
import { bookedTicket } from './book-ticket/bookedTicket.model';

describe('ViewMoviesService', () => {
  let service: ViewMoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewMoviesService]
    });
    service = TestBed.inject(ViewMoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send and retrieve ticket', () => {
    const bookedTicket: bookedTicket = { id: 1,userName:"praveen", movieName: 'movie1', theatreName: 'theatre1', seatNumber:[], ticketCount: 10 };

    service.sendTicket(bookedTicket);

    expect(service.getTicket()).toEqual(bookedTicket);
  });

  it('should send and retrieve movie', () => {
    const movie: movie = {
      movieName:"movie1",
        theatres:[{
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
        },
      {
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
      }
    ]}

    service.sendData(movie);

    expect(service.getData()).toEqual(movie);
  });

  it('should retrieve all movies', () => {
    const mockMovies: movie[] = [{
      movieName:"movie1",
        theatres:[{
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
        },
      {
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
      }
    ]}
   ] ;

    service.getAllMovies().subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:8010/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should retrieve a movie by name', () => {
    const mockMovie: movie ={
      movieName:"movie1",
        theatres:[{
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
        },
      {
          theatreName:"theatre1",
          totalTicket:100,
          ticketStatus:"SOLD-OUT",
          seatNumber:[]
      }
    ]}
    ;
    const movieName = 'movie1';

    service.getMovieByName(movieName).subscribe((movie) => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`http://localhost:8010/movies/search/${movieName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  

  it('should retrieve all tickets by user name', () => {
    const mockTickets: bookedTicket[] = [
      { id: 1,userName:"praveen", movieName: 'movie1', theatreName: 'theatre1', seatNumber:[], ticketCount: 10 },
      { id: 2,userName:"arun", movieName: 'movie2', theatreName: 'theatre2', seatNumber:[], ticketCount: 15 }
    ];
    const userName = 'john123';

    service.getAllTickets(userName).subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`http://localhost:8010/retrieveTickets/${userName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });

  // Other test cases...
});


// describe('MoviebookingComponent', () => {
//   let component: MoviebookingComponent;
//   let fixture: ComponentFixture<MoviebookingComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule,
//         FormsModule,
//       ],
//       declarations: [ MoviebookingComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MoviebookingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
