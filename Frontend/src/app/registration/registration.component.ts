import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authservie:AuthService) { }

  ngOnInit(): void {
  }

  register(form:NgForm){
    this.authservie.registerUser(form.value).subscribe(res=>{
      console.log("user registerd")
    });
    
  }

}
