import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private http: Http, public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.http.get('/assets/data.json').map(response => response.json())._subscribe(data => console.log(data));
  }

}
