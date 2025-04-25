import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-home',
  imports: [NgIf, CommonModule],
  standalone: true,
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.scss'
})
export class PortfolioHomeComponent implements OnInit {

  roles = ["Passionate Software Engineer with a strong problem-solving mindset and a deep love for technology.", "Fullstack & Web Developer skilled in building end-to-end modern web applications.", "Responsive Designer focused on crafting clean, user-friendly, and mobile-first designs.", "A passionate software engineer with a knack for problem-solving and a love for technology."];
  currentRoleIndex = 0;

  description: string = '';
  isFading = false;

  checkMobileWidth = 1180;
  checkMobileWidthPhone = 767;
  isTabViewNum: boolean | undefined;
  activeLink = this.roles[0];

  @ViewChild('home') home !: ElementRef;
  @ViewChild('intro') intro !: ElementRef;
  @ViewChild('journey') journey !: ElementRef;
  @ViewChild('projects') projects !: ElementRef;
  @ViewChild('contact') contact !: ElementRef;

  // @ViewChild("viewResumePopup") viewResumePopup: TemplateRef<any> | undefined;
  // modalRef: BsModalRef | undefined;
  // pdfViewerModuleLoaded: boolean = false;
  // pdfSrc: string = '';

  constructor() { }

  ngOnInit() {
    const el = document.querySelector('.description') as HTMLSpanElement;
    if (el) {
      el.textContent = this.roles[this.currentRoleIndex]; // Set default text on load
    }
    this.rotateText(); // Start the rotation

    this.activeLink = 'home'; // Set default active link
    history.replaceState(null, '', ''); // Set default URL on load
    const element = document.getElementById('home');
    if (element){
      element.scrollIntoView({ behavior: 'smooth' });
    }
    window.addEventListener('scroll', this.elementReveal);
  }

  ngAfterViewInit(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          this.activeLink = entry.target.id;
        }
      });
    })
  }

  elementReveal() {
    var reveal = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveal.length; i++){
      var windowHeight = window.innerHeight;
      var relvealTop = reveal[i].getBoundingClientRect().top;
      var revealPoint = 150;

      if (relvealTop < windowHeight - revealPoint) {
        reveal[i].classList.add('active');
      }
      else {
        reveal[i].classList.remove('active');
      }
    }
  }

  navigateTo(section: string, check: string){
    history.pushState(null, '', '/' + section);
    const element = document.getElementById(section);
    if (element){
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeLink = section;
  }
  
  rotateText = () => {
    this.isFading = true;

    setTimeout(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.description = this.roles[this.currentRoleIndex];
      this.isFading = false;

      setTimeout(this.rotateText, 2000);
    }, 500); // fade-out duration
  };

  downloadBtn() {
    let btn = document.querySelector('.download-cv') as HTMLButtonElement;
    if (btn) {
      const originalContent = btn.innerHTML;
      const originalStyle = btn.getAttribute('style');
  
      btn.setAttribute('style', 'width: 140px;');
      btn.textContent = 'Downloading';
      let loadingText = 'Downloading';
      let dotsCount = 0;
  
      function updateText() {
        if (btn) {
          btn.textContent = loadingText + '.'.repeat(dotsCount + 1);
          dotsCount = (dotsCount + 1) % 3;
        }
      }
  
      let intervalId = setInterval(updateText, 400);
      let link = document.createElement("a");
      link.download = "SHAYAM_PRASATH_R_Resume";
      link.href = "assets/documents/SHAYAM_PRASATH_R-Resume.pdf";
      link.click();
      setTimeout(() => {
        clearInterval(intervalId);
        if (btn) {
          btn.innerHTML = originalContent;
          btn.setAttribute('style', originalStyle || '');
        }
      }, 500);
    }
  }

  isMobileCompatibleScreen() {
    return window.screen.width <= this.checkMobileWidth;
  }

  isMobileCompatibleScreenPhone(){
    return window.screen.width <= this.checkMobileWidthPhone;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isTabView();
  }
  isLandscape(): boolean {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    return mediaQuery.matches;
  }

  isTabView() {
    this.isTabViewNum= this.isLandscape();
  }

  // closePopup() {
  //   this.modalRef?.hide();
  // }

  // viewResume(){
  //   if (this.viewResumePopup){
  //     this.modalRef = this.modalService.show(this.viewResumePopup, {
  //       class: "modal-view-popup"
  //     });
  //     this.pdfViewerModuleLoaded = true;
  //     this.pdfSrc = 'assets/pdf/Shayam Prasath R_Resume.pdf';
  //   }
  // }
}
