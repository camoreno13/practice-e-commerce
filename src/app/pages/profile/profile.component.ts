import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : User | null = null

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.login("camilo@gmail.com", "camilo12345").subscribe()
    this.authService.getProfile()
    .subscribe(data => {
      this.user = data
    })
  }

}
