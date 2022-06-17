import { Component, OnInit, Inject } from '@angular/core';
import { BackendApiServiceService } from '../backend-api-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-manage-service-reports',
  templateUrl: './manage-service-reports.component.html',
  styleUrls: ['./manage-service-reports.component.css', '../service-booking/service-booking.component.css', '../user-management/user-management.component.css']
})
export class ManageServiceReportsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'servicetype', 'details', 'download'];
  dataSource: any;

  isLoading: boolean = false;
  showError: boolean = false;
  checked: boolean = false;

  seviceReportIdList: any;
  selectedReportId: any;
  allServiceReports: any;

  constructor(private service: BackendApiServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.showError = false;

    this.getAllServiceReports();
    //this.dataSource = new MatTableDataSource(this.fakeReportsData);

    //development code
    // this.seviceReportIdList = [];
    // this.fakeReportsData.forEach(element => {
    //   this.seviceReportIdList.push({ id: element.id })
    // });
    // this.allServiceReports = this.fakeReportsData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterId() {

    let currentData: any = [];

    if (this.selectedReportId != 'all') {
      this.allServiceReports.forEach((element: any) => {
        if (element.id === this.selectedReportId) currentData.push(element);
      });

      this.dataSource = new MatTableDataSource(currentData);
    }
    else {
      this.dataSource = new MatTableDataSource(this.allServiceReports);
    }


  }


  getAllServiceReports() {
    this.isLoading = true;

    this.service.getAllServiceReports().subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {

          this.service.openSnackBar(`Service Reports fetched successfully`, true);

          if (data['data'].length > 0) {
            //there are service requests
            this.showError = false;
            this.dataSource = new MatTableDataSource(data['data']);
            this.allServiceReports = data['data'];

            this.seviceReportIdList = [];
            data['data'].forEach((element: any) => {
              this.seviceReportIdList.push({ id: element.id });
            });
          }
          else {
            this.service.openSnackBar(`No Service Reports present in database`, false);
            this.showError = false;
            this.dataSource = [];
            this.seviceReportIdList = [];
            //no serice requests - count 0
          }
        }
        else {
          this.showError = true;
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Get Service Requests Failed", error);
        this.service.openSnackBar(`Unable to fetch service Reports please try again`, false);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }

  getMyServiceReports(id: any) {
    this.isLoading = true;

    this.service.getMyServiceReports(id).subscribe(
      (data: any) => {
        if (data['data'] && data['statusCode'] && data['statusCode'] >= 200 && data['statusCode'] <= 299) {

          this.service.openSnackBar(`Service Reports fetched successfully`, true);

          if (data['data'].length > 0) {
            //there are service requests
            this.showError = false;
            this.dataSource = new MatTableDataSource(data['data']);
            this.allServiceReports = data['data'];

            this.seviceReportIdList = [];
            data['data'].forEach((element: any) => {
              this.seviceReportIdList.push({ id: element.id });
            });
          }
          else {
            this.service.openSnackBar(`No Service Reports present in database`, false);
            this.showError = false;
            this.dataSource = [];
            this.seviceReportIdList = [];
            //no serice requests - count 0
          }
        }
        else {
          this.showError = true;
          this.service.openSnackBar('Unable to process request! Invalid response! Check logs for more details', false);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error("Get Service Requests Failed", error);
        this.service.openSnackBar(`Unable to fetch service Reports please try again`, false);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }

  moreDetails(element: any) {
    const dialogRef = this.dialog.open(ViewServiceReport, {
      width: '900px',
      data: element
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //closed modal

      }
    })
  }

  download(element: any) {
    const doc = new jsPDF('l', 'mm', 'a4');
    var col: any = [["id", "reportdate", "servicetype", "actionTaken", "diagnosisDetails", "ispaid", "visitfees", "repairdetails"]];
    var rows: any = [];



    var itemNew = [];
    itemNew.push(element);

    itemNew.forEach(element => {
      var tmp = [element.id, element.reportdate, element.servicetype, element.actionTaken, element.diagnosisDetails, element.ispaid, element.visitfees, element.repairdetails];
      rows.push(tmp);
    });


    autoTable(doc, {
      head: col,
      body: rows,
      didDrawCell: (data) => { },
    })
    doc.save(`${element.id}.pdf`);

  }

  toggleReports() {
    if (!this.checked) {
      let id = sessionStorage.getItem("userId");
      this.getMyServiceReports(id);
    }
    else {
      this.getAllServiceReports();
    }
  }


  fakeReportsData = [
    {
      "id": 1,
      "reportdate": null,
      "servicetype": "repair02",
      "actionTaken": "yes",
      "diagnosisDetails": "dontknow",
      "ispaid": true,
      "visitfees": 10.0,
      "repairdetails": "allrepaired"
    },
    {
      "id": 2,
      "reportdate": null,
      "servicetype": "repair03",
      "actionTaken": "yes",
      "diagnosisDetails": "dontknow",
      "ispaid": true,
      "visitfees": 10.0,
      "repairdetails": "allrepaired"
    }
  ]

}



@Component({
  selector: 'view-service-report',
  templateUrl: './templates/view-service-report.component.html',
  styleUrls: ['../service-booking/service-booking.component.css', '../user-management/user-management.component.css']
})
export class ViewServiceReport {
  constructor(public dialogRef: MatDialogRef<ViewServiceReport>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
}