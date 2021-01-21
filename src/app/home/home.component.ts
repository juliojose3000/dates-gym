import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slideIndex: number = 1;

  constructor() { }

  ngOnInit(): void {
    //It forces the first image will be shown when page starts
    var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLDivElement>;
    var dots = document.getElementsByClassName("dot");
    slides[this.slideIndex-1].style.display = "block";  
    dots[this.slideIndex-1].className += " active";

    this.sliderTimer();
  } 

  sliderTimer() {  
    setTimeout (() => {
        this.showSlides();
      }, 3500);
 
  }

  showSlides(){
    var i;
    var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLDivElement>;
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {this.slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";  
    dots[this.slideIndex-1].className += " active";
    this.sliderTimer();
  }

}
