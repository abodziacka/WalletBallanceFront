import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, public toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    (this.service.register()).subscribe(
      (res: any) => {
        console.log(res);
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration succesful');

          
        }
        else {
          res.errors.forEach((element: { code: any; description: string | undefined; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken.', 'Registration failed.');

                //Username id already taken
                break;
              default:
                this.toastr.error(element.description, 'Registration failed.');

                //Registration failed
                break;

            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
