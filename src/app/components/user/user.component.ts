import { Component, Input } from '@angular/core';
import { IDetails, IDetailsSub } from 'src/app/interface/profile';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() data: IDetailsSub | any=[];

}
