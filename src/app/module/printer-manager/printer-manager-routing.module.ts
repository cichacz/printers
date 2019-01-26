import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrinterListComponent} from './view/printer-list/printer-list.component';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';

const routes: Routes = [
  {
    path: '',
    component: PrinterListComponent,
    resolve: {
      printers: PrintersService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinterManagerRoutingModule { }
