import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';
import { IUserData, IUser } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user !: IUserData;

  constructor(private userService: UserService) {}

  ngOnInit() {}
}
