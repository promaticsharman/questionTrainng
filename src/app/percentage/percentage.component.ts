import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.css']
})
export class PercentageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  average 
  percent
  english
  math
  science
  physical
  ngOnInit(): void {
    this.percent = this.route.snapshot.params.percent
    this.average= this.route.snapshot.params.average
    this.english = this.route.snapshot.params.english
    this.math = this.route.snapshot.params.math
    this.science = this.route.snapshot.params.science
    this.physical = this.route.snapshot.params.physical
  }

}
