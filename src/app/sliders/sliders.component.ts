import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

// import the slider library
import  KeenSlider  from 'keen-slider';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['../../../node_modules/keen-slider/keen-slider.min.css',
    './sliders.component.css']
})
export class SlidersComponent implements AfterViewInit, OnDestroy {

  @ViewChild("mainSliderRef") mainSliderRef!: ElementRef<HTMLElement>;

  @ViewChild("categoriesSliderRef") categoriesSliderRef!: ElementRef<HTMLElement>;
  
  @ViewChild("dealsRef") dealsRef!: ElementRef<HTMLElement>;

  mainCurrentSlide: number = 1;
  dotHelper: Array<Number> = [];
  mainSlider!: KeenSlider;
  categoriesSlider!: KeenSlider;
  dealsCurrentSlide: number = 1;
  dealsSlider!: KeenSlider;

  mainSliderImages: string[] = [
    "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg",
    "https://images.pexels.com/photos/3028500/pexels-photo-3028500.jpeg"
  ];

  categorySliderImages: { imgPath: string, name: string }[] = [
    { imgPath: "../../assets/carousel/fruitsAndVegIcon.png", name: "Fruits & Vegetables" },
    { imgPath: "../../assets/carousel/groceryIcon.png", name: "Grocery & Staples" },
    { imgPath: "../../assets/carousel/snacksIcon.png", name: "Snacks, Biscuits & Chocolates" },
    { imgPath: "../../assets/carousel/beveragesIcon.png", name: "Beverages" },
    { imgPath: "../../assets/carousel/personalCareIcon.png", name: "Personal care" },
  ];

  dealsSliderImages: string[] = [
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?",
    "https://images.pexels.com/photos/6045295/pexels-photo-6045295.jpeg?"
  ];

  constructor() { }
  
  ngOnInit() {
  }

  ngAfterViewInit() {
    /*
      Main carousel
    */ 
    setTimeout(() => {
      this.mainSlider = new KeenSlider(this.mainSliderRef.nativeElement, {
        initial: this.mainCurrentSlide,
        slideChanged: (s) => {
          this.mainCurrentSlide = s.details().relativeSlide;
        },
      })
    });
    // dot navigation for main slider
    for (let i = 0; i < this.mainSliderImages.length; i++)
      this.dotHelper.push(i);
    
    /*
      Categories slider
    */
    this.categoriesSlider = new KeenSlider(this.categoriesSliderRef.nativeElement, {
      slidesPerView: 4,
      spacing: 10,
      breakpoints: {
        "(min-width: 0px)": {
          slidesPerView: 1,
        },
        "(min-width: 750px)": {
          slidesPerView: 2,
        },
        "(min-width: 900px)": {
          slidesPerView: 3,
        },
        "(min-width: 1200px)": {
          slidesPerView: 4,
        }
      }
    });

    /*
      Deals slider
    */
    setTimeout(() => {
      this.dealsSlider = new KeenSlider(this.dealsRef.nativeElement, {
        initial: this.dealsCurrentSlide,
        slidesPerView: 4,
        spacing: 10,
        slideChanged: (s) => {
          this.dealsCurrentSlide = s.details().relativeSlide;
        },
        breakpoints: {
          "(min-width: 0px)": {
            slidesPerView: 1,
          },
          "(min-width: 750px)": {
            slidesPerView: 2,
          },
          "(min-width: 900px)": {
            slidesPerView: 3,
          },
          "(min-width: 1200px)": {
            slidesPerView: 4,
          }
        }
      });
    });

  }

  ngOnDestroy() {

    if (this.mainSlider)
      this.mainSlider.destroy();
    
    if (this.categoriesSlider)
      this.categoriesSlider.destroy();
    
    if (this.dealsSlider)
      this.dealsSlider.destroy();
    
  }

}
