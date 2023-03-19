const chooseButtons = document.querySelectorAll("[data-button]");

const OPTIONS = [
  {
    name: "rock",
    logo: document.getElementById("rock"),
    beats: "scissor",
  },
  {
    name: "paper",
    logo: document.getElementById("paper"),
    beats: "rock",
  },
  {
    name: "scissor",
    logo: document.getElementById("scissor"),
    beats: "paper",
  },
];

// LOCAL STORAGE
var userScore = localStorage.getItem("User") || 0;
document.getElementById("you").innerText = userScore;
var compScore = localStorage.getItem("Computer") || 0;
document.getElementById("computer").innerText = compScore;

// sounds
var winner = new Audio('confetti.mp3');
var loser = new Audio('lose.mp3');
var draw = new Audio('draw.mp3');


function openRules() {
  document.getElementById("parent").innerHTML = `
  <div class="instructions">
            <h3 class="games">GAME RULES</h3><br>
            <ul class="list">
              <li>
                <text class="p1"> </text>Rock beats scissors, scissors beat paper, and paper beats rock.
              </li>
              <br />
              <li>
                <text class="p2"> </text>Agree ahead of time whether you’ll count off “rock, paper,
                scissors, shoot” or just “rock, paper, scissors.”
              </li>
              <br />
              <li>
                <text class="p3"> </text>Use rock, paper, scissors to settle minor decisions or simply
                play to pass the time
              </li>
              <br />
              <li>
                <text class="p4"> </text>If both players lay down the same hand, each player lays down
                another hand
              </li>
            </ul>
            <button class="close" onclick="closeRules()">
              <img src="X.png" />
            </button>
          </div>`;
}


function playAgain() {
  document.getElementById("node").innerHTML = `
  <div class="buttons">
          <button class="button" id="rock" data-button="rock" onclick="makeselection(0)">
            <img src="rock.png" />
          </button>
          <button class="button" id="scissor" data-button="scissor" onclick="makeselection(2)">
            <img src="scissor.png" />
          </button>
          <button class="button" id="paper" data-button="paper" onclick="makeselection(1)">
            <img src="paper.png" />
          </button>
          <img class="line1" src="line1.png" />
          <img class="line2" src="line2.png" />
          <img class="line3" src="line3.png" />
        </div>
        <div class="parent" id="parent">
        <div class="instructions">
        <h3 class="games">GAME RULES</h3><br>
        <ul class="list">
          <li>
            <text class="p1"> </text>Rock beats scissors, scissors beat paper, and paper beats rock.
          </li>
          <br />
          <li>
            <text class="p2"> </text>Agree ahead of time whether you’ll count off “rock, paper,
            scissors, shoot” or just “rock, paper, scissors.”
          </li>
          <br />
          <li>
            <text class="p3"> </text>Use rock, paper, scissors to settle minor decisions or simply
            play to pass the time
          </li>
          <br />
          <li>
            <text class="p4"> </text>If both players lay down the same hand, each player lays down
            another hand
          </li>
        </ul>
        <button class="close" onclick="closeRules()">
          <img src="X.png" />
        </button>
      </div>
        <button class="resultrule" onclick="openRules()">RULES</button>`;
}

function closeRules() {
  document.getElementById("parent").innerHTML = "";
}



chooseButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.button;
    const select = OPTIONS.find((button) => button.name === selectionName);
    makeselection(select);
  });
});


// making selections
function makeselection(button) {
  const user = OPTIONS[button].name;
  const compSelection = randomSelection();
  const computer = compSelection.name;

  // console.log(user);
  // console.log(computer);

  if (computer === user) {
    // DRAW!!!
    document.getElementById("node").innerHTML = `<div class="result">
  <div class="circle1">
    <div class="big" style="background-color: #8cc461;">
      <div class="mid" style="background-color: #8cc461;">
        <div class="small" style="background-color: #8cc461;">
          <button class="" id="userChoice">
            <img src="" id="img1" />
        </div>
      </div>
    </div>
    
      <h3 class="t1">You Picked</h3>
  </div>
  <div class="middle">
    <text class="tie" >TIE UP</text><br/>
    <br/>
    <button class="again" onclick="playAgain()" >REPLAY</button>
  </div>
  <div class="circle2">
    <div class="big1" style="background-color: #8cc461;">
      <div class="mid1" style="background-color: #8cc461;">
        <div class="small1" style="background-color: #8cc461;">
          <button class="" id="compChoice">
            <img src="" id="img2" />
            <h3 class="t2">PC Picked</h3>
        </div>
      </div>
  </div>
  <button class="rule1" onclick="openRules()">RULES</button>
</div>`;
    document.getElementById("userChoice").setAttribute("class", "win" + user);

    document.getElementById("img1").setAttribute("src", user + ".png");
    document.getElementById("compChoice")
      .setAttribute("class", "win" + computer);
    document.getElementById("img2").setAttribute("src", computer + ".png");
    draw.play();
  } else {
    if (isWinner(OPTIONS[button], compSelection)) {
      //user wins

      document.getElementById("node").innerHTML = `
        <div class="result">
          <div class="circle1">
            <div class="big">
              <div class="mid">
                <div class="small">
                  <button class="" id="userChoice">
                    <img src="" id="img1"/>
                </div>
              </div>
            </div>
            
              <h3 class="t1">You Picked</h3>
          </div>
          <div class="middle">
            <text class="t3" >YOU WON</text><br/>
            <text class="t4">AGAINST PC</text><br/>
            <button class="again" onclick="playAgain()" >PLAY AGAIN</button>
          </div>
          <div class="circle2">
            <button class="" id="compChoice">
              <img src="" id="img2"/>
              <h3 class="t2">PC Picked</h3>
          </div>
          <button class="newrule" onclick="openRules()">RULES</button>
          <a href="win.html"><button class="next" >NEXT</button></a>
        </div>`;
      document.getElementById("userChoice").setAttribute("class", "win" + user);

      document.getElementById("img1").setAttribute("src", user + ".png");
      document.getElementById("compChoice")
        .setAttribute("class", "lose" + computer);
      document.getElementById("img2").setAttribute("src", computer + ".png");
      userScore++;
      localStorage.setItem("User", `${userScore}`);
      document.getElementById("you").innerText = `${userScore}`;
      winner.play();
    } else {
      //computer wins

      document.getElementById("node").innerHTML = `
        <div class="result">
          <div class="circle1">
            <button class="" id="userChoice">
              <img src="" id="img1"/>
              <h3 class="t1">You Picked</h3>
          </div>
          <div class="middle">
            <text class="t3" >YOU LOST</text><br/>
            <text class="t4">AGAINST PC</text><br/>
            <button class="again" onclick="playAgain()" >PLAY AGAIN</button>
          </div>
          <div class="circle2">
            <div class="big1">
              <div class="mid1">
                <div class="small1">
                  <button class="" id= "compChoice">
                    <img src="" id="img2"/>
                    <h3 class="t2">PC Picked</h3>
                </div>
              </div>
          </div>
          <button class="rule1" onclick="openRules()">RULES</button>
        </div>`;
      document.getElementById("userChoice")
        .setAttribute("class", "lose" + user);
      document.getElementById("img1").setAttribute("src", user + ".png");
      document.getElementById("compChoice")
        .setAttribute("class", "win" + computer);
      document.getElementById("img2").setAttribute("src", computer + ".png");
      compScore++;
      localStorage.setItem("Computer", `${compScore}`);
      console.log(compScore);
      document.getElementById("computer").innerText = `${compScore}`;
      loser.play();
    }
  }
}

// determining winner
function isWinner(button, compButton) {
  return button.beats === compButton.name;
}

// computer selection
function randomSelection() {
  const randomNum = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[randomNum];
}



// win.html
function openButton() {
  document.getElementById("header").innerHTML = `
  <div class="pictures">
        <img class="star1" src="star1.png" />
        <img class="star2" src="star2.png" />
        <img class="star3" src="star3.png" />
        <img class="star4" src="star4.png" />
        <img class="star5" src="star5.png" />
        <img class="star6" src="star6.png" />
        <img class="star7" src="star7.png" />
        <img class="star9" src="star9.png" />
        <img class="trophy" src="trophy.png" />
      </div>
      <div class="text">
        <h2 class="hurray">HURRAY!!</h2>
        <br />
        <h3 class="won">YOU WON THE GAME</h3>
      </div>
      <button class="play">Play Again</button>
      <button class="rule" onclick="openButton()">RULES</button>
      <div class="inst">
        <h3 class="gmes">GAME RULES</h3>
          <div><ul class="lst">
        <li>
          Rock beats scissors, scissors beat paper, and paper beats rock.
        </li>
        <br />
        <li>
          Agree ahead of time whether you’ll count off “rock, paper,
          scissors, shoot” or just “rock, paper, scissors.”
        </li>
        <br />
        <li>
          Use rock, paper, scissors to settle minor decisions or simply play
          to pass the time
        </li>
        <br />
        <li>
          If both players lay down the same hand, each player lays down
          another hand
        </li>
      </ul><button class="closing" onclick="closeButton()">
        <img src="X.png" />
      </button>
      </div> `;
}
function closeButton() {
  document.getElementById("inst").innerHTML = "";
}
function resetGame() {
  localStorage.setItem("Computer", "0");
  localStorage.setItem("User", "0");
  
}
