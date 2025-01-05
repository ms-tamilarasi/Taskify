import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface Task {
  id: string;
  text: string;
  isImportant: boolean;
  isDatePickerVisible: boolean;
  isDateAvailable: boolean;
  dueDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/tasks';
  public searchQueryChanged = new EventEmitter<string>();
   

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl); 
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);  
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);  
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }

  getImportantTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((tasks: any) => tasks.filter((task: any) => task.isImportant))  
    );
  }

  getPlannedTasks() {
    return this.http.get<Task[]>(this.apiUrl).pipe(map(tasks => tasks.filter(task => task.isDateAvailable)));
  }

  searchTasks(query: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks => tasks.filter(task => task.text.toLowerCase().includes(query.toLowerCase())))
    );
  }
  
}
