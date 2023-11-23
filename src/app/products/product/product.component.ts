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
import { Router, RouterLink } from '@angular/router';
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
import { AlertService } from 'src/app/services/alert.service';

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
  lastId!: Product;
  lastNumberId?: String;
  txtBtnSelf?: string;
  isSelf = false;
  yesterday = new Date();

  constructor(
    private fb: FormBuilder,
    private selfUpdProduct: ProductoService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.yesterday.setDate(this.yesterday.getDate() - 0);
    this.formProduct = this.fb.group({
      id: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2)],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });

    this.selfUpdProduct.getProductList().subscribe((res: any) => {
      //console.log('respuesta', res);

      if (this.router.url.includes('new-product')) {
        this.txtBtnSelf = 'Enviar';
        if (res.length === 0) {
          this.lastNumberId = (Number(1)).toString();
          //console.log(this.lastNumberId);
          this.formProduct.get('id')?.patchValue(this.lastNumberId);
        } else {
          this.lastId = res.slice(-1)[0];
          this.lastNumberId = (Number(this.lastId.id) + 1).toString();
          //console.log(this.lastNumberId);
          this.formProduct.get('id')?.patchValue(this.lastNumberId);
        }

      } else {
        this.txtBtnSelf = 'Actualizar';
        const setData = res.slice(-1)[0];
        //console.log('data', setData)
        const { id, name, description, logo, date_release, date_revision } = setData;

        this.formProduct.patchValue({ id, name, description, logo, date_release, date_revision });

      }
    });


  }

  valueChanged(event: any) {
    this.getDate = new Date(event.target.value._d)
      .toISOString()
      .substring(0, 10);
    this.formProduct.controls['date_revision'].patchValue(new Date(
      new Date(event.target.value._d).setFullYear(new Date().getFullYear() + 1)
    ));

    this.getDateRevision = new Date(this.formProduct.controls['date_revision'].value).toISOString().substring(0, 10);
  }

  resetForm() {
    this.isSelf = false
    this.formProduct.reset({
      id: this.formProduct.get('id')?.value,
    });
  }


  submitForm() {
    const desc = { 'description': ``, 'actions': false }
    this.objSelf = this.formProduct.getRawValue();
    //console.log('que id llega', this.objSelf.id)
    this.isSelf = true
    if (this.router.url.includes('new-product')) {
      this.selfUpdProduct.verifyIdProduct(this.objSelf.id).subscribe(resVerify => {
        //console.log('verificacion', resVerify === 'true')
        if (resVerify !== 'true') {
          //console.log('paso la verificacion')

          if (this.getDate !== undefined) {
            this.objSelf.date_release = this.getDate;
            this.objSelf.date_revision = this.getDateRevision;
          } else {
            //console.log('fecha sin editar', this.formProduct.controls['date_release'].value)
            this.objSelf.date_release = new Date(this.formProduct.controls['date_release'].value)
              .toISOString()
              .substring(0, 10);

            this.objSelf.date_revision = new Date(this.formProduct.controls['date_revision'].value).toISOString().substring(0, 10);
          }
          //console.log(this.objSelf);


          this.selfUpdProduct.setProduct(this.objSelf).subscribe(
            (res: any) => {
              //console.log('se registor con éxito', res);
              this.router.navigate(['/products']);
              this.isSelf = false;
            },
            (error) => {
              //console.log('error al registrar el producto');
              this.isSelf = false;
              desc.description = 'Error al registrar el producto, intente nuevamente'
              this.alert.open(desc);
            }
          );

        } else {
          let setId = Number(this.objSelf.id)
          this.objSelf.id = (++setId).toString();
          this.formProduct.controls['id'].patchValue(this.objSelf.id)
          this.submitForm()
        }
      }, error => {
       // console.log('error', error)
        this.isSelf = false;
        desc.description = 'Error al comprobar existencia del producto, intente nuevamente'
        this.alert.open(desc);
      })
    } else {
      this.selfUpdProduct.updateProduct(this.objSelf).subscribe(
        (res: any) => {
          // console.log('se actualizó con éxito', res);
          this.router.navigate(['/products']);
          this.isSelf = false;
        },
        (error) => {
          //console.log('error al registrar el producto');
          this.isSelf = false;
          desc.description = 'error al registrar el producto'
          this.alert.open(desc);
        }
      );
    }
  }

}
