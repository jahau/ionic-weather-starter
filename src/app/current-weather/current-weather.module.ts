import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentWeatherPage } from './current-weather.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CurrentWeatherPage }])
  ],
  declarations: [CurrentWeatherPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurrentWeatherPageModule {}
