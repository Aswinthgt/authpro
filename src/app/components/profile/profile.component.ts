import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AddHostDirective } from '../../directive/add-host.directive';
import { AdminComponent } from '../admin/admin.component';
import { UserComponent } from '../user/user.component';
import { IDetails, IDetailsSub } from 'src/app/interface/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @ViewChild(AddHostDirective, { static: true }) addHost: AddHostDirective;

  component = [
    {name: "admin",
    component: AdminComponent
    },
    {name: "user",
      component: UserComponent
    }]

  profileImage: FileList;
  imageUrl: string | undefined;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getImage()
    this.details()
  }

  getImage() {
    this.userService.getProfileImage().subscribe({
      next: (image) => {
        this.fileReader(image);
      },
      error: (error) => {
        this.imageUrl = "";
      }
    })
  }

  imageUpload(event: Event) {
    this.profileImage = (event.target as HTMLInputElement).files!
    this.uploadImage()
  }


  uploadImage() {
    const image = new FormData();
    image.append("image", this.profileImage[0]);

    this.userService.imageUpload(image).subscribe({
      next: (data) => {
        this.fileReader(data)
      },
      error: (error) => {
        this.imageUrl = undefined;
      }
    })
  }


  fileReader(data: Blob) {

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(data);

  }


  deleteImage() {
    this.userService.deleteProfileImage().subscribe({
      next: (image) => {
        this.getImage();
      }
    })
  }


  details() {
    this.userService.details().subscribe({
      next: (res) => {
        this.createComponent(res)
      }
    })
  }

  createComponent(res:IDetails<IDetailsSub>) {
    const viewContainerRef = this.addHost.viewContainerRef;
    viewContainerRef.clear();
    const data = this.component.find(x => x.name === res.role)
    if (data) {
      const componentRef = viewContainerRef.createComponent(data.component);
      componentRef.instance.data = res.details;
    }

  }



}
