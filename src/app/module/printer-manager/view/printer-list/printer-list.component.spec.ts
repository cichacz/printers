import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterListComponent } from './printer-list.component';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatProgressBarModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {PrinterManagerRoutingModule} from '@app/module/printer-manager/printer-manager-routing.module';
import {PrintersService} from '@app/module/printer-manager/service/printers.service';
import {PrinterFormComponent} from '@app/module/printer-manager/form/printer/printer-form.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '@app/app-routing.module';

describe('PrinterListComponent', () => {
  let component: PrinterListComponent;
  let fixture: ComponentFixture<PrinterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterListComponent, PrinterFormComponent ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        PrinterManagerRoutingModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        MatBottomSheetModule,
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        PrintersService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
