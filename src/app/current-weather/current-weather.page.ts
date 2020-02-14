import { Component } from '@angular/core';

import { IconMapService, WeatherService } from '@app/services';
import { Weather } from '@app/models';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(public iconMap: IconMapService, private weather: WeatherService) {}

  ionViewDidEnter() {
    this.weather.current().subscribe(w => this.currentWeather = w);
  }
}
