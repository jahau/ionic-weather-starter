import { Component } from '@angular/core';

import { Forecast } from '@app/models';
import { IconMapService, WeatherService } from '@app/services';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(public iconMap: IconMapService, private weather: WeatherService) {}

  ionViewDidEnter() {
    this.weather.forecast().subscribe(f => (this.forecast = f));
  }
}
