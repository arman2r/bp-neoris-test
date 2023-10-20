import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM/YYYY',
  },
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
})
export class ProductComponent {
  formProduct!: FormGroup;
  date: any;
  getDate?: string;
  getDateRevision?: string;
  objSelf!: Product;
  constructor(private fb: FormBuilder, private selfUpdProduct: ProductoService ) {}

  ngOnInit() {
    this.formProduct = this.fb.group({
      id: [
        { value: '1110515315', disabled: true },
        [Validators.required, Validators.minLength(2)],
      ],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });
  }

  valueChanged(event: any) {
    this.getDate = new Date(event.target.value._d).toISOString().substring(0, 10);
    this.date = new Date(new Date(event.target.value._d).setFullYear(new Date().getFullYear() + 1))
    this.getDateRevision = new Date(this.date).toISOString().substring(0, 10)
  }

  resetForm() {
    this.formProduct.reset({
      id: this.formProduct.get('id')?.value
  });
  }

  submitForm(){
    this.objSelf = this.formProduct.value;
    this.objSelf.id = this.formProduct.get('id')?.value;
    this.objSelf.date_release = this.getDate;
    this.objSelf.date_revision = this.getDateRevision;
    console.log(this.objSelf)
    this.selfUpdProduct.setProduct(this.objSelf).subscribe((res: any) => {
      console.log('se registor con exito', res);
    }, (error) => {
      console.log('error al registrar el producto')
    })
  }
}
