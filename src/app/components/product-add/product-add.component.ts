import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{
  id : number = 0;
  code : string = '001';
  name : string = '';
  description : string = '';
  price : number = 0;
  urlImage : string = '';
  userId : string = '1';
  categoryId : string = '3';
  //user : number = 0;

  selectFile! : File;

  categories : Category [] = [];

  constructor(private productService : ProductService, 
    private router:Router, 
    private activatedRoute:ActivatedRoute, 
    private toastr: ToastrService, 
    private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductById();
    //this.userId = this.user.toString();
  }
  addProduct(){
    const formData = new FormData();
    formData.append('id',this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description',this.description);
    formData.append('price', this.price.toString());
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);
    formData.append('image', this.selectFile);
    //console.log(formData.get('id'));
    console.log(formData);

    this.productService.createProduct(formData).subscribe(
      data => {
        console.log(data)
        if(this.id==0){
          this.toastr.success('Producto registrado correctamente', 'Productos')
        } else{
          this.toastr.success('Producto actualizado correctamente', 'Productos')
        }
        
        this.router.navigate(['admin/product']);
      }
    );
  }
  getProductById(){
    this.activatedRoute.params.subscribe(
      prod => {
        let id = prod['id'];
        if(id){
          console.log('el valor de la variable id es: '+id);
          this.productService.getProductById(id).subscribe(
            data =>{
              this.id = data.id;
              this.code = data.code;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
              this.userId = data.userId;
              this.categoryId = data.categoryId;
            }
          );
        }

      }

    );
  }

  onFileSelected(event : any){
    this.selectFile = event.target.files[0];
  }

  getCategories(){
    return this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

}