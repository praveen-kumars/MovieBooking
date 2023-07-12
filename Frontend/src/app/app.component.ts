import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  error:string |null=null;
  
  constructor(private authservice: AuthService){}

  ngOnInit() {
    this.authservice.timeout.subscribe((isTimeOut)=>{
      if(isTimeOut){
        this.error='Your session is expired. Please Login again';
      }
    });
    this.authservice.autoLogin();
    
  }
  handleError(){
    this.error=null;
  }
}
