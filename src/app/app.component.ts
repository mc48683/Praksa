import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Users';
  usersData: any;
  postsData: any;
  userModel = new User(1,'Ime', 'ime@gmail.com');
  constructor(private usersService: UsersService){};
  ngOnInit() { 
    this.usersService.getUsers().subscribe(data => { this.usersData = data;})
    this.usersService.getPosts().subscribe(data => { this.postsData = data;})
  }

  editUser(user: User) {
    this.userModel = user;
    console.log(user.id);
  }

  updateUser() {
    this.usersService.updateUser(this.userModel).subscribe(data => console.log("Success",data)
    )
  }
}