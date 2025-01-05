import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrl: './planned.component.scss'
})
export class PlannedComponent {
  plannedTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadPlannedTasks();
  }

  loadPlannedTasks() {
    this.taskService.getPlannedTasks().subscribe(
      (tasks) => {
        console.log('Fetched Planned Tasks:', tasks);
        this.plannedTasks = [...tasks];  
      },
      (error) => {
        console.error('Error loading planned tasks:', error);
      }
    );
  }
  
  
}