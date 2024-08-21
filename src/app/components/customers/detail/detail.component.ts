import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Customer, Transection } from '../../models/customer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  customer: Customer = new Customer();
  transection: Transection = new Transection();
  transections: Transection[];
  visible: boolean = false;
  user_id: any;
  balance: number = 0;

  constructor(
    public route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('user')).id;
    this.route.params.subscribe((params) => {
      let id = params["id"];
      if (id) {
        this.loadCustomer(id);
      }
    });
  }


  loadCustomer = (id: any) => {
    this.api.post("/customer/customer", { id: id }).subscribe({
      next: res => {
        this.customer = res;
        console.log('this.customers :>> ', this.customer);
        this.transection = {
          note: "",
          price: "",
          image: "",
          date: new Date(),
          bid: "",
          uid: this.user_id,
          cid: this.customer.id,
          is_get: false,
        }
        this.balance = parseFloat(this.customer.balance) * (this.customer.get_or_gave === "gave" ? -1 : 1);
        console.log('transection :>> ', this.transection);
        this.loadTransection();
      },
    });
  }


  loadTransection = () => {
    this.api.post("/transection", {
      uid: this.user_id,
      cid: this.customer.id,
    }).subscribe({
      next: res => {
        console.log('transection :>> ', res);
        this.transections = res;

        this.transections?.length > 0 ? this.transections.forEach((f, i) => {
          if (i === 0) {
            f.balance = f.price;
            this.balance = f.balance * (f.is_get ? 1 : -1);
            return;
          }
          if (f.is_get) {
            f.balance = parseFloat(this.transections[i - 1].balance) - parseFloat(f.price)
          }
          if (!f.is_get) {
            f.balance = parseFloat(this.transections[i - 1].balance) + parseFloat(f.price)
          }

          if (this.transections.length - 1 === i) {
            this.balance = f.balance;
          }

        }) : null;

        this.transections = this.transections.reverse();

        setTimeout(() => {
          this.updateCustomreBalance();
        }, 10);

      },
    });
  }


  addTransection = () => {
    console.log('transection :>> ', this.transection);

    this.api.post('/transection/add', this.transection).subscribe({
      next: res => {
        console.log('res :>> ', res);
        this.visible = false;
        this.route.params.subscribe((params) => {
          let id = params["id"];
          if (id) {
            this.loadTransection(); 
          }
        });
      },
    });

  }


  updateCustomreBalance = () => {

    this.api.post('/customer/update_balance', {
      id: this.customer.id,
      balance: this.balance,
      get_or_gave: this.balance < 0 ? "gave" : "get"
    }).subscribe({
      next: res => { }
    })

  }

}
