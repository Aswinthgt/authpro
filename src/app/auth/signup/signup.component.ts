import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILoginResponse } from 'src/app/interface/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  firstsignUp: FormGroup;
  secondsignUp: FormGroup;
  mobile: string | number;
  enable = false;
  time: string | number;
  resendEnable = false;
  emailDisable = true;
  emailmessage: string;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.firstsignUp = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });

    this.secondsignUp = fb.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit() { }

  register() {
    if (this.firstsignUp.invalid) { return; }
    this.enable = true;
    this.authService.register(this.firstsignUp.value).subscribe({
      next: (data) => {
        this.mobile = data.phoneNumber;
        this.enable = false;
        this.timer();
      },
      error: (error) => {
        this.router.navigate(['/login']);
        this.snackBar.open(error.message, 'Close', { duration: 3000 });
      },
    });
  }

  resendOtp() {
    this.authService.otpRegenerate(this.mobile).subscribe({
      next: (data) => {
        this.mobile = data.phoneNumber;
        this.timer();
      },
    });
  }

  timer() {
    this.resendEnable = true;
    let remainingTime = 3 * 60; 
    const interval = setInterval(() => {
      remainingTime--;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      this.time = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      if (this.time === '0:00') {
        clearInterval(interval);
        this.resendEnable = false;
      }
    }, 1000);
  }

  verification() {
    const data = {
      phoneNumber: this.mobile,
      otp: this.secondsignUp.value.otp,
    };
    this.authService.otpVerification<ILoginResponse>(data).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', JSON.stringify(res.token));
          this.router.navigate(['/profile']);
        }
      },
    });
  }

  emailGenerate() {
    const data = {
      phone: this.mobile,
    };
    this.enable = true;
    this.authService.emailgenerate(data).subscribe({
      next: (res: any) => {
        this.emailmessage = res.message;
        this.emailDisable = false;
        this.enable = false;
      },
      error: () => {
        this.router.navigate(['login']);
      },
    });
  }
}
