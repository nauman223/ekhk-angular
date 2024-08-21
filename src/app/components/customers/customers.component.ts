import { Component, OnInit } from '@angular/core';
import { Customer, Transection } from '../models/customer';
import { ApiService } from '../services/api.service';
import { CustomerData } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  visible: boolean = false;
  customer: Customer = new Customer();
  customers: Customer[];
  transection: Transection = new Transection();
  searchStr: string;
  user_id: any;
  constructor(
    private api: ApiService
  ) {
    this.customer = {
      name: "",
      phone: "",
      image: "",
      description: "",
      gender: "male",
      is_customer: true,
      balance: "",
      get_or_gave: 'get'
    }
  }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('user')).id;
    this.getCustomers()
  }


  addCustomer = async () => {
    await this.api.post("/customer/add", this.customer).subscribe({
      next: async res => {
        console.log('res :>> ', res);
        this.visible = false;
        await this.addTransection(res.id)
      },
    });
  }

  addTransection = async (id) => {
    this.transection = {
      note: "Initial balance",
      price: this.customer.balance,
      image: "",
      date: new Date(),
      bid: "",
      uid: this.user_id,
      cid: id,
      is_get: this.customer.get_or_gave === "get" ? true : false,
    }
    console.log('transection :>> ', this.transection);
    await this.api.post('/transection/add', this.transection).subscribe({
      next: res => {
        console.log('res :>> ', res);
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
}
