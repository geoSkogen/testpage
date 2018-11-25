'use strict'

var app = document.getElementById("app")
var go = document.getElementById("go")
var field = document.getElementById("arg")
var list_div = document.getElementById("listDiv")


function makeList(val) {
	var ul = document.createElement("ul")
	var li = {}
	var text = {}
	var data = []
  for (let i = 0; i < val; i++) {
  	data.push(i.toString())
    text = document.createTextNode(data[i])
    li = document.createElement("li")
    li.appendChild(text)
    ul.appendChild(li)
  }
  return ul
}
go.addEventListener("click", () => {
  var list = makeList(Number(field.value))
	list_div.appendChild(list)
})
field.addEventListener("keypress", function () {
  if (event.keyCode === 13) {
    var list = makeList(Number(field.value))
  	list_div.appendChild(list)
   }
})
