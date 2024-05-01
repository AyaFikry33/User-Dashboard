import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Observable, Subject } from 'rxjs';
import { IUser, IUserDetails } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public searchSubject = new Subject<String>()
  constructor(private http: HttpClient) { }

  getUsers(pageNum : number) : Observable<IUser>{
    return this.http.get<IUser>(`${environment.usersAPI}?page=${pageNum}`);
  }

  getUserDetails(id: string | null) : Observable<IUserDetails>{
    return this.http.get<IUserDetails>(`${environment.usersAPI}/${id}`);
  }
}
