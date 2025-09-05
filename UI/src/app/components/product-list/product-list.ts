import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
// import { ProductFilter } from '../../models/productFilter.model';

@Component({
  selector: 'app-product-list',
  imports: [MatPaginatorModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  products: Product[] | undefined;
  // filter: ProductFilter = {
  //   minPrice: undefined,
  //   maxPrice: undefined,
  //   unit: undefined,
  //   pagination: {
  //     currentPage: 1,
  //     pageSize: 10,
  //     totalItems: 0
  //   }
  // };

  constructor(private productService: ProductService) { }
  
  ngOnInit() {
    console.log("ProductList component initializing...");
    this.productService.getProducts().subscribe(data => this.products = data);
    console.log("Products:" + this.products);
    // this.filter.pagination.totalItems = this.products?.length || 0;
  }
}
