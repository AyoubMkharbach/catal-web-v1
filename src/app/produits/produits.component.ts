import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits:any;
  public size:number=5;
  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;
  private currentKeyword: string="";

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit() {
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;
      },error => {
        console.log(error);
      });
  }


  onPageProducts(i: number) {
    this.currentPage=i;
    this.chercherProduit();
  }

  onChercher(value: any) {
    this.currentPage=0;
    this.currentKeyword=value.keyword;
    this.chercherProduit();
  }

  chercherProduit() {
    this.catService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits=data;
      },error => {
        console.log(error);
      });
  }

  onDeleteProduct(produit) {
    let conf = confirm("Voulez vous vraiment supprimer le produit");
    if(conf){
      this.catService.deleteResource(produit._links.self.href)
        .subscribe(data=>{
          this.chercherProduit();
        }, error => {
          console.log(error);
        });

    }
  }

  onUpdateProduct(produit) {
    let url = produit._links.self.href;
    this.router.navigateByUrl("/edit-product/" + btoa(url));
  }
}
