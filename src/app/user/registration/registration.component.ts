import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, public toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    (this.service.register()).subscribe(
      (res: any) => {
        console.log(res);
       
          this.service.formModel.reset();
          this.toastr.success('Brawo!', 'Stworzono nowego użytkownika.');
          this.router.navigateByUrl('/user/login');
        
      },
      err => {
        console.log(err);
      }
    );
  }

}
