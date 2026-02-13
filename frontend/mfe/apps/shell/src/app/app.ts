import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Loading } from '@mfe/http';
import { Notification } from '@mfe/notification-ui';

@Component({
  imports: [RouterModule, Loading, Notification, RouterOutlet],
  selector: 'mfe-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
