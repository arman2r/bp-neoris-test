import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class TableProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const ELEMENT_DATA: Product[] = [
  {
    id: '1',
    logo: 'imagen 1',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '2',
    logo: 'imagen 2',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '3',
    logo: 'imagen 3',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '4',
    logo: 'imagen 4',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '5',
    logo: 'imagen 5',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '6',
    logo: 'imagen 6',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '7',
    logo: 'imagen 7',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '8',
    logo: 'imagen 8',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '9',
    logo: 'imagen 9',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '10',
    logo: 'imagen 10',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '11',
    logo: 'imagen 11',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
  {
    id: '12',
    logo: 'imagen 12',
    name: 'tarjeta de credito',
    description: 'descripcion de la tarjeta de credito',
    date_release: '01/01/2000',
    date_revision: '01/01/2001',
  },
];
