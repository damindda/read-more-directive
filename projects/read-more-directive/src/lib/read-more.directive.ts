import {
  Directive,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[ndtkReadMore]',
})
export class ReadMoreDirective implements AfterViewInit {
  readMoreButtonName: string = 'ndtk-read-more';
  showLessButtonName: string = 'ndtk-show-less';
  /**
   * Represents a book.
   * @Input() stringLength accepts number
   * by default it is 180
   */
  @Input() stringLength: number = 180;
  hideConfig = {
    buttonText: 'Read More',
  };

  showConfig = {
    buttonText: 'Show Less',
  };

  stringValues!: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.stringValues = this.elementRef.nativeElement.innerHTML;

    if (this.stringValues.length > this.stringLength) {
      this.renderInitialReadMoreContainers();
      this.generateButtons(this.hideConfig);
    }
  }

  readMoreBtnOnClick() {
    const elementRef = this.elementRef.nativeElement;
    if (elementRef.classList.contains(this.readMoreButtonName)) {
      this.showReadMoreContainer();
    } else {
      this.showLessContainer();
    }
  }

  renderInitialReadMoreContainers() {
    const currentText =
      this.stringValues.substring(0, this.stringLength) + '...';
    this.elementRef.nativeElement.innerHTML = currentText;
    this.renderer.addClass(
      this.elementRef.nativeElement,
      this.readMoreButtonName
    );
  }

  showReadMoreContainer() {
    this.elementRef.nativeElement.innerHTML = this.stringValues;
    this.renderer.removeClass(
      this.elementRef.nativeElement,
      this.readMoreButtonName
    );
    this.renderer.addClass(
      this.elementRef.nativeElement,
      this.showLessButtonName
    );
    this.generateButtons(this.showConfig);
  }

  showLessContainer() {
    this.renderInitialReadMoreContainers();

    const elementRef = this.elementRef.nativeElement;
    this.renderer.removeClass(elementRef, this.showLessButtonName);
    this.renderer.addClass(
      this.elementRef.nativeElement,
      this.readMoreButtonName
    );
    this.generateButtons(this.hideConfig);
  }

  generateButtons({ buttonText }: { buttonText: string }) {
    const elementRef = this.elementRef.nativeElement;
    const button = this.renderer.createElement('button');
    const text = this.renderer.createText(buttonText);
    this.renderer.appendChild(button, text);
    this.renderer.addClass(button, 'ndtk-btn-text');
    this.renderer.addClass(button, 'ndtk-comments-read-more-btn');
    this.renderer.appendChild(elementRef.parentNode, button);

    this.renderer.listen(button, 'click', () => {
      elementRef.parentNode.removeChild(button);
      this.readMoreBtnOnClick();
    });
  }
}
