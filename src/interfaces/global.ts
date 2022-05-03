const DailyWeather = {
    "dt": 1650708000,
    "sunrise": 1650682958,
    "sunset": 1650733372,
    "moonrise": 1650672120,
    "moonset": 1650701940,
    "moon_phase": 0.75,
    "temp": {
        "day": 20.12,
        "min": 9.34,
        "max": 21.87,
        "night": 11.58,
        "eve": 14.59,
        "morn": 9.38
    },
    "feels_like": {
        "day": 19.39,
        "night": 11.2,
        "eve": 14.17,
        "morn": 6.07
    },
    "pressure": 1005,
    "humidity": 46,
    "dew_point": 7.87,
    "wind_speed": 8.97,
    "wind_deg": 164,
    "wind_gust": 16.36,
    "weather": [
        {
            "id": 502,
            "main": "Rain",
            "description": "heavy intensity rain",
            "icon": "10d"
        }
    ],
    "clouds": 34,
    "pop": 1,
    "rain": 10.28,
    "uvi": 4.8
}

const location = {
  "id": 2643743,
  "name": "London",
  "coord": {
    "lat": 51.5085,
      "lon": -0.1257
  },
  "main": {
  "temp": 283.49,
    "feels_like": 282.09,
    "temp_min": 282.01,
    "temp_max": 284.53,
    "pressure": 1031,
    "humidity": 58
  },
  "dt": 1651255798,
  "wind": {
    "speed": 3.6,
    "deg": 40
  },
  "sys": {
  "country": "GB"
  },
    "rain": null,
  "snow": null,
  "clouds": {
    "all": 100
},
    "weather": [
    {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
    }
]
}
export type ILocation = typeof location;
export type IDailyWeather = typeof DailyWeather;