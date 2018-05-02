import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {ProductProvider} from '../../providers/product/product'

import {ProductDetailPage} from "../../pages/product-detail/product-detail"
import {FilterModalPage} from "../../pages/filter-modal/filter-modal";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = [];
  private femaleSelected = true;
  private maleSelected = true;

  constructor(private modalController: ModalController, private productProvider: ProductProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    //this.http.get('/assets/data.json').subscribe(res => console.log(res));
    this.productProvider.getProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }

  goToProductDetailPage(product) {
    this.navCtrl.push(ProductDetailPage, {
      productDetails: product
    });
  }

  openFilterModal() {
    let filterStateFromMainPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };
    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromMainPage);
    //onDidDismiss method is called before the filter is presented in order to already be listening for values returned from modal window.
    openFilterModal.onDidDismiss((filterState) => {
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;

      this.productProvider.getProducts().subscribe((allProducts)=>{
        let products = allProducts;
        if(filterState.maleSelected && filterState.femaleSelected){
          this.allProducts = products;
          return;
        } else if(!filterState.maleSelected && !filterState.femaleSelected){
          this.allProducts = [];
        } else if(filterState.femaleSelected && !filterState.maleSelected){
          this.allProducts = products.filter((products)=>{
            return products.gender !== "male";
          })
        } else if(!filterState.femaleSelected && filterState.maleSelected){
          this.allProducts = products.filter((products)=>{
            return products.gender !== "female";
          })
        }
      })
    });
    openFilterModal.present();
  }

}
