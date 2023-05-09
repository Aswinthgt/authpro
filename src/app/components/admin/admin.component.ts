import { Component, Input } from '@angular/core';
import { IDetailsSub } from 'src/app/interface/profile';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 
  @Input() data:IDetailsSub | any =[];

}
