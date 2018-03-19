import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDownload]'
})
export class DownloadDirective {

  @Input()
  downloadStr: string = ''

  @HostListener('click') onMouseEnter() {
    this.clickDownload(this.el.nativeElement)
  }

  clickDownload(aLink) {
    
    let str = encodeURIComponent(this.downloadStr);
    aLink.href = "data:text/csv;charset=utf-8,\ufeff" + str;
  }

  constructor(private el: ElementRef) {

  }



}
