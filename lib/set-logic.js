'use strict'

function loadDeck(data) {
  var deck = "["
  var index = new Number
  var card = {
    shape : new String,
    color : new String,
    fill : new String,
    number : new String
  }

  for (let i = 0; i < data.shapes.length; i++) {
    for (let ii = 0; ii < data.colors.length; ii++) {
      for (let iii = 0; iii < data.fills.length; iii++) {
        for (let iv = 0; iv < data.numbers.length; iv++) {
          card.shape = data.shapes[i]
          card.color = data.colors[ii]
          card.fill = data.fills[iii]
          card.number = data.numbers[iv]
          card.status = "in_deck"
          //console.log(card)
          deck += (JSON.stringify(card) + ",")
        }
      }
    }
  }
  deck = deck.slice(0,deck.length-1)
  deck += "]"
  return deck
}

function setTable(int, deck) {
  var results = new Array
  for (let i = 0; i < int; i++) {
    //results.push(Math.random() * )
  }
}

var attributes = {
  shapes: ["diamond", "oblong", "curve"],
  colors: ["purple", "green", "red"],
  fills: ["none", "solid", "crosshatch"],
  numbers: ["1","2","3"]
}
var setGame = new Object
setGame.deck = JSON.parse(loadDeck(attributes))
setGame.setRecord = new Object
setGame.state = function () {
  var result = new Object
  var keys = new Array
  for (let i = 0; i < this.deck.length; i++) {
    keys = Object.keys(result)
    if (keys.indexOf(this.deck[i].status) != -1) {
      result[this.deck[i].status].push(this.deck[i])
    } else {
      result[this.deck[i].status] = new Array
      result[this.deck[i].status].push(this.deck[i])
    }
  }
  return result
}
setGame.setTable = function (int) {
  var state = this.state()
  var result = null
  if (state.in_deck.length) {
    result = new Array
    for (let i = 0; i < int; i++) {
      console.log(Math.floor(Math.random() * state.in_deck.length))
      result.push(state.in_deck[Math.floor(Math.random() * state.in_deck.length)])
    }
  }
  return result
}
var startGame = setGame.setTable(12)
