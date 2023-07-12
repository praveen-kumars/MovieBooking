import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MoviebookingComponent } from './moviebooking/moviebooking.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './moviebooking/movies/movies.component';
import { BookTicketComponent } from './moviebooking/book-ticket/book-ticket.component';
import { ViewMoviesComponent } from './moviebooking/view-movies/view-movies.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ViewTheatreComponent } from './moviebooking/view-theatre/view-theatre.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TicketsComponent } from './moviebooking/tickets/tickets.component';
import { PaymentComponent } from './moviebooking/payment/payment.component';
import { UpdateTicketCountComponent } from './adminview/update-ticket-count/update-ticket-count.component';
import { AddMovieComponent } from './adminview/add-movie/add-movie.component';
import { DeleteMovieComponent } from './adminview/delete-movie/delete-movie.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MoviebookingComponent,
    AdminviewComponent,
    MoviesComponent,
    BookTicketComponent,
    ViewMoviesComponent,
    ViewTheatreComponent,
    NavbarComponent,
    TicketsComponent,
    PaymentComponent,
    UpdateTicketCountComponent,
    AddMovieComponent,
    DeleteMovieComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
