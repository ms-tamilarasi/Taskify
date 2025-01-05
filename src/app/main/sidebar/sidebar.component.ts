import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isSidebarOpen: boolean = true; 
  @Input() importantTasks: string[] = [];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }

}
