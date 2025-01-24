import { Component, EventEmitter, Output } from '@angular/core';
import { v4 as UUID } from 'uuid';
import { TaskService } from '../task-service.service';
import { tap } from 'rxjs';

interface Task {
  id: string;
  text: string;
  isImportant: boolean;
  isDatePickerVisible: boolean;
  isDateAvailable: boolean;
  dueDate: Date | null;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss',
    standalone: false
})
export class TasksComponent {
  isAddTaskOpen: boolean = false;  
  newTask: string = '';            
  tasks: { 
    text: string, 
    isImportant: boolean, 
    isDatePickerVisible: boolean,  
    isDateAvailable: boolean,
    dueDate: Date | null,
    id: string          
  }[] = [];
  plannedTasks: { 
    text: string, 
    dueDate: Date | null
  }[] = [];
  importantTasks: string[] = []; 
  originalTasks: Task[] = [];
  isEditMode: boolean = false;
  edittedTask: any;
  
  @Output() taskMarkedImportant = new EventEmitter<string>(); 

  constructor(private taskService: TaskService) {
    this.loadTasks();
    this.searchTaskListener();
  }

  searchTaskListener(): void {
    this.taskService.searchQueryChanged
    .pipe(
      tap((searchString: string) => {
        if (searchString === '') {
          this.tasks = this.originalTasks;
          return;
        }
        this.tasks = this.originalTasks.filter(task => task.text.includes(searchString));
        console.log('Tasks: ', this.tasks);
        console.log('Original Tasks: ', this.originalTasks);
      })
    )
    .subscribe()
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.originalTasks = tasks;
    });
  }  

  toggleAddTask() {
    this.isAddTaskOpen = !this.isAddTaskOpen;
  }

  toggleDatePicker(index: number) {
    this.originalTasks[index].isDatePickerVisible = !this.originalTasks[index].isDatePickerVisible;
  }

  markAsImportant(index: number) {
    const task = this.originalTasks[index];
    if (task) {
      task.isImportant = !task.isImportant;  
  
      if (task.isImportant) {
        this.taskMarkedImportant.emit(task.text);
      } else {
        this.taskMarkedImportant.emit('');
      }
      this.taskService.updateTask(task).subscribe(
        updatedTask => {
          console.log('Task updated in the database:', updatedTask);
        },
        error => {
          console.error('Error updating task in the database:', error);
        }
      );
    }
  }
  
  saveTask() {
    const builtTask: any = {
      text: this.newTask,
      isImportant: this.edittedTask?.isImportant || false, 
      isDatePickerVisible: false,
      dueDate: this.edittedTask?.dueDate || null, 
      isDateAvailable: this.edittedTask?.isDateAvailable || false, 
      id: this.edittedTask?.id || UUID() 
    };
  
    if (this.isEditMode && this.edittedTask?.id) {
      const matchedTaskIndex: number = this.originalTasks.findIndex(task => task.id === this.edittedTask.id);
  
      if (matchedTaskIndex !== -1) {
        this.originalTasks[matchedTaskIndex] = {
          ...builtTask, 
          id: this.edittedTask.id 
        };
  
        this.tasks = [...this.originalTasks];
        this.edittedTask = undefined;
        this.isEditMode = false;
        this.newTask = ''; 
  
        this.taskService.updateTask(this.originalTasks[matchedTaskIndex]).subscribe(
          updatedTask => {
            console.log('Task updated in the database:', updatedTask);
            this.loadTasks(); 
          },
          error => {
            console.error('Error updating task in the database:', error);
          }
        );
      }
    } else {
      this.taskService.addTask(builtTask).subscribe(
        newTask => {
          console.log('New task added to the database:', newTask);
          this.tasks.push(newTask);  
          this.originalTasks.push(newTask);  
          this.newTask = '';  
        },
        error => {
          console.error('Error adding new task to the database:', error);
        }
      );
    }
  }
  
  editTask(id: string) {
    const matchedTaskIndex: number = this.originalTasks.findIndex(task => task.id === id);
    if (matchedTaskIndex !== -1) {
      this.edittedTask = this.originalTasks[matchedTaskIndex]; 
      this.newTask = this.edittedTask.text; 
      this.isAddTaskOpen = true;  
      this.isEditMode = true; 
    } 
  }
  

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.originalTasks = this.originalTasks.filter(task => task.id !== id);  
      this.tasks = [...this.originalTasks];
    });
  }
  
  toggleTaskImportance(index: number) {
    const task = this.originalTasks[index];
    task.isImportant = !task.isImportant;  

    if (task.isImportant) {
      this.importantTasks.push(task.text);
    } else {
      const taskIndex = this.importantTasks.indexOf(task.text);
      if (taskIndex !== -1) {
        this.importantTasks.splice(taskIndex, 1);
      }
    }
    this.taskService.updateTask(task).subscribe();  
  }

  updatePlannedTasks(index: number) {
    const task = this.originalTasks[index];
        if (task.dueDate) {
      task.isDateAvailable = true;  
      this.taskService.updateTask(task).subscribe(
        (updatedTask) => {
          console.log('Task with due date updated in the database:', updatedTask);
        },
        (error) => {
          console.error('Error updating task with due date in the database:', error);
        }
      );
    } else {
      console.log('Task does not have a due date.');
    }
  }
  

}
