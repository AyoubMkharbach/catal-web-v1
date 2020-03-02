import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct: Product;
  public mode: number=1;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit() {
  }

  onSaveProduct(value: any) {
    this.catService.saveResource(this.catService.host + "/produits", value)
      .subscribe(res=>{
        //this.router.navigateByUrl("/products");
        this.currentProduct = res;
        this.mode=2;
      }, error => {
        console.log(error);
      });
  }

  newProduct() {
    this.mode = 1;
  }
}
