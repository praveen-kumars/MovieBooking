import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminViewService } from '../adminview.service';
import { movie } from 'src/app/moviebooking/view-movie.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {


movie:movie;

  Movie: FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminViewService) {

    this.Movie = this.fb.group({
      movieName: ['',Validators.required],
      theatres:this.fb.array([]) ,
    });
  }
  

  ngOnInit(): void {
  }
  
   
 
  
  theatres() : FormArray {
    return this.Movie.get("theatres") as FormArray
  }
   
  newTheatres(): FormGroup {
    return this.fb.group({
      theatreName:[ '',Validators.required],
      totalTicket:['',Validators.required],
    })
  }
   
  addQuantity() {
    this.theatres().push(this.newTheatres());
  }
   
  removeQuantity(i:number) {
    this.theatres().removeAt(i);
  }
   
  onSubmit() {
    this.adminService.addMovie(this.Movie.value).subscribe(res=>{
      console.log(res)
    });
    this.Movie.reset();
    alert("Movie added successfully")
  }
}


