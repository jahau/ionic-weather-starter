import { Component } from '@angular/core';

import { IconMapService, WeatherService } from '@app/services';
import { Weather } from '@app/models';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({ message: 'Getting Current Weather' });
    await loading.present();
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      loading.dismiss();
    });
  }
}
