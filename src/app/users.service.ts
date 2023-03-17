import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient) { }
    getUsers() {
      return this.http.get('http://localhost:3000/api/getUsers');
    }
    getPosts() {
      return this.http.get('http://localhost:3000/api/getPosts');
    }
    addUser(user: User) {
      return this.http.post<any>('http://localhost:3000/api/addUser', user);
    }
    updateUser(user: User) {
      return this.http.post<any>('http://localhost:3000/api/editUser', user);
    }
}
