import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isSidebarOpen: boolean = true;
  importantTasks: string[] = [];
  tasks: { 
    text: string, 
    isImportant: boolean, 
    isDatePickerVisible: boolean, 
    dueDate: Date | null 
  }[] = [];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onTaskMarkedImportant(task: string) {
    if (task && !this.importantTasks.includes(task)) {
      this.importantTasks.push(task); 
    }
  }

  onImportantTasksUpdate(updatedTasks: string[]) {
    this.importantTasks = updatedTasks; 
  }

}
