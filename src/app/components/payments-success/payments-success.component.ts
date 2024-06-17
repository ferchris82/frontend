import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { OrderState } from '../../common/order-state';

@Component({
  selector: 'app-payments-success',
  templateUrl: './payments-success.component.html',
  styleUrl: './payments-success.component.css'
})
export class PaymentsSuccessComponent implements OnInit{

  constructor(
    private orderService:OrderService,
    private sessionStorage:SessionStorageService
  ){

  }
  ngOnInit(): void {
    console.log(this.sessionStorage.getItem('order'));
    let order = this.sessionStorage.getItem('order');

    let formData = new FormData();

    formData.append('id', order.id);
    formData.append('state', OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
      data => console.log(data)
    );
  }

}
