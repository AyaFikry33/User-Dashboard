import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser, IUserData, IUserDetails } from '../user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  userDetails !: IUserData;
  id !: string | null;
  constructor(private userService: UserService, private route: ActivatedRoute) {}
  getUserDetails(id : string | null) {
    this.userService.getUserDetails(id)
      .subscribe((res: IUserDetails) => {
        this.userDetails = res.data
      })
  }
  ngOnInit() : void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getUserDetails(this.id)
  }
}
