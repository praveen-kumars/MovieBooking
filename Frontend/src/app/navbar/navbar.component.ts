import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userSubscription:Subscription

  userName:string;
  authenticated:boolean=false;
  admin:boolean=false;


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSubscription=this.authService.user.subscribe((user)=>{
      this.userName=user.username;
      if(user.roles.at(0)==="ROLE_ADMIN"){
        this.admin=true
      }
      else{
        this.admin=false;
      }
      
      
      if(this.userName!=null){
        this.authenticated=true;
      }
      else{
        this.authenticated=false;
      }
    })
  }

  onLogout(){
    this.userName=''
    this.authenticated=false;
    this.admin=false;
    this.authService.logout();
    

  }

}
