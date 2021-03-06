import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterListComponent } from './view/printer-list/printer-list.component';
import { PrinterFormComponent } from './form/printer/printer-form.component';
import {PrinterManagerRoutingModule} from '@app/module/printer-manager/printer-manager-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatProgressBarModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { InetaddrDirective } from './validator/inetaddr.directive';

@NgModule({
  declarations: [PrinterListComponent, PrinterFormComponent, InetaddrDirective],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrinterManagerRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatBottomSheetModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule
  ],
  providers: [
    PrintersService
  ]
})
export class PrinterManagerModule { }
