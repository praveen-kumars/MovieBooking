import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { movie, theatres } from '../view-movie.model';
import { ViewMoviesService } from '../view-movies.service';
import { ViewTheatreComponent } from './view-theatre.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ViewTheatreComponent', () => {
//   let component: ViewTheatreComponent;
//   let fixture: ComponentFixture<ViewTheatreComponent>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockMovieService: jasmine.SpyObj<ViewMoviesService>;

//   beforeEach(() => {
//     // Create mock instances
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//     mockMovieService = jasmine.createSpyObj('ViewMoviesService', ['getData', 'sendData']);

//     TestBed.configureTestingModule({
//       declarations: [ViewTheatreComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: ViewMoviesService, useValue: mockMovieService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ViewTheatreComponent);
//     component = fixture.componentInstance;
//   });

//   it('should retrieve movie data on ngOnInit', () => {
//     const mockMovie: movie = {
//       movieName:"movie1",
//       theatres:[{
//         theatreName:"theatre1",
//         totalTicket:100,
//         ticketStatus:"SOLD-OUT",
//         seatNumber:[]
//     }]}

//     // Set the mock movie as the return value for the getData() spy
//     mockMovieService.getData.and.returnValue(mockMovie);

//     fixture.detectChanges();

//     expect(component.movie).toEqual(mockMovie);
//   });

//   it('should navigate and send data on sendTheatreIndex if tickets are available', () => {
//     const mockTheatreIndex = 0;
//     const mockTheatre:theatres = {
//       theatreName:"theatre1",
//       totalTicket:100,
//       ticketStatus:"SOLD-OUT",
//       seatNumber:[]
//     };
//     const mockMovie: movie = {
//       movieName:"movie1",
//       theatres:[mockTheatre]
//     };

//     component.movie = mockMovie;

//     component.sendTheatreIndex(mockTheatreIndex);
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['./movie/BookTicket']);
//     expect(mockMovieService.sendData).toHaveBeenCalledWith(mockMovie);
//   });

//   it('should set error message if tickets are not available', () => {
//     const mockTheatreIndex = 1;
//     const mockTheatre:theatres = {
//       theatreName:"theatre1",
//       totalTicket:100,
//       ticketStatus:"SOLD-OUT",
//       seatNumber:[]
//     };
//     const mockMovie: movie = {
//       movieName:"movie1",
//       theatres: [mockTheatre]
//     };

//     component.movie = mockMovie;

//     component.sendTheatreIndex(mockTheatreIndex);

//     expect(component.error).toEqual('Tickets Not Available');
//     expect(component.errore).toEqual(true);
//   });
// });






// describe('ViewTheatreComponent', () => {
//   let component: ViewTheatreComponent;
//   let fixture: ComponentFixture<ViewTheatreComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule], 
//       declarations: [ ViewTheatreComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ViewTheatreComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeFalsy();
//   });
// });
