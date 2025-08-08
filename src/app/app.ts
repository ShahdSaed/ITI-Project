import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHome } from './components/nav-home/nav-home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHome],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
