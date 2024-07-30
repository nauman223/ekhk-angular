import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ApiService } from '../services/api.service';
import { CustomerData } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  visible: boolean = true;
  customer: Customer = new Customer();
  customers: Customer[];
  searchStr: string;
  constructor(
    private api: ApiService
  ) {
    this.customer = {
      name: "",
      phone: "",
      image: "",
      description: "",
      gender: "male",
      is_customer: true
    }
  }

  ngOnInit() {
    this.getCustomers()
  }


  addCustomer = () => {
    this.api.post("/customer/add", this.customer).subscribe({
      next: res => {
        console.log('res :>> ', res);
        this.visible = false;
      },
    });
  }


  getCustomers = () => {
    this.api.get("/customer").subscribe({
      next: res => {
        this.customers = res;
        console.log('this.customers :>> ', this.customers);
        this.visible = false;
      },
    });
  }

  importDummy = () => {
    let cus: Customer[] = CustomerData.json;
    CustomerData.json.forEach(f => {
      this.api.post("/customer/add", f).subscribe({
        next: res => {
          console.log('res :>> ', res);
          this.visible = false;
        },
      });
    })
  }
}
