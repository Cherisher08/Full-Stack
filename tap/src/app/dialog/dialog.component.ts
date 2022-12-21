import { Component, Input, OnInit , ViewChild } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { ApiService } from '../services/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private api : ApiService) {
  }
  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];
  ngOnInit(): void {
    this.api.GetChartInfo().subscribe(result =>{
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length;i++){
          if(this.chartdata[i]["id"] == 1){
            for(let j=0;j<this.chartdata[i]["data"].length;j++){
            this.labeldata.push(this.chartdata[1]["data"][j].monyear);
            this.realdata.push(this.chartdata[1]["data"][j].Studentcount);
            this.colordata.push(this.chartdata[1]["data"][j].colorcode);
          }
          }
        }
      }
    })
    this.RenderChart(this.labeldata,this.realdata,this.colordata);
  }

  RenderChart(labeldata:any,realdata:any,colordata:any){
    console.log(labeldata);
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: labeldata,
        datasets: [{
            label: '# of Placed Students',
            data: realdata,
            backgroundColor: colordata,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  min : 0,
                  max : 130
              }
          },
          animation : false
      }
  });
  }

}
