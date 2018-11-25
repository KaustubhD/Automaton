/*  ***------- Variables -------***  */


let screenWidth = window.innerWidth
let screenHeight = window.innerHeight
let cellDimension = 12
let ruleNo = '110'

let rules = [[1,1,1], [1,0,0], [0,1,0], [0,0,1]] // 110

document.documentElement.style.setProperty('--dim', `${cellDimension}px`)
let cellsInRow = Math.floor(screenWidth / cellDimension)
let numRows = Math.floor(screenHeight / cellDimension)

let container = document.querySelector('div.container')
let firstRow = document.querySelector('div.row')
let cell = null


/*  ***------- Variables end-------***  */


// -----Start for first row
function makeFirstRow(){
  firstRow = document.querySelector('div.row')
  for(let i = 0; i < cellsInRow; i++){
    cell = document.createElement('div')
    firstRow.appendChild(cell)
  }
  randomiseRow(firstRow)
    // To be used with first row only
  
}
function randomiseRow(rowElement){
  let x = null
  for(let i = 0; i < firstRow.childNodes.length; i++){
    x = firstRow.childNodes[i]
    x.classList.add(Math.random() <= 0.5 ? 'active' : 'inactive')
  }
}

// -----Ending for first row


function duplicateRow(){
  let allRows = document.querySelectorAll('.row')
  let newRow = allRows[0].cloneNode(true)
  container.appendChild(newRow)
  operateOnNewRow(newRow, allRows[allRows.length - 1])
}

function operateOnNewRow(currentRow, prevRow){
  let currentChildren = currentRow.childNodes
  let prevChildren = prevRow.childNodes
  for(let cell = 0; cell < currentChildren.length; cell++){
    let prev = prevChildren[cell]
    let prevLeft = prevChildren[cell].previousElementSibling || prevChildren[prevChildren.length - 1]
    let prevRight = prevChildren[cell].nextElementSibling || prevChildren[0]

    currentChildren[cell].className = ''
    changeChildState(currentChildren[cell], prevLeft, prev, prevRight, rules)
    if(currentChildren[cell].classList.length == 0){
      currentChildren[cell].classList.add('inactive')
  }
  }
}

function changeChildState(current, prevLeft, prev, prevRight, rulesArray){
  for(rule of rules){
    if(isActive(prevLeft) == rule[0] && isActive(prev) == rule[1] && isActive(prevRight) == rule[2]){
      current.classList.add('active')
    }
  }
}

function isActive(element){
  return element.classList.contains('active') ? 1 : 0
}

function resetAllRows(){
  let parent = document.querySelector('div.container')
  while(parent.firstChild){
    parent.removeChild(parent.firstChild)
  }
  parent.innerHTML = '<div class="row"></div>'
}

function makeRule(ruleNo){
  let binary = parseInt(ruleNo).toString(2).split('')
  console.log('Binary ' + binary)
  console.log('New 7 digit array' + new Array(8 - binary.length).fill('0'))
  binary = [...new Array(8 - binary.length).fill('0'), ...binary]
  console.log(binary)
  rules = binary.map((el, ind) => {
    if(el == '1'){
      el = (7 - ind).toString(2)
      return '0'.repeat(3 - el.length).concat(el).split('')
    }
  }).filter((el) => {return el})
}

let countIters = 0
function doItWithInterval(){
  countIters = 0
  let a = setInterval(function(){
    duplicateRow()
    countIters++
    if(countIters >= numRows - 1){ clearInterval(a) }
  }, 100)
}

function doItWithoutInterval(){
  resetAllRows()
  ruleNo = document.getElementById('rule').value
  makeRule(ruleNo)
  makeFirstRow()
  console.log('Made first row')
  for(let i = 0; i < numRows; i++){
    duplicateRow()
  }
}


document.addEventListener('keydown', function(event){
  if(event.keyCode == '13'){
    doItWithoutInterval()
  }
}, false)
document.getElementById('click_it').addEventListener('click', function(event){
  doItWithoutInterval()
}, false)