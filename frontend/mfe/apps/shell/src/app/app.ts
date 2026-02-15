import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Notification } from './notification/notification';
import { Loading } from './loading/loading';

@Component({
  imports: [RouterModule, Loading, Notification, RouterOutlet],
  selector: 'mfe-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
