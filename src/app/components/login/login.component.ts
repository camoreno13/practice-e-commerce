import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = ''
  img = ''

  constructor(private authService : AuthService , private userService : UsersService, private fileService : FilesService) { }

  ngOnInit(): void {
  
  }

  createUser(){
    this.userService.createUser({
      name : "camilo",
      email : "camilo@gmail.com",
      password : "camilo12345"
    }).subscribe(rta => {
      console.log(rta)
    })
  }

  login(){
    this.authService.login("camilo@gmail.com", "camilo12345").subscribe(rta => {
      console.log("rta 2  :" , rta)
      this.token = rta.access_token
    })
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      console.log("profile : "  , profile)
    })
  }

  download(){
    console.log("entro")
    this.fileService.getFile('test.pdf' , "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf" , "application/pdf").subscribe()
  }

  onUpload(event : Event){
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)
    if(file){
      this.fileService.uploadFile(file).subscribe(rta => {
        this.img = rta.location
      })
    }
    
  }

}
