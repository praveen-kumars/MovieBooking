import { Component, OnInit } from '@angular/core';
import { ViewMoviesService } from '../view-movies.service';
import { bookedTicket } from '../book-ticket/bookedTicket.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private movieService:ViewMoviesService,private authService:AuthService) { }

  ticket:bookedTicket[];
  userName:string;
  userSubscription:Subscription;


  ngOnInit(): void {
    this.userSubscription=this.authService.user.subscribe((user)=>{
      this.userName=user.username;
    })
    this.movieService.getAllTickets(this.userName).subscribe((res)=>{
      this.ticket=res;
      
    })
  }



  

}
