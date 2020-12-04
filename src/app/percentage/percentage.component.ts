import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.css']
})
export class PercentageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  percentage
  english
  math
  science
  physical
  ngOnInit(): void {
    this.percentage = this.route.snapshot.params.percent
    this.english = this.route.snapshot.params.english
    this.math = this.route.snapshot.params.math
    this.science = this.route.snapshot.params.science
    this.physical = this.route.snapshot.params.physical
  }

}
