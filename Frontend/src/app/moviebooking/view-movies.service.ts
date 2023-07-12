import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { movie } from "./view-movie.model";
import { Ticket } from "./book-ticket/ticket.model";
import { bookedTicket } from "./book-ticket/bookedTicket.model";

@Injectable({
    providedIn: 'root'
  })
  export class ViewMoviesService {

    movie:movie;
    bookedticket:bookedTicket;

    sendTicket(bookedTicket:bookedTicket){
      this.bookedticket=bookedTicket;
      localStorage.setItem('ticket',JSON.stringify(this.bookedticket));
      console.log(bookedTicket)
    }
    getTicket(){
      return  JSON.parse(localStorage.getItem('ticket'));
      console.log(this.bookedticket)
    }

    sendData(movi:movie){
        this.movie=movi;
        localStorage.setItem('movie',JSON.stringify(this.movie));
    }

    getData(){
      return JSON.parse(localStorage.getItem('movie'));
        
    }

    constructor(private httpClient: HttpClient,private router: Router) { }

    getAllMovies():Observable<movie[]>{
        return this.httpClient.get<movie[]>(`http://localhost:8010/all`)
      .pipe(catchError(this.handleError))
      };

      handleError(errorResponse: HttpErrorResponse){
        return throwError(errorResponse.error.message);
    }


    getMovieByName(moviename:string):Observable<movie>{
        return this.httpClient.get<movie>(`http://localhost:8010/movies/search/${moviename}`)
      .pipe(catchError(this.handleError))
      };


    bookticket(ticket:Ticket,moviename){
        let body=JSON.stringify(ticket);
        return this.httpClient.post<bookedTicket>(`http://localhost:8010/movies/${moviename}/add`,body)
      .pipe(catchError(this.handleError))
      };

      // getMovieByNameandTheatre(moviename:string,theatreName:String){
        
      //   return this.httpClient.get<movie>(`http://localhost:8010/retrieve/${moviename}/${theatreName}`)
      // .pipe(catchError(this.handleError))
      // };
      getAllTickets(userName:String){
        return this.httpClient.get<bookedTicket[]>(`http://localhost:8010/retrieveTickets/${userName}`)
      .pipe(catchError(this.handleError))
      }
     

    
}