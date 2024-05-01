import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {

  }
  constructor(private userService : UserService){}
  getPerson(id : any) {
    this.userService.searchSubject.next(id)
  }
}
