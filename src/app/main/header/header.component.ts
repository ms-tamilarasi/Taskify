import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../task-service.service';

interface Task {
  id: string;
  text: string;
  isImportant: boolean;
  isDatePickerVisible: boolean;
  isDateAvailable: boolean;
  dueDate: Date | null;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent implements OnInit {

  isDarkMode: boolean = false;
  searchQuery: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');  
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); 
    }
  }

  onSearch() {
    this.taskService.searchQueryChanged.emit(this.searchQuery);
    console.log('Search query: ', this.searchQuery);
  }

}
