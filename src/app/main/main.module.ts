import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { ImportantComponent } from './important/important.component';
import { PlannedComponent } from './planned/planned.component';
import { TaskService } from './task-service.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    TasksComponent,
    ImportantComponent,
    PlannedComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TaskService]
})
export class MainModule { }
