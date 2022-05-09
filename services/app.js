var world;
var pacman;
var ghost;
var ghost_2;
var ghost_3;
var ghost_4;
var myMusic;
var ghosts;
var UP;
var DOWN;
var LEFT;
var RIGHT;
var game_time;
var food_num;
var user_online;
var flag = 1;

//SCORE
var score = 0 ;
resetGame();

//DISPLAY WORLD
function displayWorld(){
  var output = '';
  for(var i=0; i<world.length; i++){
      output += "\n<div class='row'>\n"
      for(var j=0; j<world[i].length; j++){
//            BRICKS
          if(world[i][j] == 0)
              output += "<div class='brick'></div>";
          else if(world[i][j] == 1)
              output += "<div class='brick lefttop'></div>";
          else if(world[i][j] == 2)
              output += "<div class='brick righttop'></div>";
          else if(world[i][j] == 3)
              output += "<div class='brick rightbottom'></div>";
          else if(world[i][j] == 4)
              output += "<div class='brick leftbottom'></div>";
          else if(world[i][j] == 5)
              output += "<div class='brick top'></div>";
          else if(world[i][j] == 6)
              output += "<div class='brick right'></div>";
          else if(world[i][j] == 7)
              output += "<div class='brick bottom'></div>";
          else if(world[i][j] == 8)
              output += "<div class='brick left'></div>";
//            DYNAMIC CONTENT
          else if(world[i][j] == 9)
              output += "<div class='empty'></div>"; 
          else if(world[i][j] == 10) 
              output += "<div class='coin'></div>";
          else if(world[i][j] == 11)
              output += "<div class='cherries'></div>";
      }
      output += "\n</div>"
  }
  $('#world').html(output);
}

//DISPLAY PACMAN
function displayPacman(){
  document.getElementById('pacman').style.left = pacman.x*30+"px";
  document.getElementById('pacman').style.top = pacman.y*30+"px";
}
//DISPLAY GHOST
function displayGhost(ghost){
  document.getElementById(ghost[0]).style.left = ghost[1].x*30+"px";
  document.getElementById(ghost[0]).style.top = ghost[1].y*30+"px";
}

//DISPLAY SCORE
function displayScore(){
  document.getElementById('score').innerHTML = score;
}

//PACMAN MOVEMENT
document.onkeydown = function(e){
//LEFT
  if((e.keyCode == LEFT) && (world[pacman.y][pacman.x-1]==9 || world[pacman.y][pacman.x-1]==10 || world[pacman.y][pacman.x-1]==11)){
      $('#pacman').removeClass('right');
      $('#pacman').removeClass('up');
      $('#pacman').removeClass('down');
      $('#pacman').addClass('left');
      pacman.x --;
  }
//RIGHT
  else if((e.keyCode == RIGHT) && (world[pacman.y][pacman.x+1]==9 || world[pacman.y][pacman.x+1]==10 || world[pacman.y][pacman.x+1]==11)){
      $('#pacman').removeClass('left');
      $('#pacman').removeClass('up');
      $('#pacman').removeClass('down');
      $('#pacman').addClass('right');
      pacman.x ++;
  }
//UP
  else if((e.keyCode == UP) && (world[pacman.y-1][pacman.x]==9 || world[pacman.y-1][pacman.x]==10 || world[pacman.y-1][pacman.x]==11)){
      $('#pacman').removeClass('right');
      $('#pacman').removeClass('up');
      $('#pacman').removeClass('left');
      $('#pacman').addClass('down');
      pacman.y --;
  }
//DOWN
  else if((e.keyCode == DOWN) && (world[pacman.y+1][pacman.x]==9 || world[pacman.y+1][pacman.x]==10 || world[pacman.y+1][pacman.x]==11)){
      $('#pacman').removeClass('right');
      $('#pacman').removeClass('left');
      $('#pacman').removeClass('down');
      $('#pacman').addClass('up');
      pacman.y ++;
  }    
//PACMAN SCORING COINS
  if(world[pacman.y][pacman.x] == 10){
      world[pacman.y][pacman.x] = 9;
      score+=10;
      displayWorld();
      displayScore();
  }
//PACMAN SCORING CHERRIES
  if(world[pacman.y][pacman.x] == 11){
      world[pacman.y][pacman.x] = 9;
      score+=50;
      displayWorld();
      displayScore();
  }
  displayPacman()
  //checkend()
}


//GHOST MOVEMENT
function getRandom() {
  var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  return random;
}

var currentDirection = 1;

function ghostMove(ghost){
  var newDirection = getRandom();
  
//Left Right New Direction
  if(
      //If it's going right or left and up or down is available
      ((currentDirection == 1 || currentDirection == 2) && (world[ghost[1].y+1][ghost[1].x]==9 || world[ghost[1].y+1][ghost[1].x]==10 || world[ghost[1].y+1][ghost[1].x]==11 || world[ghost[1].y+1][ghost[1].x]==12 || world[ghost[1].y-1][ghost[1].x]==9 || world[ghost[1].y-1][ghost[1].x]==10 || world[ghost[1].y-1][ghost[1].x]==11 || world[ghost[1].y-1][ghost[1].x]==12))
      ||
      //Or if it's going up or down and left or right is available
      ((currentDirection == 3 || currentDirection == 4) && (world[ghost[1].y][ghost[1].x+1]==9 || world[ghost[1].y][ghost[1].x+1]==10 || world[ghost[1].y][ghost[1].x+1]==11 || world[ghost[1].y][ghost[1].x+1]==12 || world[ghost[1].y][ghost[1].x-1]==9 || world[ghost[1].y][ghost[1].x-1]==10 || world[ghost[1].y][ghost[1].x-1]==11 || world[ghost[1].y][ghost[1].x-1]==12))
  ){
      //Check to make sure it won't change direction to it's current direction
      while(newDirection == currentDirection){
          newDirection = getRandom();
      }
      //Change direction to a new direction
      currentDirection = newDirection;
  }
  
  if(currentDirection ==  1 && (world[ghost[1].y][ghost[1].x-1]==9 || world[ghost[1].y][ghost[1].x-1]==10 || world[ghost[1].y][ghost[1].x-1]==11 || world[ghost[1].y][ghost[1].x-1]==12)){
      ghost[1].x --;
//        console.log("move left")
  }else if(currentDirection == 2 && (world[ghost[1].y][ghost[1].x+1]==9 || world[ghost[1].y][ghost[1].x+1]==10 || world[ghost[1].y][ghost[1].x+1]==11 || world[ghost[1].y][ghost[1].x+1]==12)){
//        console.log("move right")
      ghost[1].x ++;
  }else if(currentDirection == 3 && (world[ghost[1].y-1][ghost[1].x]==9 || world[ghost[1].y-1][ghost[1].x]==10 || world[ghost[1].y-1][ghost[1].x]==11 || world[ghost[1].y-1][ghost[1].x]==12)){
//        console.log("move up")
      ghost[1].y --;
  }else if(currentDirection == 4 && (world[ghost[1].y+1][ghost[1].x]==9 || world[ghost[1].y+1][ghost[1].x]==10 || world[ghost[1].y+1][ghost[1].x]==11 || world[ghost[1].y+1][ghost[1].x]==12)){
//        console.log("move down")
      ghost[1].y ++;
  }
  displayGhost(ghost);   
}


//CHECK FOR GAME END
function checkend(ghost){
  if((pacman.x == ghost[1].x) && (pacman.y == ghost[1].y)){
      $('#gameover').fadeIn();
  }
}


$(document).ready(function(){
  localStorage.setItem('k', 'k');

})


function startGame() {
  resetGame();
  displayWorld();
  displayPacman();
  ghosts.forEach(element => {
      displayGhost(element);
  });
  displayScore();
  
  //myMusic = "music/OnlyMP3.to - Pacman Dubstep Remix-v2a5yMUmcp0-192k-1644089325462.mp3";
  //myMusic.play();

  //GHOST REFRESH
  if (flag == 1) { // need to fix this
    flag = 0
    ghosts.forEach(element => {
      setInterval(ghostMove, 500, element)
    });

    //CHECKEND
    ghosts.forEach(element => {
      setInterval(checkend, 10, element)
    });
  }
}


function check() {
    let user_input_username = document.getElementById("login_name").value;
    let user_input_password = document.getElementById("login_password").value;
		let localstorage_password = localStorage.getItem(user_input_username);

		if(localstorage_password == null) {
			alert('username not exist.');
		}
		else if(localstorage_password == user_input_password) {
      user_online = user_input_username

      //document.getElementById('tab2').type = 'radio';
      document.getElementById('play_button').style.verticalAlign = 'middle';
      document.getElementById('play_button').style.display = 'block';
      
			alert('You are logged in.');
		}
    else {
      alert('worng password.');
    }

}

function stringContainsNumber(_string) {
  return /\d/.test(_string);
}

function register() {
  let user_input_username = document.getElementById("username").value;
  let user_input_password = document.getElementById("password").value;
  let localstorage_password = localStorage.getItem(user_input_username);

  if (stringContainsNumber(user_input_username))
  {
    alert('username must contain letters only');
  }

  else if(localstorage_password !== null) {
    alert('username already exist.');
  }
  else {
    localStorage.setItem(user_input_username, user_input_password);
    alert('You have registered successfully.');
  }
}


function configuratons() { 
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
}


function setUp(event){
  UP = event.keyCode;
  document.getElementById('up').value = event.key;
};

function setDown(event){
  DOWN = event.keyCode;
  document.getElementById('down').value = event.key;
};


function setLeft(event){
  LEFT = event.keyCode;
  document.getElementById('left').value = event.key;
};


function setRight(event){
  RIGHT = event.keyCode;
  document.getElementById('right').value = event.key;
};


function checkConfigurations(){
  let numFood = document.getElementById("food_num").value;
  let numTime = document.getElementById("time").value;
  let numGhosts = document.getElementById("num_of_ghosts").value;


  if(numFood > 90 || numFood < 50 || numFood == null) {
    alert("Number of food must be between 50-90"); 
  }

  else if(numTime < 60) {
    alert("minimun game time is 60 seconds");
  }

  else if(numGhosts < 1 || numGhosts > 4) {
    alert("Number of ghosts must be between 1-4");
  }

  else {
    food_num = numFood
    game_time = numTime
    setGhosts(numGhosts);
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";
    startGame();
  }

};


function setGhosts(num) {
  if (num==1) {
    ghosts = [['ghost', ghost]]
  }

  else if(num==2) {
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2]]
  }

  else if (num==3){
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2], ['ghost_3', ghost_3]]
  }

  else if(num==4) {
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2], ['ghost_3', ghost_3], ['ghost_4', ghost_4]]
  }
}




function checkUser() {
  if (user_online == null) {
    alert("Please login before playing")
  }
  else {
    document.getElementById('tab2').type = 'radio';
    configuratons();
  }
}



function resetGame() {
  //WORLD
  world = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
    [0, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0 ],
    [0, 10,1, 0, 6, 9, 8, 0, 6, 10,5, 10,8, 0, 6, 9, 8, 0, 2, 10,0 ],
    [0, 10,7, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,7, 10,0 ],
    [0, 10,9, 11,8, 0, 0, 0, 6, 9 ,0, 10,8, 0, 0, 0, 6, 11,9, 10,0 ],
    [0, 10,5, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,5, 10,0 ],
    [0, 10,4, 0, 6, 9, 8, 0, 6, 10,0, 10,8, 0, 6, 9, 8, 0, 3, 10,0 ],
    [0, 10,10,10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,10,10,0 ],
    [0, 10,1, 0, 6, 9, 8, 0, 6, 10,0, 10,8, 0, 6, 9, 8, 0, 2, 10,0 ],
    [0, 10,7, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,7, 10,0 ],
    [0, 10,9, 11,8, 0, 0, 0, 6, 10,0, 10,8, 0, 0, 0, 6, 11,9, 10,0 ],
    [0, 10,5, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,5, 10,0 ],
    [0, 10,4, 0, 6, 9, 8, 0, 6, 10,7, 10,8, 0, 6, 9, 8, 0, 3, 10,0 ],
    [0, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0 ],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3 ]
  ]

  //PACMAN
  pacman = {
    x: 9,
    y: 4
  }

  ghost = {
    x: 19,
    y: 13
  }

  ghost_2 = {
    x: 1,
    y: 13
  }

  ghost_3 = {
    x: 19,
    y: 1
  }

  ghost_4 = {
    x: 1,
    y: 1
  }
}



