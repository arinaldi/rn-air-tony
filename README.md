# Air Tony: React Native

Create an application that receives latitude and longitude coordinates through text inputs, and returns the Air Quality of that location using the [Breezometer API](https://breezometer.com/api/).

## Features
* Display a text input for typing in a location, ex: 'Paris, France', The app will request breezometer  API and display air quality info along with some color indicator.
* In case the API responds with an error, the app should display an appropriate message.
* In the same screen, it should also show a list of the last 5 searches and their results.
* Save the state in AsyncStorage. When the user visits the app he should see the same info as he was seeing before exiting the app.