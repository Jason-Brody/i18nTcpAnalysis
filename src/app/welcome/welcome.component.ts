import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private title:string;


  constructor(private activatedRoute:ActivatedRoute,private sanitizer:DomSanitizer,
  private router:Router) { 
     
  }

  ngOnInit() {
    let url = this.activatedRoute.snapshot.paramMap.get('id');
    url = "https://"+url;
    this.title = url;
    this.url= this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }

  url:SafeResourceUrl;

}
