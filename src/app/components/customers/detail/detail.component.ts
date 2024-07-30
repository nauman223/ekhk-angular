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
  balance: number = 0;

  constructor(
    public route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params["id"];
      if (id) {
        this.loadCustomer(id);
      }
    });
  }


  loadCustomer = (id: any) => {
    let uid = JSON.parse(localStorage.getItem('user')).id;

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
          uid: uid,
          cid: this.customer.id,
          is_get: false,
        }
        console.log('transection :>> ', this.transection);

        this.api.post("/transection", {
          uid: uid,
          cid: this.customer.id,
        }).subscribe({
          next: res => {
            console.log('transection :>> ', res);
            this.transections = res;

            this.transections?.length > 0 ? this.transections.forEach((f, i) => {
              if (i === 0) {
                f.balance = f.price;
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

          },
        });

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
            this.loadCustomer(id);
          }
        });
      },
    });

  }

}
