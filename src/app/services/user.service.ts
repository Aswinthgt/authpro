import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IDetails, IDetailsSub } from '../interface/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


imageUpload(image: FormData){
  const headers = new HttpHeaders().set('responseType', 'blob');
  return this.http.post(`${environment.profile}/imageupload`,image,{headers, responseType: "blob"})
}

getProfileImage(){
  return this.http.get(`${environment.profile}/image`,{responseType: "blob"})
}

deleteProfileImage(){
  return this.http.delete(`${environment.profile}/image`)
}

details(){
 return this.http.get<IDetails<IDetailsSub>>(`${environment.profile}/details`)
}

}
