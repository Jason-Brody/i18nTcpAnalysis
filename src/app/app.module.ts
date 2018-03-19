import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module'
import { MaterialDesignModule } from './material-design/material-design.module';
import { RouterModule,Routes } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component';
import { HardataService } from './services/hardata.service';
import { TcpdataService } from './services/tcpdata.service';
import { FileService } from './services/file.service';
import { RegexPipe } from './shared/regex.pipe';
import {MytoolsModule} from './mytools/mytools.module';
const routes:Routes = [
  
  {path:'',redirectTo:'/dashboard/har',pathMatch:'full'},
  {path:'welcome/:id',component:WelcomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MytoolsModule,
    DashboardModule,
    MaterialDesignModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HardataService,
    TcpdataService,
    FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
