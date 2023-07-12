import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsComponent } from './tickets.component';
import { ViewMoviesService } from '../view-movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { of } from 'rxjs';
import { bookedTicket } from '../book-ticket/bookedTicket.model';


// describe('TicketsComponent', () => {
//   let component: TicketsComponent;
//   let fixture: ComponentFixture<TicketsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule], 
//       declarations: [ TicketsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(TicketsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
