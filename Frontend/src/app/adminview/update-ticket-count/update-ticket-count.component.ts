import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { movie, theatres } from 'src/app/moviebooking/view-movie.model';
import { ViewMoviesService } from 'src/app/moviebooking/view-movies.service';
import { AdminViewService } from '../adminview.service';

@Component({
  selector: 'app-update-ticket-count',
  templateUrl: './update-ticket-count.component.html',
  styleUrls: ['./update-ticket-count.component.css']
})
export class UpdateTicketCountComponent implements OnInit {
  movies:movie[];
  theatreName:theatres[];

  ticketStatus:string;

  
  customValue:string;

  selectedOption:string;
  movieOption:movie;

  theatreOption:string;

  selectedValue:string;

  moviesubscription:Subscription

  totalTicket:number;
  bookedTicket:string;

  totalTicketPerTheatre:number;
  bookedTicketByTheatre:string;

  constructor(private movieService:ViewMoviesService,private adminService:AdminViewService) { }

  ngOnInit(): void {
    this.moviesubscription=this.movieService.getAllMovies().subscribe((res:movie[])=> {this.movies = res;
      
      });
      
  }


 retrieveTotal(){
   this.moviesubscription=this.adminService.getTotalTickets(this.selectedOption).subscribe((res)=> { this.totalTicket= res;
    

     });
 }

 onChange(movie) {
  this.theatreName=movie.theatres
}


 retrieveByTheatre(){
  
  this.moviesubscription=this.adminService.getTotalTicketsByTheatre(this.movieOption.movieName,this.theatreOption).subscribe((res)=> { this.totalTicketPerTheatre= res;
    
    });

 }


 setStatus(){
  this.moviesubscription=this.adminService.setStatus(this.movieOption.movieName,this.theatreOption,this.ticketStatus).subscribe((res)=> {
    console.log("status changed")
    alert("tickets sold out")
   
    });
 }
}