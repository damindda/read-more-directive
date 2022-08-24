import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  ElementRef,
  Renderer2,
  Component,
  DebugElement,
} from '@angular/core';
import { ReadMoreDirective } from './read-more.directive';
import { By } from '@angular/platform-browser';

describe('Read more directive', () => {
  @Component({
    template: `
      <div>
        <div>
          <p id="less" ndtkReadMore>Teting read more directive</p>
        </div>
        <div>
          <p id="more" ndtkReadMore>
            Teting read more directive, There are many variations of passages of
            Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look
            even slightly believable. If you are going to use a passage of Lorem
            Ipsum, you need to be sure there isn't anything embarrassing hidden
            in the middle of text. All the Lorem Ipsum generators on the
            Internet tend to repeat predefined chunks as necessary, making this
            the first true generator on the Internet. It uses a dictionary of
            over 200 Latin words, combined with a handful of model sentence
            structures, to generate Lorem Ipsum which looks reasonable. The
            generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
          </p>
        </div>
      </div>
    `,
  })
  class TestReadMoreDirectiveComponent {}
  let component: TestReadMoreDirectiveComponent;
  let fixture: ComponentFixture<TestReadMoreDirectiveComponent>;
  let directiveElement: DebugElement[] = [];

  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreDirective, TestReadMoreDirectiveComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestReadMoreDirectiveComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.queryAll(By.css('p'));
  });

  it('if not more than 120 wordings', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#less');
    fixture.detectChanges();
    expect(element.className).toEqual('');
  });

  it('if more than 120 wordings', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#more');
    fixture.detectChanges();
    expect(element.className).toEqual('ndtk-read-more');
  });

  it('render click event', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#more');
    fixture.detectChanges();
    expect(element.className).toEqual('ndtk-read-more');
    const buttonElementShowMore = fixture.debugElement.query(By.css('button'));
    buttonElementShowMore.triggerEventHandler('click', null);
    fixture.detectChanges();
  });
});
