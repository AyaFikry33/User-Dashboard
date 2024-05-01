import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IUserData, IUser } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { CachingService } from '../caching/caching.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  @Input() users !: IUserData[];
  page : number = 1;
  length !: number;
  pageSize !: number;
  showLoader: boolean = false

  private cacheSubscription !: Subscription;

  constructor(private cacheService: CachingService, private userService: UserService){}

  ngOnInit() {
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {
      this.users = data;
    });

    this.getUser(this.page)
    this.userService.searchSubject
      .subscribe((id) => {
        if (id != '') {
          this.users = this.users.filter((ele) => {
            if (ele.id == Number(id)) return ele
            else return null
          })
        } else this.getUser(1)
      })
  }
  getUser(pageNum : number) {
    const cachedData = this.cacheService.get(pageNum.toString());
    if (!cachedData) {
      this.userService.getUsers(pageNum)
        .subscribe((res : any) => {
          try {
            this.users = []
            this.showLoader = true

            this.length = res.total
            this.pageSize = res.per_page
            this.page = res.page
            this.users = res.data
            this.cacheService.set(pageNum.toString(), res.data);
          } catch (error) {
            console.error(error);
            // handle the error as you prefer here
          }
        }, (err)=>{
          this.showLoader = false
        }, () => {
          this.showLoader = false
        });
    }
  }
  paginate(event : any) {
    this.getUser(event)
  }
  ngOnDestroy(): void {
    // We unsubscribe from the cache and clear the cache data when the component is destroyed.
    this.cacheSubscription.unsubscribe();
    this.cacheService.clear('1'); // you can adapt this according to your logic to clear the cache

  }
}



