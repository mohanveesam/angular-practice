import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  fullname: string | null = '';
  role: number | null = null;
  user_id: string | null = '';
  profileImage: string = 'profileimg.png';

  constructor(
    private router: Router,
    private cs: CommonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadProfile();

    window.addEventListener('storage', () => {
      this.loadUser();
    });
  }

  loadUser() {
    this.fullname = localStorage.getItem('fullname');
    this.role = Number(localStorage.getItem('role'));
    this.user_id = localStorage.getItem('id');

    const imageUrl = localStorage.getItem('imageUrl');
    this.profileImage = imageUrl
      ? `http://localhost:5204${imageUrl}`
      : 'profileimg.png';
  }

  loadProfile() {
    if (!this.user_id) return;

    this.cs.getById('employee', this.user_id)
      .subscribe((emp: Employee | null) => {
        if (emp?.imageUrl) {
          this.profileImage = `http://localhost:5204${emp.imageUrl}`;
        }
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  openProfile() {
    if (!this.user_id) return;

    this.cs.getById('employee', this.user_id).subscribe(emp => {
      this.dialog.open(ProfileComponent, {
        width: '450px',
        data: emp,
      }).afterClosed().subscribe(updated => {
        if (updated?.imageUrl) {
          localStorage.setItem('imageUrl', updated.imageUrl);
          this.profileImage = `http://localhost:5204${updated.imageUrl}`;
        }
      });
    });
  }
  
}
