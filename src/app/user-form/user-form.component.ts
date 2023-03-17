import { Component } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  postModel = new Post('primjer', 'primjer');
  addPost(){}
}
