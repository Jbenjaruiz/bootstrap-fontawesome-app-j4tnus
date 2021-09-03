import { Component, OnInit } from '@angular/core';
import { faAngular, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faBook, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  faAngular = faAngular;
  faFontAwesome = faFontAwesome;
  faBook = faBook;
  faCar = faCar;

  message: string = "Welcome to the fantastic and fast world of Angular!";

  constructor() { }

  ngOnInit() {
  }

}