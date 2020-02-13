import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UvIndexPage } from './uv-index.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: UvIndexPage }])],
  declarations: [UvIndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UvIndexPageModule {}
