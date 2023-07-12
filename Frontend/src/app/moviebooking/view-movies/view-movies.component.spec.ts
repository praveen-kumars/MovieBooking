import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMoviesComponent } from './view-movies.component';
import { ViewMoviesService } from '../view-movies.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { movie } from '../view-movie.model';
import { Router } from '@angular/router';

describe('ViewMoviesComponent', () => {
  let component: ViewMoviesComponent;
  let fixture: ComponentFixture<ViewMoviesComponent>;
  let mockMovieService: jasmine.SpyObj<ViewMoviesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create mock instance
    mockMovieService = jasmine.createSpyObj('ViewMoviesService', ['getAllMovies', 'getMovieByName', 'sendData']);

    
  mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ViewMoviesComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ViewMoviesService, useValue: mockMovieService },{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should retrieve movies data on ngOnInit', () => {
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

    // Set the mock movies as the return value for the getAllMovies() spy
    mockMovieService.getAllMovies.and.returnValue(of(mockMovies));

    fixture.detectChanges();

    expect(component.movies).toEqual(mockMovies);
  });

  it('should navigate and send movie data on sendMovieName', () => {
    const mockMovie: movie =  {
      movieName:"movie1",
      theatres:[{
        theatreName:"theatre1",
        totalTicket:100,
        ticketStatus:"SOLD-OUT",
        seatNumber:[]
    }]};

    // Set the mock movie as the return value for the getMovieByName() spy
    mockMovieService.getMovieByName.and.returnValue(of(mockMovie));

    component.sendMovieName('Movie Name');

    expect(mockMovieService.sendData).toHaveBeenCalledWith(mockMovie);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/viewTheatre']);
  });
  });





// describe('ViewMoviesComponent', () => {
//   let component: ViewMoviesComponent;
//   let fixture: ComponentFixture<ViewMoviesComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule], 
//       declarations: [ ViewMoviesComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ViewMoviesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
