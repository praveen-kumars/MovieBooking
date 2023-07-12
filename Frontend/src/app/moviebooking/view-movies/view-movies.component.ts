import { Component, OnInit } from '@angular/core';
import { ViewMoviesService } from '../view-movies.service';
import { Subscription } from 'rxjs';
import { movie } from '../view-movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {

 
  constructor(private movieservice:ViewMoviesService,private router:Router) { }

  
  moviesubscription:Subscription;

  movies:movie [];
  movi:movie;

  ngOnInit(){
    this.moviesubscription=this.movieservice.getAllMovies().subscribe((res:movie[])=> {this.movies = res;
    })
    localStorage.removeItem('movie')
  }

  sendMovieName(movie:string){
    this.movieservice.getMovieByName(movie).subscribe((res:movie)=> {this.movi = res;
      // const queryParams={data:JSON.stringify(this.movi)};
      this.router.navigate(['./movie/viewTheatre']);
      this.movieservice.sendData(this.movi);
  })
  
}
}