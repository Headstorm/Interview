import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cactus Emporium';
  navListShown: boolean;
  navButtonText: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.navListShown = false;
    this.navButtonText = "V";
  }

  // Toggles visibility of navigation list.
  toggleListShown() {
    this.navListShown = !this.navListShown;
    if (this.navListShown) {
      this.navButtonText = ">";
    }
    else {
      this.navButtonText = "V";
    }
  }

  // Would be used to navigate between pages of the website if I created multiple pages; just console logs instead as placeholder.
  navigateTo(page: string) {
    console.log("If implemented, would navigate to: ",page);
  }

  // Open the contact-us form.
  openContactDialog(): void {
    const dialogRef = this.dialog.open(ContactUsComponent, {
      width: '500px'
    });

    // Any requested contact-us functionality is taken care of in the ContactUsComponent, so I just added this console.log
    // for the sake of readability and transparency of the runtime behavior.
    dialogRef.afterClosed().subscribe(result => {
      console.log('Thanks for using the contact us form.');
    });
  }
}

