import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-menu-item',
  templateUrl: './admin-menu-item.component.html',
  styleUrl: './admin-menu-item.component.scss'
})
export class AdminMenuItemComponent {
  @Input() text: string | undefined
}
