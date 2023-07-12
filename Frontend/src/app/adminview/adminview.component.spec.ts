import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminViewService } from './adminview.service';
import { movie } from '../moviebooking/view-movie.model';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';

describe('AdminViewService', () => {
  let service: AdminViewService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminViewService]
    });
    service = TestBed.inject(AdminViewService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a movie', () => {
    const mockMovie:movie = {

      "movieName":"movie1",
      "theatres":[]
    
    };

    service.addMovie(mockMovie).subscribe((movie) => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpTestingController.expectOne('http://localhost:8010/movies/add');
    expect(req.request.method).toEqual('POST');
    // expect(req.request.body).toEqual(mockMovie);
    req.flush(mockMovie);
  });

  it('should retrieve total tickets for a movie', () => {
    const mockMovieName = 'Mock Movie';
    const mockTicketCount = 10;

    service.getTotalTickets(mockMovieName).subscribe((ticketCount) => {
      expect(ticketCount).toEqual(mockTicketCount);
    });

    const req = httpTestingController.expectOne(`http://localhost:8010/fetchNoOfTicketsBookedForAMove/${mockMovieName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTicketCount);
  });

  // Add more test cases for other methods

});






// describe('AdminviewComponent', () => {
//   let component: AdminviewComponent;
//   let fixture: ComponentFixture<AdminviewComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule,
//       ],
//       declarations: [ AdminviewComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AdminviewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
