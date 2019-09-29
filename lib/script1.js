
'use strict'

function format_phone_str(str,format) {
  var result = ''
  var chars = {}
  for (var i = 0; i < 10; i++) {
    chars = {'parenths' : '', 'dashes' : '', 'dots' : ''}
    switch (i) {
      case 0 :
        chars = {'parenths' : '(', 'dashes' : '', 'dots' : ''}
        break
      case 3 :
        chars = {'parenths' : ') ', 'dashes' : '-', 'dots' : '.'}
        break
      case 6 :
        chars = {'parenths' : '-', 'dashes' : '-', 'dots' : '.'}
        break
    }
    result += chars[format]
    result += str[i]
  }
  return result
}

function get_phone_format(swap_target) {
  var result = ''
  var patts = {
    'parenths' : new RegExp(/^\([0-9]{3}\)(\s?\-\s?|\s?)[0-9]{3}(\s?\-\s?|\s?)[0-9]{4}$/),
    'dashes' : new RegExp(/^[0-9]{3}(\s?\-\s?|\s?)[0-9]{3}(\s?\-\s?|\s?)[0-9]{4}$/),
    'dots' : new RegExp(/^[0-9]{3}\s?\.\s?[0-9]{3}\s?\.\s?[0-9]{4}$/)
  }
  var keys = Object.keys(patts)

  keys.forEach( function (key) {
    if ( patts[key].test(swap_target) ) {
      result = key
    }
  })
  return result
}

function get_swap_val (str) {
  var swap_vals = {
    '0987654321' : '7777777777',
    '1234567890' : '8888888888',
    '5555555555' : '6666666666'
  }
  str = str.replace(/\./g,'')
  str = str.replace(/\-/g,'')
  str = str.replace(/\(/g,'')
  str = str.replace(/\)/g,'')
  str = str.replace(/\s/g,'')
  return (swap_vals[str]) ? swap_vals[str] : ''
}

var a_tag = document.getElementById('phone_link')
var swap_target = a_tag.childNodes[0].textContent
var swap_val = get_swap_val(swap_target)
console.log('current swap val is')
console.log(swap_val)
var swap_format = get_phone_format(swap_target)
var phone_text = (Number(swap_val)) ?
  format_phone_str(swap_val,swap_format) : swap_target
console.log('current swap val is')
console.log(swap_val)

a_tag.innerHTML = phone_text
a_tag.href = ("tel:+1" + swap_val)
