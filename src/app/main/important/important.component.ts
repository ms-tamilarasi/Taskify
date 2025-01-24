import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    selector: 'app-important',
    templateUrl: './important.component.html',
    styleUrl: './important.component.scss',
    standalone: false
})
export class ImportantComponent {

  constructor(private taskService: TaskService) {}

  @Input() importantTasks: Task[] = [];  
  @Output() updateImportantTasks = new EventEmitter<Task[]>();  

  isAddTaskOpen: boolean = false;  
  newTask: string = '';           
  editingIndex: number = -1;    
  isEditMode: boolean = false;
  
  ngOnInit() {
    this.loadImportantTasks();
  }

  loadImportantTasks() {
    this.taskService.getImportantTasks().subscribe(
      (tasks) => {
        this.importantTasks = tasks;
      },
      (error) => {
        console.error('Error loading important tasks:', error);
      }
    );
  }

  editTask(index: number) {
    this.newTask = this.importantTasks[index].text;
    this.editingIndex = index;
    this.isAddTaskOpen = true;
    this.isEditMode = true;
  }

  deleteTask(index: number) {
    const taskId = this.importantTasks[index].id; 
      this.importantTasks.splice(index, 1);  
  }

  saveTask() {
    if (this.newTask.trim()) {
      const updatedTask: Task = {
        id: this.importantTasks[this.editingIndex]?.id || '',
        text: this.newTask.trim(),
        isImportant: true,  
        isDatePickerVisible: false,
        dueDate: null,
        isDateAvailable: false
      };
  
      if (this.editingIndex === -1) {
        this.taskService.addTask(updatedTask).subscribe(
          () => {
            this.importantTasks.push(updatedTask);
            this.updateImportantTasks.emit(this.importantTasks);
          },
          (error) => {
            console.error('Error adding task:', error);
          }
        );
      } else {
        this.taskService.updateTask(updatedTask).subscribe(
          () => {
            this.importantTasks[this.editingIndex] = updatedTask;
            this.editingIndex = -1;
            this.updateImportantTasks.emit(this.importantTasks); 
          },
          (error) => {
            console.error('Error updating task:', error);
          }
        );
      }
      this.newTask = '';
      this.isAddTaskOpen = false;
    }
  }
}
