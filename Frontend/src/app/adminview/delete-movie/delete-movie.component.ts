import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { movie, theatres } from 'src/app/moviebooking/view-movie.model';
import { ViewMoviesService } from 'src/app/moviebooking/view-movies.service';
import { AdminViewService } from '../adminview.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {
  movies:movie[];
  theatreName:theatres[];

  ticketStatus:string;

  
  customValue:string;

  selectedOption:string;
  movieOption:movie;

  theatreOption:string;

  selectedValue:string;

  moviesubscription:Subscription;

  totalTicket:number;
  bookedTicket:string;

  totalTicketPerTheatre:number;
  bookedTicketByTheatre:string;

  constructor(private movieService:ViewMoviesService,private adminService:AdminViewService) { }

  ngOnInit(): void {
    this.moviesubscription=this.movieService.getAllMovies().subscribe((res:movie[])=> {this.movies = res;
      console.log(this.movies)
      });
      
  }


  deleteMovie(){
   this.adminService.deleteMovies(this.selectedOption).subscribe((res)=> { 
    console.log("movie deleted")
     });
 }

 onChange(movie) {
  this.theatreName=movie.theatres
}


deleteByTheatre(){
  this.adminService.deleteByTheatres(this.movieOption.movieName,this.theatreOption).subscribe((res)=> { 
    console.log("movie deleted")
     });
     alert("theatre deleted")

 }


}