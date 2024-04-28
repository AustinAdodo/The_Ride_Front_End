//environment.ts (development) //npm install dotenv //"build": "dotenv -e .env.prod -- ng build --prod",
export const environment = {
  production: false,
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  mapBoxGlAccessToken: "pk.eyJ1IjoiYXVzdGluYWRvZG8iLCJhIjoiY2x2M2p2cjR1MHMyMDJpdDR2MWw2enZpayJ9.guj9Huxf5JKJ4e4iyI553g",
  baseUri: "http://localhost:8080",
  webSocketUrl: 'http://localhost:8080/ws'
  // mapBoxGlAccessToken: process.env['MAPBOX_GL_ACCESS_TOKEN'] as string,
};

