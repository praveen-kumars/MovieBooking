import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MoviebookingComponent } from './moviebooking/moviebooking.component';
import { AdminviewComponent } from './adminview/adminview.component';
import {AuthGuard} from './auth/auth.guard'
import { MoviesComponent } from './moviebooking/movies/movies.component';
import { BookTicketComponent } from './moviebooking/book-ticket/book-ticket.component';
import { ViewMoviesComponent } from './moviebooking/view-movies/view-movies.component';
import { ViewTheatreComponent } from './moviebooking/view-theatre/view-theatre.component';
import { TicketsComponent } from './moviebooking/tickets/tickets.component';
import { PaymentComponent } from './moviebooking/payment/payment.component';
import { UpdateTicketCountComponent } from './adminview/update-ticket-count/update-ticket-count.component';
import { AddMovieComponent } from './adminview/add-movie/add-movie.component';
import { DeleteMovieComponent } from './adminview/delete-movie/delete-movie.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [{path:'',pathMatch:'full',redirectTo:'viewMovie'},
 {path:'viewMovie',canActivate:[AuthGuard],component:ViewMoviesComponent},
{path:'auth',component:AuthComponent},
{path:'registration',component:RegistrationComponent},
{
  path:'movie',
  component:MoviebookingComponent,
  canActivate:[AuthGuard],
  children:[
    {
      path:'BookMovie',
      component:MoviesComponent,
      
    },
    {
      path:'BookTicket',
      component:BookTicketComponent,
     
      
    },
    {
      path:'viewMovie',
      component:ViewMoviesComponent,
      
    },
    {
      path:'viewTheatre',
      component:ViewTheatreComponent,
      
      
    },
    {
      path:'ticket',
      component:TicketsComponent,
    },
    {
      path:'payment',
      component:PaymentComponent,
    },]
  },
  {
    path:'admin',
    component:AdminviewComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'addMovie',
        component:AddMovieComponent,
       
        
      },
      {
        path:'UpdateSeats',
        component:UpdateTicketCountComponent,
       
        
      },{
        path:'DeleteMovie',
        component:DeleteMovieComponent,
       
        
      }
      
      
      ,]
    }
]


// {path:'home',component:ViewMoviesComponent},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
