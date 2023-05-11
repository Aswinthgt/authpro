import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  menuEnable: boolean

  constructor(private route: Router) {
    this.route.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.url)
          if (event.url == '/login' || event.url == "/signup" || event.url == '/') {
            this.menuEnable = true;
          } else {
            this.menuEnable = false;
          }
        }
      }
    });
  }

  ngOnInit() { }


  login() {
    this.route.navigate(["login"]);
  }

  signUp() {
    this.route.navigate(["signup"]);
  }

  logout() {
    localStorage.clear();
    this.route.navigate([""]);
  }
}
