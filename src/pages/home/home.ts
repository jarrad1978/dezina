import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import{ProductProvider} from '../../providers/product/product'

import {ProductDetailPage} from "../../pages/product-detail/product-detail"
import {FilterModalPage} from "../../pages/filter-modal/filter-modal";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = [];
  constructor(private modalController: ModalController, private productProvider: ProductProvider, private http: HttpClient, public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    //this.http.get('/assets/data.json').subscribe(res => console.log(res));
    this.productProvider.getProducts().subscribe((data) => {this.allProducts = data;});
  }

  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailPage,{
      productDetails: product
    });
  }

  openFilterModal(){
    let openFilterModal = this.modalController.create(FilterModalPage);
    openFilterModal.present();
  }

}
