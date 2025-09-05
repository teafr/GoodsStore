import { Routes } from '@angular/router';
import { ProductDetails } from './components/product-details/product-details';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    }, {
        path: 'products',
        component: ProductList
    }, {

        path: 'products/:id',
        component: ProductDetails
    }
];
