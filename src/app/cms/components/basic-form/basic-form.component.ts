import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit{

  form = new FormGroup({
    name : new FormControl(''),
    email : new FormControl('')
  })

  nameField = new FormControl('hola')
  emailField = new FormControl()
  colorField = new FormControl()
  dateField = new FormControl()
  numberField = new FormControl()

  constructor(){

  }

  ngOnInit(){
    this.nameField.valueChanges.subscribe(
      value => {
        console.log(value)
      }
    )
    this.getValueNameField()
  }

  getValueNameField(){
    console.log(this.nameField.value)
  }
}
