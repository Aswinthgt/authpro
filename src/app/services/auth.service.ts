import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse, IRegister, IregisterResponse } from '../interface/auth';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  login(data:ILogin) {
    return this.http.post<ILoginResponse>(`${environment.auth}/login`,data)
  }

  register(data:IRegister) {
    return this.http.post<IregisterResponse>(`${environment.auth}/register`,data)
  }

  isLoggedIn(){
    const token = localStorage.getItem("token");
    if(!token){
      return false;
    }else{
      return true;
    }
  }
}
