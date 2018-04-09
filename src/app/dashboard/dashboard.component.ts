import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  product: Product;
  tiles = [];
  isDashboard = true;
  isGrid = false;

  constructor(
    private productservice: ProductService
  ) {
    for (let i = 1; i < 61; i++) {
      this.tiles.push({ text: i, cols: 1, rows: 1, color: 'lightgreen' });
    }
  }

  showTheGrid(product: Product): void {
    this.isGrid = true;
    this.isDashboard = false;
    this.product = product;
    console.log("Name: ", this.product.name);
  }

  gridClick(product: Product, id: string, text: number) {
    this.isGrid = false;
    this.isDashboard = true;
  //  this.product.display = text;
  //  this.product.click_count++;
    // this.product.isTimerRun = true;
  //  this.save();
  //  this.showGrid = false;
  //  this.showDashboard = true;
    // this.isTimerRunning = true;
  //  this.productClick(product);
  }

  public ngOnInit() {
    this.productservice.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  
}
