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
  isDashboard = false;

  constructor(
    private productservice: ProductService
  ) { }

  public ngOnInit() {
    this.productservice.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
  
}
