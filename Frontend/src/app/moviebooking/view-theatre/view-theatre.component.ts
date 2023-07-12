import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { movie } from '../view-movie.model';
import { ViewMoviesService } from '../view-movies.service';

@Component({
  selector: 'app-view-theatre',
  templateUrl: './view-theatre.component.html',
  styleUrls: ['./view-theatre.component.css']
})
export class ViewTheatreComponent implements OnInit {

  movie:movie;
  error:string;
  errore=false;
  
  constructor(private router:Router,private movieService:ViewMoviesService) { 

  }

  ngOnInit(): void { 
    this.movie=this.movieService.getData();
  }
  sendTheatreIndex(index:number){
      this.movie[0].theatres=this.movie[0].theatres[index];
      if(this.movie[0].theatres.ticketStatus==="SOLD OUT"){
         this.error="Tickets Not Available";
         this.errore=true;
      }
      else{
          this.router.navigate(['./movie/BookTicket']);
          this.movieService.sendData(this.movie);
    }


  }

}
