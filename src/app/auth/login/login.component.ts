import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next:(data) => {
          console.log(data)
          localStorage.setItem("token", JSON.stringify(data.token));
          this.router.navigate(['/profile']);
        },
        error:(error:any) => {
          if(error instanceof HttpErrorResponse){
            this.snackBar.open(error.message, 'Close', { duration: 3000 });
          }
          
        }
      });
  }


}
