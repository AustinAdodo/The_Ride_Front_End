// environment.prod.ts (production)
export const environment = {
  production: true,
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  mapBoxGlAccessToken: process.env['MAPBOX_GL_ACCESS_TOKEN'] as string,
  baseUri:"http://localhost:8080",
  webSocketUrl:'http://localhost:8080/ws'
};


