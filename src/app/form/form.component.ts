import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  constructor(private usersService: UsersService){};

  userModel = new User(1,'Ime', 'ime@gmail.com');
  onSubmit() {
    this.usersService.addUser(this.userModel).subscribe(
      data => console.log("Success",data)
    )
  }
}

