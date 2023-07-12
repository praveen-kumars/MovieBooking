import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { movie } from 'src/app/moviebooking/view-movie.model';
import { AdminViewService } from '../adminview.service';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let adminService: jasmine.SpyObj<AdminViewService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const adminServiceSpy = jasmine.createSpyObj('AdminViewService', ['addMovie']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddMovieComponent],
      providers: [
        FormBuilder,
        { provide: AdminViewService, useValue: adminServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminViewService) as jasmine.SpyObj<AdminViewService>;
    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the Movie form group with the expected form controls', () => {
      expect(component.Movie).toBeInstanceOf(FormGroup);
      expect(component.Movie.controls['movieName']).toBeDefined();
      expect(component.Movie.controls['theatres']).toBeInstanceOf(FormArray);
    });

    // it('should set the movieName control as required', () => {
    //   const movieNameControl = component.Movie.get('movieName');
    //   expect(movieNameControl?.validator).toBe(Validators.required);
    // });
  });

  describe('theatres', () => {
    it('should return the theatres FormArray', () => {
      const theatresArray = component.theatres();
      expect(theatresArray).toBeInstanceOf(FormArray);
      expect(component.Movie.get('theatres')).toEqual(theatresArray);
    });
  });

  describe('newTheatres', () => {
    it('should return a new FormGroup for theatres with the expected form controls', () => {
      const newTheatresGroup = component.newTheatres();
      expect(newTheatresGroup).toBeInstanceOf(FormGroup);
      expect(newTheatresGroup.controls['theatreName']).toBeDefined();
      expect(newTheatresGroup.controls['totalTicket']).toBeDefined();
      expect(newTheatresGroup.controls['theatreName'].validator).toBe(Validators.required);
      expect(newTheatresGroup.controls['totalTicket'].validator).toBe(Validators.required);
    });
  });

  describe('addQuantity', () => {
    it('should add a new form group to the theatres FormArray', () => {
      const initialLength = component.theatres().length;
      component.addQuantity();
      expect(component.theatres().length).toBe(initialLength + 1);
    });
  });

  describe('removeQuantity', () => {
    it('should remove the form group at the specified index from the theatres FormArray', () => {
      const theatresArray = component.theatres();
      theatresArray.push(formBuilder.group({
        ['theatreName']: 'Theatre 1',
        ['totalTicket']: 100
      }));
  })});

})


// describe('AddMovieComponent', () => {
//   let component: AddMovieComponent;
//   let fixture: ComponentFixture<AddMovieComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule,
//       ReactiveFormsModule
//       ], 
//       declarations: [ AddMovieComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddMovieComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
