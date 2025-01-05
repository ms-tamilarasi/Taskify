import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './tasks/tasks.component';
import { ImportantComponent } from './important/important.component';
import { PlannedComponent } from './planned/planned.component';
import { authGuard } from '../auth-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, children: [
    {
      path: '', component: TasksComponent
    },
    {
      path: 'important', component: ImportantComponent
    },
    {
      path: 'planned', component: PlannedComponent
    }
  ], canActivate: [authGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
