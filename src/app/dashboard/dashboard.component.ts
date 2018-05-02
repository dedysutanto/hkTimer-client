// import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product';

import { ProductCounterService } from '../product-counter.service';
import { ProductCounter } from '../product-counter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Hokben Timer';
  products: Product[] = [];
  product: Product;
  productcounter: ProductCounter;
  tiles = [];
  tiles_main = [];
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
    this.product = product;
    this.saveProduct(product);
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
        product.left_time = event.left / 1000;
        if (!product.isWarning) {
          product.checkIsWarning();
        }
        if (product.level == 1) {
          product.checkIsMainMenuWarning();
        }
        this.product = product;
    }
  }

  saveProductCounter(product: Product): void {
    // let productcounter: ProductCounter; // = new ProductCounter();
    // productcounter = new ProductCounter;
    const productcounter: ProductCounter = new ProductCounter();

    productcounter.product = product.id;
    productcounter.displayed_item = product.displayed_item;
    productcounter.wasted_item = product.wasted_item;
    productcounter.start_time = Math.floor(product.start_time / 1000);
    productcounter.end_time = Math.floor(product.end_time / 1000);
    // console.log(productcounter);
    this.addProductCounter(productcounter);
    this.resetProduct(product);
  }

  removeCounterRunning(product_id: number): void {
    this.counterRunning = this.counterRunning.filter(item => item !== product_id);
  }

  resetProduct(product: Product): void {
    this.removeCounterRunning(product.id);
    product.resetProduct();
    this.product = product;
    this.saveProduct(product);
  }

  recalculateCountdown(): void {
    // this.counterRunning;
    let product: Product;
    console.log("Products: ", this.products);

    for (let i = 0; i < this.counterRunning.length; i++) {
      // const productID = this.counterRunning[i] - 1;
      const productID = this.counterRunning[i];
      console.log("Re ProductID: ", productID);
      product = this.products[productID];
      product.calculateLeftTime();
      this.saveProduct(product);
      console.log("ID:", this.products[productID])
    }
  }

  /* START - The Grid related function */
  showTheGrid(product: Product, wasted: boolean = false): void {
    const tiles_temp = [];

    this.isGrid = true;
    this.isDashboard = false;
    if (wasted) {
      for (let i = 0; i <= product.displayed_item; i++) {
        tiles_temp.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
      }
      this.tiles = tiles_temp;
      this.isWasted = true;

    } else {
      if (product.wasted_item === 0) {
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

    // console.log("ProductID: ", product.id);

    if (!product.isClicked) {
      // product.isClicked = true;
      // product.isTimerRunning = true;
      product.displayed_item = text;
      product.startCounter();
      // product.calculateStartEndTime();
      //  this.product = product;
      let index = this.products.findIndex(x=>x.id === this.product.id)
      console.log("Index: ", index);
      //this.counterRunning.push(this.product.id);
      this.counterRunning.push(index);
      // console.log("CounterRunning: ", this.counterRunning);
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

  /* START - ProductCounterService */
  addProductCounter(productcounter: ProductCounter) {
    // this.productcounterservice.addProductCounter(productcounter).subscribe((productcounter) => {
    //  this.productcounter = productcounter;
    this.productcounterservice.addProductCounter(productcounter).subscribe((any) => {
      this.productcounter = productcounter;
    });
  }

  getProductCounterById(id: number) {
    this.productcounterservice.getProductCounterById(id).subscribe((productcounter) => {
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
    // this.productservice.updateProduct(product).subscribe((product) => {
    this.productservice.updateProduct(product).subscribe((any) => {
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
      products.forEach(product => { this.resetProduct(product); });
      this.products = products;
    });
  }

  /**********************/
  /* On Start Component */
  /**********************/
  ngOnInit() {
    this.getAllProducts();
  }

  /* END */

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
}
