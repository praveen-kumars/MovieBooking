import { Component, OnInit } from '@angular/core';
import { movie } from '../view-movie.model';
import { Router } from '@angular/router';
import { ViewMoviesService } from '../view-movies.service';
import {Ticket} from './ticket.model'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { bookedTicket } from './bookedTicket.model';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  seatsCount:number=0;

  movie:movie;
  availableSeats:number[];
  userName:string;
  ticket:Ticket;
  movieName:string;

  rows:number[][]=[];
  selectedSeats:number[]=[];
  userSubscription:Subscription;

  bookedTicket:bookedTicket;

  constructor(private router:Router,private movieService:ViewMoviesService,private authservice:AuthService) { 
   
  }

  ngOnChanges(): void {
    
    this.generateSeating();
  }

  ngOnInit(): void {

    this.movie=this.movieService.getData();
    this.availableSeats=this.movie[0].theatres.seatNumber;
   
    localStorage.removeItem('movie')
    
    this.userSubscription=this.authservice.user.subscribe((user)=>{
      this.userName=user.username;
      console.log(this.userName)
    })
    this.generateSeating();
  }

  generateSeating(){
    const seatPerRow=15;
    const totalSeats=this.movie[0].theatres.seatNumber.length;
    this.rows=[];
    let currentRow:number[]=[];
    for(let row=0;row<totalSeats;row++){
      const seat=this.movie[0].theatres.seatNumber[row];
      currentRow.push(seat);
      if(currentRow.length==seatPerRow||row==totalSeats-1){
        this.rows.push(currentRow);
        currentRow=[];
      }


    }}
  
    // const totalRows =Math.ceil(this.movie[0].theatres.seatNumber.length/15);
    // let seatNumber=1;
    // this.rows=[];
    // for(let row=0;row<totalRows;row++){
    //   const startIndex=row*seatPerRow;
    //   const endIndex=startIndex+seatPerRow;
    //   const rowSeats=this.movie[0].theatres.seatNumber.slice(startIndex,endIndex);
    //   this.rows.push(rowSeats);
    // }

  
  
    // for(let row=0;row<=totalRows;row++){  
    //   const rowSeats=[];
    //   const seatInRow=Math.min(this.movie[0].theatres.totalTicket-(row-1)*15,15);
    //   const seats:number[]=[];
    //   for(let seat =0;seat<=seatInRow;seat++){
    //     if(seatNumber<=this.movie[0].theatres.totalTicket){
    //       rowSeats.push(seatNumber);
    //     }
    //     // seats.push(seatNumber);
    //     seatNumber++;
    //   }
    //   this.rows.push(rowSeats);
    // }}

    toggleSeatSelection(seat:number){
      const seatIndex=this.selectedSeats.indexOf(seat);
      if(seatIndex!==-1){
        this.selectedSeats.splice(seatIndex,1)
        this.seatsCount= this.selectedSeats.length;
      }
      else{
        this.selectedSeats.push(seat);
        this.seatsCount=this.selectedSeats.length;
      }
    }

    isSeatSelected(seat:number):boolean{
      return this.selectedSeats.includes(seat);
    }

    isSeatAvailble(seat:number):boolean{
      return  this.availableSeats.includes(seat);
    }

    bookTicket(){
       if(this.selectedSeats.length>=1){
        this.ticket=new Ticket(this.userName,this.movie[0].movieName,this.movie[0].theatres.theatreName,this.selectedSeats.length,this.selectedSeats);
        this.movieService.bookticket(this.ticket,this.movie[0].movieName).subscribe(res=>{
        this.bookedTicket=res;
        this.movieService.sendTicket(this.bookedTicket);
        this.router.navigate(['./movie/payment'])
        });
      }
    }
  }


