import { Component, OnInit } from '@angular/core';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Printer} from '@app/module/printer-manager/model/printer';

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.scss']
})
export class PrinterListComponent implements OnInit {

  printers: Printer[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.printers = this.route.snapshot.data.printers;
    console.log(this.printers);
  }

}
