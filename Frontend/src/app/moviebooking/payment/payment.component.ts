import { Component, OnInit } from '@angular/core';
import { bookedTicket } from '../book-ticket/bookedTicket.model';
import { Subscription } from 'rxjs';
import { ViewMoviesService } from '../view-movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private movieService:ViewMoviesService,private authService:AuthService,private router:Router) { }

  ticket:bookedTicket;


  ngOnInit(): void {
    this.ticket=this.movieService.getTicket();
    
  }

  goback(){
    this.router.navigate(['./viewMovie'])

  }
  viewOrders(){
    this.router.navigate(['./movie/ticket'])
  }
}
