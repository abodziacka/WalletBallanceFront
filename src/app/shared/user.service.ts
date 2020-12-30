import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bill } from '../bill';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI='http://localhost:55284';

  Bills: Array<Bill> = [];

  formModel = this.fb.group({
    UserName :['', Validators.required],
    Email :['', Validators.email],
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword :['',Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    // //passwordMismatch
    // //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl?.errors==  null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value){
        confirmPswrdCtrl?.setErrors({passwordMismatch: true});
      }
      else{
        confirmPswrdCtrl?.setErrors(null);
      }

    }
  }


  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };  
    console.log(body);
    return this.http.post(this.BaseURI + '/user/registration', body);
  }


  login(formData: any) {
    return this.http.post(this.BaseURI + '/user/login', formData);
  }

  getUserProfile() {
    const tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer' + localStorage.getItem('token') });
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  getBills(): Observable<any>{
   // this.Bills.push(this.http.get(this.BaseURI + '/functions/get-bills'));
    return this.http.get(this.BaseURI + '/functions/get-bills');
  }

  addBill(bill: Bill) {
    return this.http.post(this.BaseURI + '/functions/add-bill', bill);
    //return this.http.post<any>(`${environment.apiUrl}`+ '/api/trees',json,{headers: new HttpHeaders({ 
    //    'Content-Type':'application/json'}),responseType: 'json'});
     }

}
