import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerData } from '../customers/customer';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user_id: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.user_id = JSON.parse(localStorage.getItem('user')).id;
  }


  importDummy = async () => {
    let cus: Customer[] = CustomerData.json;
    CustomerData.json.forEach(f => {
      this.api.post("/customer/add", f).subscribe({
        next: async res => {
          console.log('res :>> ', res);

          let transection = {
            note: "Initial balance",
            price: f.balance,
            image: "",
            date: new Date(),
            bid: "",
            uid: this.user_id,
            cid: res.id,
            is_get: f.get_or_gave === "get" ? true : false,
          }

          await this.api.post('/transection/add', transection).subscribe({
            next: res => {
              console.log('res :>> ', res);
            },
          });

        },
      });
    })
  }

  logout = () => {
    localStorage.clear();
  }
}
