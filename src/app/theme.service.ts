import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#455363',
  'background-color': '#1f2935',
  'text-color': '#fff',
  'card-color': 'rgba(119, 119, 153, 0.712)',
  'border-color': '#fff',
  'selecedRouter-color': '#6954c5',
  'hover-color': '#0fa7ee',
};

export const lightTheme = {
  'primary-color': '#7579e7',
  'background-color': '#fff',
  'text-color': '#2d2d2d',
  'card-color': 'rgba(208, 208, 231, 0.712)',
  'border-color': '#000',
  'selecedRouter-color': '#7e3fe480',
  'hover-color': '#fff',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleLight() {
    this.setTheme(lightTheme);
  }

  private setTheme(theme:any= {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}