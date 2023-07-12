import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.model';

interface AuthResponse{
  id:string,
  username: string,
  email:string,
  roles:[],
  accessToken: string,
  tokenType: number,
  //tokenExpirationTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user=new BehaviorSubject<User |null>(null);
  timeout=new Subject<boolean>();
  private tokenExpirationTime:any;

  constructor(private http: HttpClient,private router:Router) { }

  login(inputFields:{username:string,password: string}){
    return this.http  
        .post<AuthResponse>('http://localhost:8010/api/auth/signin',inputFields)
        .pipe(
          catchError(this.handleError),
          tap((response)=>{
            this.handleAuthentication(
              response['id'],
              response['username'],
              response['email'],
              response['roles'],
              response['accessToken'],
              response['tokenType']
            );
          })
        
        )
  }


  autoLogin(){
    const user=localStorage.getItem('userData');
    console.log(localStorage.getItem('userData'))
    if(!user) return;
    const parsedUser:{
      _username: string,
  email:string,
  _roles:[],
  _accessToken: string,
  tokenType: number,
    }=JSON.parse(user);
    const loadeduser=new User(parsedUser._username,parsedUser.email,
      parsedUser._roles,parsedUser._accessToken,parsedUser.tokenType);

      

    if(loadeduser.accessToken){
      this.user.next(loadeduser);
      const expirationDuration=1800000-new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  logout(){
    this.user.next(null);
    this.router.navigate(['./auth']);
    this.removeUser();
    if(this.tokenExpirationTime){
      clearTimeout(this.tokenExpirationTime);

    }
    this.tokenExpirationTime=null;

  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTime=setTimeout(()=>{
      this.timeout.next(true);
      this.logout();
    },expirationDuration)
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage='Invalid Username or password';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }
    if(errorResponse.error.message){
      if(errorResponse.error.message=="No value present")
         errorMessage='Invalid Username';
      else errorMessage='Invalid username or password';
    }
    return throwError(errorMessage);

  }

  private handleAuthentication(
    id:string,
  username: string,
  email:string,
  roles:[],
  accessToken: string,
  tokenType: number,
  ){
    const user=new User(username,email,roles,accessToken,tokenType);
    this.storeUser(user),
    this.autoLogout(1800000);
    this.user.next(user);
  }
  private storeUser(user:User){
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private removeUser(){
    localStorage.removeItem('userData');
  }

  registerUser(body:any){
    console.log(body)
    return this.http  
        .post('http://localhost:8010/api/auth/signup',body)
        .pipe(
          catchError(this.handleError),)
  }

}
