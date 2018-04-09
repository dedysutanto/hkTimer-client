import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
// import { Location } from '@angular/common';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  product: Product;
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
    private productservice: ProductService
  ) {
    for (let i = 1; i < 61; i++) {
      this.tiles_main.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
    }
  }

  /* START - Function for Countdown */

  onFinished(product: Product): void {
    console.log('Someone called me');
    this.product = product;
    this.product.isTimerRunning = false;
    this.product.isWarning = true;
    this.saveProduct(this.product);
  }

  onRestart(product: Product): void {
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
        let leftSeconds = event.left / 1000;
        if (leftSeconds < (product.limit * 60)) {
          product.isWarning = true;
        }
      /*
      if (product.isTimerRunning) {
        this.product = product;
        this.product.left_time -= 1;
      }
      */
    }
  }

  removeCounterRunning(product_id: number): void {
    this.counterRunning = this.counterRunning.filter(item => item != product_id);
  }

  resetProduct(product: Product): void {
    this.removeCounterRunning(product.id);
    product.isClicked = false;
    product.isWarning = false;
    product.isTimerRunning = false;
    product.displayed_item = 0;
    product.wasted_item = 0;
    // this.isWasted = false;
    // product.left_time = 0;
    // this.product = product;
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
    let start_from: number;

    this.isGrid = true;
    this.isDashboard = false;
    if (wasted) {
      for (let i = 0; i <= product.displayed_item; i++) {
        tiles_temp.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
      }
      this.tiles = tiles_temp;
      this.isWasted = true;

    } else {
      if (product.wasted_item == 0 ) {
        start_from = 1;
      } else {
        start_from = product.wasted_item;
      }
      for (let i = start_from; i < 61; i++) {
        tiles_temp.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
      }
      this.isWasted = false;
      this.tiles = tiles_temp;
      // this.tiles = this.tiles_main;
    }
    this.product = product;
    // console.log("left_time: ", this.product.left_time);
  }

  gridClick(product: Product, id: string, text: number, wasted: boolean = false): void {
    this.isGrid = false;
    this.isDashboard = true;

    if (!product.isClicked) {
      product.isClicked = true;
      product.isTimerRunning = true;
      product.displayed_item = text;
      product.calculateStartEndTime();
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

  /* On Start Component */
  public ngOnInit() {
    this.productservice.getAllProducts().subscribe((products) => {
      // This is to reset databases when refresh
      products.forEach(product => { this.resetProduct(product) });
      this.products = products;
    });
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
