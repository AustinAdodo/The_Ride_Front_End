//environment.ts (development) //npm install dotenv //"build": "dotenv -e .env.prod -- ng build --prod",
export const environment = {
  production: false,
  mapBoxGlAccessToken: process.env["MAPBOX_GL_ACCESS_TOKEN"] as string || '',
  googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"] as string || '',
  baseUri: "http://localhost:8080",
  webSocketUrl: 'http://localhost:8080/ws'
  // mapBoxGlAccessToken: process.env['MAPBOX_GL_ACCESS_TOKEN'] as string,
};

