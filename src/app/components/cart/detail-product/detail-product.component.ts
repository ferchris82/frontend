import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ItemCart } from '../../../common/item-cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit{
  id : number = 0;
  name : string = '';
  description : string = '';
  price : number = 0;
  urlImage : string = '';
  quantity : number = 0;

  ngOnInit(): void {
  }

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,
    private cartService:CartService, private toastr:ToastrService){

  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      p =>{
        let id = p['id'];
        if(id){
          this.productService.getProductById(id).subscribe(
            data =>{
              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
            }
          );
        }
      }
    );
  }

  addCart(id : number){
    console.log('id product: ', id);
    console.log('name product: ', this.name);
    console.log('price product: ', this.price);
    console.log('quantity product: ', this.quantity);

    let item = new ItemCart(id, this.name, this.quantity, this.price);

    this.cartService.addItemCart(item);
    console.log("Total carrito: ")
    console.log(this.cartService.totalCart());

    this.toastr.success('Producto añadido al carrito de compras', 'Carrito compras');
  }

}
