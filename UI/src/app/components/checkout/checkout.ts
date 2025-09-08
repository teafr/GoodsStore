import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart.model';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout {
  cartItems: CartItem[];
  totalPrice: number;

  constructor(
    private saleService: SaleService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems = this.cartService.cartItemsSig();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  makePurchase() {
    this.authService.getUser().subscribe(currentUser => {
      console.log(`Current user: ${JSON.stringify(currentUser)}`);
      if (!currentUser) {
        this.router.navigateByUrl('/login');
        return;
      }

      const sales: Sale[] = this.cartItems.map(cartItem => ({
        product: cartItem.product,
        user: currentUser.id,
        quantity: cartItem.quantity,
        purchaseDate: new Date(),
      }));
      this.saleService.createMultipleSales(sales).subscribe(items => {
        this.cartService.clearCart();
        this.router.navigateByUrl('/thank-you');
      });
    });
  }
}
