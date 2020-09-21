import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../app.component';
import { LandFileListComponent } from './land-file-list/land-file-list.component';
import { LandFileComponent } from './land-file/land-file.component';
import { AddLandFileComponent } from './add-land-file/add-land-file.component';
import { AddMinuteFileComponent } from './add-minute-file/add-minute-file.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    LandFileListComponent,
    LandFileComponent,
    AddLandFileComponent,
    AddMinuteFileComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    /* material */
    MatToolbarModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
})
export class PagesModule {}
