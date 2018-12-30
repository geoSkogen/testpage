'use strict'

function loadDeck(data) {
  //currently belongs to the anonymous global 'referee' object
  //note: this will make a set deck from and with properly formatted data.
  //I know there is a way to make a totally data agnostic--also random--set,
  //I just haven't figured out how to write it yet.
  var deck = "["
  var index = 0
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
          card.id = index
          deck += (JSON.stringify(card) + ",")
          index++
        }
      }
    }
  }
  deck = deck.slice(0,deck.length-1)
  deck += "]"

  return deck
}
//currently belongs to the anonymous global 'referee' object
function isSet(card1, card2, card3) {
  var card1keys = Object.keys(card1)
  var card2keys = Object.keys(card2)
  var card3keys = Object.keys(card3)
  var results = new Array
  var count = 0
  var result = false
  for (let i = 0; i < card1keys.length; i++) {
    if
      ( //if no two attributes match . . .
        (
          (card1[card1keys[i]] != card2[card2keys[i]]) &&
          (card1[card1keys[i]] != card3[card3keys[i]]) &&
          (card2[card2keys[i]] != card3[card3keys[i]])
        ) ||
        ( //. . . or all three match
          (card1[card1keys[i]] === card2[card2keys[i]]) &&
          (card1[card1keys[i]] === card3[card3keys[i]]) &&
          (card2[card2keys[i]] === card3[card3keys[i]])
        )
      )
      {
       results[i] = true
      }
  }
  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      count++
    }
  }
  result = (count === 4) ? true : false

  return result
}

//this is the entire set deck hash
var attributes = {
  shapes: ["t", "e", "s"],
  colors: ["purple", "green", "red"],
  fills: ["none", "b", "i"],
  numbers: ["1","2","3"]
}
//the global objects
var setGame = new Object
var setSession = new Object
var setDOM = new Object
var assembly = new Object
var app = new Object
var table_area = new Number
//setGame - the cards and basic play flow
setGame.deck = JSON.parse(loadDeck(attributes))
//sorts which cards are in play, in the deck, or in a set
//returns an associative array with keynames as lists of cards by status
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
//regulates the number of cards in play at once - currently no limits -
//will find what's in play and add-on what's needed - i.e., pre-filter this.
setGame.setTable = function (int) {
  var state = this.state()
  var result = setSession.interval ? state.in_play : new Array
  var new_index = new Number
  if (state.in_deck.length) {
    for (let i = 0; i < int; i++) {
      state = this.state()
      new_index = Math.floor(Math.random() * state.in_deck.length)
      result.push(state.in_deck[new_index])
      this.deck[state.in_deck[new_index].id].status = "in_play"
    }
  }
  this.state()
  return result
}
//setTable by 3s
setGame.replaceSet = function (int) {
  var result = this.setTable(int*3)
  return result
}
//does what is sounds like it says it does
setGame.getCardById = function (int) {
  for (let i = 0; i < setGame.deck.length; i++) {
    if (setGame.deck[i].id === int.toString()) {
      return setGame.deck[i]
    }
  }
}
//session controls players, scoring, and records sets
setSession.players = new Array
//does what is sounds like it says it does
setSession.addPlayer = function (str) {
  var player = {
    name : str,
    id : this.players.length
  }
  this.players.push(player)
}
//will keep track of sets accumulated per player per game
setSession.setRecord = new Object
setSession.interval = 0
//transforms each set card's data-object into HTMl elements
//returns them as an indexed array
setDOM.assemble = function (deck) {
  var elm = new Object
  var style_elm = new Object
  var text = new String
  var text_node = new Object
  var elements = new Array
  for (let i = 0; i < deck.length; i++) {
    text = new String
    elm = document.createElement("div")
    for (let ii = 0; ii < Number(deck[i].number); ii++) {
      text += deck[i].shape + " "
    }
    if (deck[i].fill != "none") {
      style_elm = document.createElement(deck[i].fill)
      text_node = document.createTextNode(text)
      style_elm.appendChild(text_node)
      elm.appendChild(style_elm)
    } else {
      text_node = document.createTextNode(text)
      elm.appendChild(text_node)
    }
    elm.id = deck[i].id
    elm.style.color = deck[i].color
    elm.className = "setCard"
    elements.push(elm)
  }
  return elements
}
//starts the game - articulates DOM with the game object
setDOM.set = function (elms, app, area) {
    /*
    //for example, this would print the entire set deck
    for (let i = 0; i < elms.length; i++) {
      app.appendChild(elms[i])
    }
    */
    var  display_tiles = new Array
    var data_table = setGame.setTable(area)
    for (let i = 0; i < data_table.length; i++) {
      display_tiles.push(elms[data_table[i].id])
      app.appendChild(display_tiles[i])
    }
}
//gloabl objects:
//1)data model -
assembly = setDOM.assemble(setGame.deck)
//2)view -
app = document.getElementById("app")
//3)user/controller -
table_area = 12
//turn the key - 'set' the setDOM
setDOM.set(assembly, app, table_area)

/*
//set-test test; change data in cards to test the test
var card1 = {
  shape : "diamond",
  color : "purple",
  fill : "none",
  number : "2"
}

var card2 = {
  shape : "diamond",
  color : "red",
  fill : "none",
  number : "2"
}

var card3 = {
  shape : "diamond",
  color : "green",
  fill : "none",
  number : "2"
}

var setTest = isSet(card1, card2, card3)
console.log(setTest)
*/
