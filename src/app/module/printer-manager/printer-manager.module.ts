import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterListComponent } from './view/printer-list/printer-list.component';
import { PrinterFormComponent } from './form/printer/printer-form.component';
import {PrinterManagerRoutingModule} from '@app/module/printer-manager/printer-manager-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';

@NgModule({
  declarations: [PrinterListComponent, PrinterFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PrinterManagerRoutingModule
  ],
  providers: [
    PrintersService
  ]
})
export class PrinterManagerModule { }
