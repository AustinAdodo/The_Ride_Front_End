
export const environment = {
  production: true,
  googleMapsApiKey: 'GIVEN_GOOGLE_MAPS_API_KEY',
  mapBoxGlAccessToken: process.env['MAPBOX_GL_ACCESS_TOKEN'] as string,
  baseUri:"https://theridebackend.us.aldryn.io:8080",
  webSocketUrl:'https://theridebackend.us.aldryn.io:8080/ws'
};
