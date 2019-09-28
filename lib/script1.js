<script type="application/javascript">

'use strict'

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
    keys.forEach( (key) => {
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

  //dataLayer.push()
  console.log(my_api_says)
}

getIP({
  postal : 97058,
  city: 'Spaghetti',
  ip : '55.55.555.555'
})
</script>
//<script type="application/javascript"
//        src"https://ipinfo.io/json?token=3cca12309786ac&format=json&callback=getIP">

//</script>
