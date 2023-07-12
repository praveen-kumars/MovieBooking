import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdminViewService } from '../adminview.service';
import { ViewMoviesService } from 'src/app/moviebooking/view-movies.service';
import { DeleteMovieComponent } from './delete-movie.component';
import { movie, theatres } from 'src/app/moviebooking/view-movie.model';

describe('DeleteMovieComponent', () => {
  let component: DeleteMovieComponent;
  let fixture: ComponentFixture<DeleteMovieComponent>;
  let mockViewMoviesService: jasmine.SpyObj<ViewMoviesService>;
  let mockAdminViewService: jasmine.SpyObj<AdminViewService>;

  beforeEach(() => {
    mockViewMoviesService = jasmine.createSpyObj('ViewMoviesService', ['getAllMovies']);
    mockAdminViewService = jasmine.createSpyObj('AdminViewService', ['deleteMovies', 'deleteByTheatres']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DeleteMovieComponent],
      providers: [
        { provide: ViewMoviesService, useValue: mockViewMoviesService },
        { provide: AdminViewService, useValue: mockAdminViewService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMovieComponent);
    component = fixture.componentInstance;
  });

  it('should delete a movie', () => {
    const selectedOption = 'movie1';

    mockAdminViewService.deleteMovies.and.returnValue(of(null));

    component.selectedOption = selectedOption;
    component.deleteMovie();

    expect(mockAdminViewService.deleteMovies).toHaveBeenCalledWith(selectedOption);
  });

  it('should delete a movie by theatre', () => {
    const movieOption: movie = {
      movieName: 'movie1',
      theatres: [
        { theatreName: 'theatre1', seatNumber: [], totalTicket: 50, ticketStatus: 'AVAILABLE' },
        { theatreName: 'theatre2', seatNumber: [], totalTicket: 30, ticketStatus: 'SOLD OUT' }
      ]
    };
    const theatreOption = 'theatre1';

    mockAdminViewService.deleteByTheatres.and.returnValue(of(null));

    component.movieOption = movieOption;
    component.theatreOption = theatreOption;
    component.deleteByTheatre();

    expect(mockAdminViewService.deleteByTheatres).toHaveBeenCalledWith(movieOption.movieName, theatreOption);
  });

  // Other test cases...

});





// describe('DeleteMovieComponent', () => {
//   let component: DeleteMovieComponent;
//   let fixture: ComponentFixture<DeleteMovieComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,
//         FormsModule
//         ], 
//       declarations: [ DeleteMovieComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DeleteMovieComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
