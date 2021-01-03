import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bill } from '../bill';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../Category';
import { Budget } from '../budget';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI='http://localhost:55284';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
     }
     addCategory(category: Category) {
      return this.http.post(this.BaseURI + '/functions/add-category', category);
       }

  
  getBill(id:number): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-bill?id=${id}');
  }

  updateBill(bill:Bill):Observable<any>{
     return this.http.put(this.BaseURI+'/functions/update-bill',bill, this.httpOptions);     
  }

  deleteBill(id: number): Observable<any>{
    return this.http.delete(this.BaseURI+'/functions/delete-bill-by-id?billId='+id, this.httpOptions);
  }

  addBudget(budget: Budget) {
    return this.http.post(this.BaseURI + '/functions/add-budget', budget);
  }

  getBudgets(): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-budgets');
  }

  deleteBudget(id: number): Observable<any>{
    return this.http.delete(this.BaseURI+'/functions/delete-budget-by-id?budgetId='+id, this.httpOptions);
  }

  getStatistics(): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-budgetStatistics');
  }

  getDiagramDetails(id: string): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-diagramDetails?budgetId='+id);
  }

  getDiagramCatDetails(id: string, categoryId: string): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-diagramDetails-categorydetails?budgetId='+id+'&categoryId='+categoryId);
  }

  getCountBudgetInPeriod(dateFrom: string, dateTo: string): Observable<any>{
    return this.http.get(this.BaseURI + '/functions/get-count-budget-in-period?dateFrom='+dateFrom+'&dateTo='+dateTo);
  }

}
