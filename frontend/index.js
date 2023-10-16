// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if(!square.classList.contains('targeted')){
          document.querySelector('.targeted').classList.remove('targeted')
          square.classList.add('targeted')
        }
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    let upb=evt.key===keys.up
    let downb=evt.key===keys.down
    let fneutral=evt.key===keys.right
    let bneutral=evt.key===keys.left
    let finalf=evt.key===keys.space
    let breaktarget=document.querySelector('.targeted')
    if(upb){
      if(breaktarget.parentElement.previousElementSibling){
        let dexter=Array.from(breaktarget.parentElement.children).indexOf(breaktarget)
        breaktarget.classList.remove('targeted')
        breaktarget.parentElement.previousElementSibling.children[dexter].classList.add('targeted')
      }
    }else
    if(downb){
      if(breaktarget.parentElement.nextElementSibling){
        let dexter=Array.from(breaktarget.parentElement.children).indexOf(breaktarget)
        breaktarget.classList.remove('targeted')
        breaktarget.parentElement.nextElementSibling.children[dexter].classList.add('targeted')
      }
    }else
    if(fneutral){
      if(breaktarget.nextElementSibling){
        breaktarget.classList.remove('targeted')
        breaktarget.nextElementSibling.classList.add('targeted')
      }
    }else
    if(bneutral){
      if(breaktarget.previousElementSibling){
        breaktarget.classList.remove('targeted')
        breaktarget.previousElementSibling.classList.add('targeted')
      }
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    else
    if(finalf){
      let squito=breaktarget.firstChild
      if(squito&&squito.dataset.status==='alive'){
        squito.dataset.status='dead'
        squito.parentElement.style.backgroundColor='red'
      }
      let wholives=document.querySelectorAll('[data-status=alive]')
      if(!wholives.length){
        let toki=getTimeElapsed()
        document.querySelector('p.info').textContent=`Extermination completed in ${toki/1000} seconds!`
        let restart=document.createElement('button')
        restart.textContent='Restart'
        restart.addEventListener('click',()=>{
          location.reload()
        })
        document.querySelector('h2').insertAdjacentElement('beforeend',restart)
      }
    }
  
    // 👉 TASK 5 - End the game 👈
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
