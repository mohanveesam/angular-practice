import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  imports: [SharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private dialog : MatDialog, private cs: CommonService){

  }
  displayedColumns: string[] = ['fullname', 'username', 'userrole', 'actions'];

  getAllUsers() {
    this.cs.getAll('users').subscribe((res: any) => {
      // this.users = res;
      this.users = new MatTableDataSource(res);
      this.users.paginator = this.paginator;
      
    });
  }
  ngOnInit() {
    this.getAllUsers();
  }

  openForm(data: any = null): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: {
      mode: data ? 'E' : 'A',   // 'E' for Edit, 'A' for Add
      user: data || null
    }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllUsers();
    });
  }
  
  deleteUser(id: string): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.cs.delete('users', id).subscribe({
      next: (res) => {
        console.log('Delete successful:', res);
        this.getAllUsers(); // Refresh the list
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete employee.');
      }
    });
  }
  }

  // ngAfterViewInit() {
  //   this.users.paginator = this.paginator;  // ✅ Attach paginator after view init
  // }


}
