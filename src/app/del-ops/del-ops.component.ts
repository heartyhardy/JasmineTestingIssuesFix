import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-del-ops',
  templateUrl: './del-ops.component.html',
  styleUrls: ['./del-ops.component.css']
})
export class DelOpsComponent implements OnInit {
  isDelRequested=false;

  constructor() { }

  ngOnInit() {
  }

  OnDelRequest():void{
    this.isDelRequested=true;
  } 
  
  OnCancelRequest():void
  {
    this.isDelRequested=false;
  }

}
