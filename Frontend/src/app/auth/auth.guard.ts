import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService,private router: Router) { }

    canActivate():
    |boolean
    |Promise<boolean | UrlTree>
    |Observable<boolean | UrlTree>{
        return this.authService.user.pipe(
            take(1),
            map((user)=>{
                const isAuthenticated= !!user;

                if(isAuthenticated) return true;

                return this.router.createUrlTree(['/auth']);
            })
        );
    }
    
    
}