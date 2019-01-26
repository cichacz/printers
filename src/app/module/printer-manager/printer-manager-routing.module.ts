import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrinterListComponent} from './view/printer-list/printer-list.component';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';
import {PrinterFormComponent} from '@app/module/printer-manager/form/printer/printer-form.component';

const routes: Routes = [
  {
    path: '',
    component: PrinterListComponent,
    resolve: {
      printers: PrintersService
    }
  },
  {
    path: 'add-printer',
    component: PrinterFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinterManagerRoutingModule { }
