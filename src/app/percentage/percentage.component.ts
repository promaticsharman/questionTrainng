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
  ngOnInit(): void {
    this.percentage = this.route.snapshot.params.percent
    this.english = this.route.snapshot.params.english
  }

}
