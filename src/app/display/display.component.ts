import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private productservice: ProductService) { }


  products: Product[] = [];
  product: Product;

  onEvent(event, product: Product) {
    switch (event.action) {
      case 'stop' || 'finished':
        // this.onFinished(product);
        break;
      case 'restart':
        // this.onRestart(product);
        break;
      default:
        product.left_time = event.left / 1000;
        if (!product.isWarning) {
          product.checkIsWarning();
        }
        this.product = product;
    }
  }

  getAllProducts() {
    this.productservice.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }
}
