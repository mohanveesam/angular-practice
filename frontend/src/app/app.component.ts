import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,], // 👈 This line is the fix!
  templateUrl: './app.component.html',
})
export class AppComponent {}


// export class AppComponent implements OnInit {
//   title(title: any) {
//     throw new Error('Method not implemented.');
//   }
//   currentModule: string = '';
//   fullname: string | null = '';
//   role: number | null = null;
//   user_id: string | null = '';
//   profileImage: string = 'profileimg.png';

//   constructor(
//     private router: Router,
//     private cs: CommonService,
//     private dialog: MatDialog
//   ) {
//     this.router.events
//       .pipe(filter((event) => event instanceof NavigationEnd))
//       .subscribe((event: any) => {
//         const path = event.urlAfterRedirects.split('/')[1];
//         this.currentModule = path;
//       });
//   }
//   ngOnInit(): void {
//     this.loadUser();
//     this.loadProfile();
//     // 🔑 Listen to storage changes
//     window.addEventListener('storage', () => {
//       this.loadUser();
//     });
//   }

//   loadUser() {
//     this.fullname = localStorage.getItem('fullname');
//     this.role = Number(localStorage.getItem('role'));
//     this.user_id = localStorage.getItem('id');
//     const imageUrl = localStorage.getItem('imageUrl');
//     this.profileImage = imageUrl?`http://localhost:5204${imageUrl}`:'profileimg.png';
//   }
//   loadProfile() {
//     if (!this.user_id) return;
//     this.cs
//       .getById('employee', this.user_id)
//       .subscribe((emp: Employee | null) => {
//         this.profileImage = emp?.imageUrl
//           ? `http://localhost:5204${emp.imageUrl}`
//           : 'profileimg.png';
//       });
//   }

//   isAuthPage(): boolean {
//     const authRoutes = ['/components/login', '/components/reset-password'];
//     return authRoutes.includes(this.router.url);
//   }
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token'); // returns true if token exists
//   }

//   logout() {
//     //localStorage.removeItem('token');
//     localStorage.clear();
//     this.router.navigate(['/components/login']);
//   }

//   openProfile() {
//     if (!this.user_id) {
//       console.error('User ID not found');
//       return;
//     }

//     this.cs.getById('employee', this.user_id).subscribe((emp) => {
//       this.dialog
//         .open(ProfileComponent, {
//           width: '450px',
//           data: emp,
//         })
//         .afterClosed()
//         .subscribe((updated: any) => {
//           // ✅ update immediately after profile save
//           if (updated?.imageUrl) {
//             localStorage.setItem('imageUrl', updated.imageUrl);
//             this.profileImage = `http://localhost:5204${updated.imageUrl}`;
//           }
//         });
//     });
//   }
// }

