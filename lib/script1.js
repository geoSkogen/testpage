
  'use strict'
/*
  function getIP(json) {

    var fallback = 'Portland'
    var local_zips = {
      'Hermiston' : [
        97875,
        97838,
        99346
      ],
      'TheDalles' : [
        97058,
        97031,
        97040
      ]
    }

    function key_lookup_by_item_index(item, assoc_arr, fallback) {
      var result = fallback
      var keys = Object.keys(assoc_arr)
      keys.forEach( function (key) {
        if (assoc_arr[key].indexOf(item) > -1 ) {
          result = key
        }
      })
      return result
    }

    var branch = key_lookup_by_item_index(json.postal, local_zips, fallback)

    var my_api_says = {
      'ipEvent' : 'ipEvent',
       ipPostal : json.postal,
       ipCity : json.city,
       ipAddress : json.ip,
       swapTarget : branch
    }

    dataLayer.push(my_api_says)
    console.log(my_api_says)
  }
  //fake API callback
  getIP({
    postal : 97040,
    city: 'Spaghetti',
    ip : '55.55.555.555'
  })
*/
