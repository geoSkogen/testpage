'use strict'

var geo_sys = {
  ip: geoplugin_request(),
  city: geoplugin_city(),
  state: geoplugin_region(),
  country: geoplugin_countryName(),
  lat: geoplugin_latitude(),
  long: geoplugin_longitude()
}
var this_div = {}
var text_node = {}
var keys = Object.keys(geo_sys)
keys.forEach( (e) => {
  this_div = document.querySelector('#' +  e )
  text_node = geo_sys[e]
  this_div.querySelector('.geo-text').innerHTML = text_node
})
