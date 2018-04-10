// import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product';

import { ProductCounterService } from '../product-counter.service';
import { ProductCounter } from '../product-counter';

// import { Location } from '@angular/common';
// import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  //providers: [ProductService, ProductCounterService]
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  title = "Hokben Timer";
  products: Product[] = [];
  product: Product;
  productcounter: ProductCounter;
  tiles = [];
  tiles_main = [];
  // tiles_wasted = [];
  isDashboard = true;
  isGrid = false;
  isProduct = false;
  isWasted = false;
  counterRunning = [];
  product_id: number;

  constructor(
    private productservice: ProductService,
    private productcounterservice: ProductCounterService
  ) {
    for (let i = 1; i < 61; i++) {
      this.tiles_main.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
    }
  }

  /* START - Function for Countdown */

  onFinished(product: Product): void {
    product.stopCounter();
    // console.log('Someone called me');
    // this.product.isTimerRunning = false;
    //this.product.isWarning = true;
    //product.isTimerRunning = false;
    //product.isWarning = true;
    //this.saveProduct(this.product);
    this.product = product;
    this.saveProduct(product);
  }

  onRestart(product: Product): void {
    // let productcounter: ProductCounter;
    // this.productcounter = productcounter;
    this.resetProduct(product);
  }

  onEvent(event, product: Product) {
    switch (event.action) {
      case 'stop' || 'finished':
        this.onFinished(product);
        break;
      case 'restart':
        this.onRestart(product);
        break;
      default:
        product.left_time = event.left / 1000;
        if (!product.isWarning) {
          product.checkIsWarning();
        }
        this.product = product;
        // This will update every seconds
        this.saveProduct(product);
        //let leftSeconds = event.left / 1000;
        //if (leftSeconds < (product.limit * 60)) {
        //  product.isWarning = true;
        //}
      /*
      if (product.isTimerRunning) {
        this.product = product;
        this.product.left_time -= 1;
      }
      */
    }
  }

  saveProductCounter(product: Product): void {
    //let productku: ProductCounter;

    //this.productcounter.id = 0;
    //this.productcounter.uuid = '';
    this.productcounter.product = product;
    // this.productcounter.product_id = product.id;
    this.productcounter.displayed_item = product.displayed_item;
    this.productcounter.wasted_item = product.wasted_item;
    this.productcounter.start_time = product.start_time;
    this.productcounter.end_time = product.end_time;
    this.addProductCounter(this.productcounter);    
  }

  removeCounterRunning(product_id: number): void {
    this.counterRunning = this.counterRunning.filter(item => item != product_id);
  }

  resetProduct(product: Product): void {
    this.removeCounterRunning(product.id);
    product.resetProduct();
    this.product = product;
    this.saveProduct(product);
  }

  recalculateCountdown(): void {
    this.counterRunning;
    let product: Product;

    for (let i = 0; i < this.counterRunning.length; i++) {
      let productID = this.counterRunning[i] - 1;
      product = this.products[productID];
      product.calculateLeftTime();
      this.saveProduct(product);
    }
  }

  /* START - The Grid related function */
  showTheGrid(product: Product, wasted: boolean = false): void {
    let tiles_temp = [];

    this.isGrid = true;
    this.isDashboard = false;
    if (wasted) {
      for (let i = 0; i <= product.displayed_item; i++) {
        tiles_temp.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
      }
      this.tiles = tiles_temp;
      this.isWasted = true;

    } else {
      if (product.wasted_item == 0) {
        this.tiles = this.tiles_main;
      } else {
        for (let i = product.wasted_item; i < 61; i++) {
          tiles_temp.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
          this.tiles = tiles_temp;
        }
      }
      this.isWasted = false;
    }
    this.product = product;
    // console.log("left_time: ", this.product.left_time);
  }

  gridClick(product: Product, id: string, text: number, wasted: boolean = false): void {
    this.isGrid = false;
    this.isDashboard = true;

    if (!product.isClicked) {
      // product.isClicked = true;
      // product.isTimerRunning = true;
      product.displayed_item = text;
      product.startCounter();
      // product.calculateStartEndTime();
      //  this.product = product;
      this.counterRunning.push(this.product.id);
    } else {
      if (wasted) {
        product.wasted_item = text;
      } else {
        product.displayed_item = text;
      }
    }
    this.product = product;
    this.recalculateCountdown();
  }

  /* END - The Grid related function */

  /* START - Detail Product related function */
  showProductDetail(product): void {
    this.product = product;
    this.product_id = product.id;
    this.isDashboard = false;
    this.isProduct = true;
  }

  showProductGoBack(): void {
    this.isDashboard = true;
    this.isProduct = false;
    this.recalculateCountdown();
  }
  /* END - Detail Product related function */

  /* START - ProductCounterService */
  addProductCounter(productcounter: ProductCounter) {
    this.productcounterservice.addProductCounter(productcounter).subscribe((productcounter) => {
      this.productcounter = productcounter;
    });
  }
  /* END - ProductCounterService */

  /* START - ProductService related functions*/
  getProductById(product_id: number) {
    this.productservice.getProductById(product_id).subscribe((product) => {
      this.product = product;
    });
  }

  saveProduct(product: Product) {
    // this.productservice.updateProduct(product).subscribe();
    this.productservice.updateProduct(product).subscribe((product) => {
      this.product = product;
    });
  }
  /* End - ProductService related functions*/

  getAllProducts() {
    this.productservice.getAllProducts().subscribe((products) => {
        this.products = products;
      });
  }

  getAllProductsReset() {
    this.productservice.getAllProducts().subscribe((products) => {
      // This is to reset databases when refresh
      products.forEach(product => { this.resetProduct(product) });
      this.products = products;    
    });
  }

  /* On Start Component */
  public ngOnInit() {
    this.getAllProducts();
  }
}


  // We dont need this function!
  /*
  productCounter(product: Product): void {
    // product.start_time_text = new Date();
    this.counterRunning.push(product.id);
    product.calculateStartEndTime();
    // product.calculateLeftTime();
    // product.start_time = new Date().getTime();
    // product.end_time = new Date(product.start_time + product.duration * 60 * 1000).getTime();
    // let now = new Date().getTime();
    // product.left_time = Math.floor((product.end_time - now) / 1000);
    this.recalculateCountdown();
    // this.saveProduct(product); 
  }

  */

  /*

  function countdown(seconds) {
  seconds = parseInt(sessionStorage.getItem("seconds"))||seconds;

  function tick() {
    seconds--; 
    sessionStorage.setItem("seconds", seconds)
    var counter = document.getElementById("timer");
    var current_minutes = parseInt(seconds/60);
    var current_seconds = seconds % 60;
    counter.innerHTML = current_minutes + ":" + (current_seconds < 10 ? "0" : "") + current_seconds;
    if( seconds > 0 ) {
      setTimeout(tick, 1000);
    } 
  }
  tick();
}

countdown(120);


    <div id="timer">2:00</div>
  */
