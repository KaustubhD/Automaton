
let screenWidth = window.innerWidth
let screenHeight = window.innerHeight
let cellDimension = 12
// let ruleNo = '110'

document.documentElement.style.setProperty('--dim', `${cellDimension}px`)
let cellsInRow = Math.floor(screenWidth / cellDimension)
let numRows = Math.floor(screenHeight / cellDimension)

let container = document.querySelector('div.container')
let firstRow = document.querySelector('div.row')
let cell = null

// -----Start for first row
for(let i = 0; i < cellsInRow; i++){
  cell = document.createElement('div')
  firstRow.appendChild(cell)
}
randomiseRow(firstRow)
  // To be used with first row only
function randomiseRow(rowElement){
  let x = null
  for(let i = 0; i < firstRow.childNodes.length; i++){
    x = firstRow.childNodes[i]
    x.classList.add(Math.random() <= 0.5 ? 'active' : 'inactive')
  }
  //   firstRow.childNodes[i].classList.add('inactive')
  // }
  // firstRow.childNodes[firstRow.childNodes.length / 2].classList.remove('inactive')
  // firstRow.childNodes[firstRow.childNodes.length / 2].classList.add('active')
}

// -----Ending for first row


function duplicateRow(){
  let allRows = document.querySelectorAll('.row')
  let newRow = firstRow.cloneNode(true)
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

    // let temp = changeChildState.bind(null, currentChildren[cell], prevLeft, prev, prevRight)
    currentChildren[cell].className = ''
    changeChildState(currentChildren[cell], prevLeft, prev, prevRight)
    if(currentChildren[cell].classList.length == 0){
      currentChildren[cell].classList.add('inactive')
  }
  }
}

// let rules = [[1,1,1], [1,0,0], [0,1,0], [0,0,1]] // 110
let rules = [[1,1,0], [1,0,1], [0,1,1], [0,1,0], [0,0,1]] // 150
function changeChildState(current, prevLeft, prev, prevRight, rule, classNm){

  for(rule of rules){
    if(isActive(prevLeft) == rule[0] && isActive(prev) == rule[1] && isActive(prevRight) == rule[2]){
      current.classList.add('active')
    }
  }

}

function isActive(element){
  return element.classList.contains('active') ? 1 : 0
}

let countIters = 0
// let a = setInterval(function(){
//   duplicateRow()
//   countIters++
//   if(countIters >= numRows - 1){ clearInterval(a) }
// }, 100)
