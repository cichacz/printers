import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Printer} from '@app/module/printer-manager/model/printer';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheetRef} from '@angular/material';
import {PrinterStatus} from '@app/module/printer-manager/enum/printer-status.enum';

@Component({
  selector: 'app-printer',
  templateUrl: './printer-form.component.html',
  styleUrls: ['./printer-form.component.scss']
})
export class PrinterFormComponent implements OnInit {
  printer: Printer;

  constructor(private route: ActivatedRoute, private bottomSheetRef: MatBottomSheetRef<PrinterFormComponent>) { }

  ngOnInit() {
    this.printer = this.route.snapshot.data.printer || new Printer();
  }

  save() {
    const statusCount = Object.keys(PrinterStatus).length / 2;
    this.printer.status = Math.floor(Math.random() * statusCount) + 1;
    this.printer.inkLevel = Math.floor(Math.random() * 100) / 100;
    this.bottomSheetRef.dismiss(this.printer);
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }
}
