import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort} from '@angular/material';
// import {MatTableDataSource} from '@angular/material/table';



// import {Assets} from 'src/app/views/beens/assets-been/assets'
// import { AssetsService } from 'src/app/views/beens/assets-been/assets.service';
import { Assets } from '../../../beens/assets-been/assets';
import { AssetsService } from '../../../beens/assets-been/assets.service';
import {Chart } from 'chart.js';
import { Observable } from "rxjs";
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';
import chartData from '../../../beens/assets-been/myassets-json.json'




@Component({
  selector: 'kt-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
  
})
export class AssetsComponent implements OnInit {
  assets: Assets = new Assets();
  assets2: Observable<Assets[]>;
paginaor: MatPaginator;
dataSource: AssetsDataSource;

  

  displayedColumns: string[] = [ 'assetId', 'assetType', 'company', 'investPath', 'InvestValue', 'currentValue', 'expectedIncome', 'percentage', 'notes', 'actions'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
	

  submitted = false;
  panelOpenState = false;
  closeResult: string;
  CurrentDate = new Date();
  constructor(private modalService: NgbModal, private assetsService:  AssetsService ) {

    this.CurrentDate =new Date();
  }

 


  
  open(content) {
      this.modalService.open(content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
          return  `with: ${reason}`;
      }
    }


 
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  initializeChart(chartData){
    let labels =  chartData.map((item) => item.asset_type)
    let colors = chartData.map((item) => this.getRandomColor())
    let percentages =  chartData.map((item) => item.percentage)
      new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels:labels ,

          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: colors,
              data: percentages
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
  }
    

  ngOnInit() {

    this.dataSource = new AssetsDataSource(this.assetsService);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    

    //This is the GET api call for data of the table 
    this.assetsService.getAssetsList()
     .subscribe(res =>
      {
        if(res){
          this.initializeChart(res)  
       }
      }, 
      error =>{ 
        // Remove this statement when you recieve data of chart dynamicaly through API  
        this.initializeChart(chartData)
      });
    

//  const ctx = document.getElementById("doughnut-chart")
//     const xlabels =[];
//     const myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: xlabels,
      
//       datasets: [
//         {
//           label: "Population (millions)",
//           backgroundColor: ["#3758ff", "#ff6384","#38ebff","#fb38ff"],
//           data: [2478,1500,1020,433]
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: false,
//         text: 'Predicted world population (millions) in 2050'
//       }
//     }
// });


    
//   }

  // ngAfterViewInit() {
  
    
    
  }


  reloadData() {
    this.assets2 = this.assetsService.getAssetsList();
  }

  deleteAssets(assetId: number) {
    this.assetsService.deleteAssets(assetId)
         .subscribe(
          data => {
            console.log(data);
                    this.reloadData();
                    
        },
        
        error => console.log(error));
  }

  newAssets(): void {
    this.submitted = false;
    this.assets = new Assets();
  }

  
  save() {
    
    this.assetsService.createAssets(this.assets)
      .subscribe(data => console.log(data), error => console.log(error));
    this.assets = new Assets();
    
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    
  }





  
}

export class AssetsDataSource extends DataSource<any>{
  assets: Observable<Assets[]>;
filter: any;
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor( private assetsService: AssetsService) {
    super();
  }

  connect(): Observable<Assets[]>{
    return this.assets = this.assetsService.getAssetsList();
  }
  disconnect(){}

 

  
}

