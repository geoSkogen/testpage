'use strict'

window.addEventListener("load", initForcePhone)

function initForcePhone() {

  function standardizePhoneDisplay(numbers) {
    var counter = 0
    var incrementor = 2
    var result = ["("]
    result[4] = ")"
    result[5] = " "
    result[9] = "-"
    for (let i = 0; i < 10; i++) {
      if  (i != 0 && i % 3 === 0) {
        counter+=incrementor
        incrementor--
      }
      counter++
      result[counter] = numbers[i] ? numbers[i] : "x"
    }
    return result.join('')
  }

  function validateNumData(input_str) {
    //accepts a string of mixed input and returns an array of up to 10 numbers
    var result = new Array
    var test_arr = new Array
    test_arr = input_str.split('')
    for (let i = 0; i < test_arr.length; i++) {
      if ((Number(test_arr[i]) || test_arr[i] === "0") && (result.length < 10)) {
        console.log("found valid digit")
        result.push(test_arr[i])
      }
    }
    return result
  }

  function findPhoneDisplayPos(num_arr) {
    var result = new Number
    if (num_arr.length < 4) {
      result = 1
    } else if (num_arr.length >= 4 &&  num_arr.length < 7) {
      result = 3
    } else if (num_arr.length >=7 &&  num_arr.length < 11) {
      result = 4
    }
    return ( result + num_arr.length )
  }

  var phone_input = document.getElementById("yourPhone")
  var valid_input = new String
  var num_input = new Array
  var pos = new Number
  var standard_input = standardizePhoneDisplay(num_input)

  phone_input.addEventListener("focus", function () {
    pos = findPhoneDisplayPos(num_input)
    if (this.setSelectionRange) {
      this.setSelectionRange(pos,pos)
    }
  })
  phone_input.addEventListener("input", function () {
    //get anything in the input field and remove all but numbers
    num_input = validateNumData(phone_input.value)
    standard_input = standardizePhoneDisplay(num_input)
    phone_input.value = standard_input
    pos = findPhoneDisplayPos(num_input)
    if (this.setSelectionRange) {
      this.setSelectionRange(pos,pos)
    }
  })
  phone_input.value = standard_input
}
