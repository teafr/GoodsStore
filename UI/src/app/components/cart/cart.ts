import { Component, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {
  items: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    this.items = this.cartService.cartItemsSig();
    this.total = this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  increase(item: CartItem) {
    this.cartService.addToCart(item.product);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.cartItemsSig.update(items => [...items]);
    } else {
      this.remove(item.product.id);
    }
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    alert('Proceeding to checkout...');
    // later: redirect to checkout page
  }
}
