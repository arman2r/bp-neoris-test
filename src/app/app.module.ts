import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './services/app.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
    ]
})
export class AppModule { }
