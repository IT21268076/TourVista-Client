import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-initial-admin-dash',
  templateUrl: './initial-admin-dash.component.html',
  styleUrls: ['./initial-admin-dash.component.css']
})
export class InitialAdminDashComponent implements OnInit {
  hCount: number = 0;
  cCount: number = 0;

  constructor(private countService: CountService) {}

  ngOnInit(): void {
    this.getHotelCount();
    this.getContractCount();
  }

  getHotelCount(): void {
    this.countService.getHotelCount().subscribe(res => {
      this.hCount = res;
      console.log(this.hCount)
    });
  }

  getContractCount(): void {
    this.countService.getContractCount().subscribe(res => {
      this.cCount = res;
      console.log(this.cCount)
    });
  }

}
