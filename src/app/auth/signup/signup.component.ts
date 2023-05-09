import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

firstsignUp: FormGroup;
secondsignUp: FormGroup;
  constructor(fb: FormBuilder,private authService: AuthService) {

    this.firstsignUp = fb.group({
      firstname: ["",Validators.required],
      lastname: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      phone: ["",Validators.required],
      password: ["",Validators.required],
      cpassword: ["",Validators.required],
    })

    this.secondsignUp = fb.group({
      otp: ["",Validators.required],
    })
   }

  ngOnInit() {}


register(){
  console.log(this.firstsignUp.value);

  this.authService.register(this.firstsignUp.value).subscribe({
    next: (data)=>{
      console.log(data);
    },
    error: (error)=>{
      console.log(error);
    }
  })
}


}
