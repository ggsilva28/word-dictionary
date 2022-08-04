import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public displayType: string = 'all';

  constructor() { }

  ngOnInit(): void {
  }

  selectDisplay(e: any): void {
    this.displayType = e.value;
  }
}
