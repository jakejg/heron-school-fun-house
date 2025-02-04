// Pass the Pigs - Single Player (Node.js Version)
let aiScore = 0;
let playerScore = 0;
let move = "player";
const prompt = require('prompt-sync')();

// Possible rolls and their probabilities
const rolls = [
  { name: 'Sider (1 points)', points: 1, probability: 0.3 },
  { name: 'Razorback (5 points)', points: 5, probability: 0.2 },
  { name: 'Trotter (5 points)', points: 5, probability: 0.15 },
  { name: 'Snouter (10 points)', points: 10, probability: 0.1 },
  { name: 'Leaning Jowler (15 points)', points: 15, probability: 0.05 },
  {
    name: 'Pig Out (Lose all turn points)',
    points: 0,
    probability: 0.2,
    pigOut: true,
  },
  {name:"MegaPig (100 points)",points:100,probability:0.000000001},
  {name:"apocapig (lose all points)",points:0,probability:0.02}
];

// Function to randomly select a roll based on probabilities
function rollPig() {
  let random = Math.random();
  let cumulativeProbability = 0;

  for (let roll of rolls) {
    cumulativeProbability += roll.probability;
    if (random < cumulativeProbability) {
      return roll;
    }
  }
}

// Game logic
function playerMove() {
    let rollScore = 0;
    let roll = NaN
    let result = NaN
    while(result != "no"){
        roll = rollPig();
        if(roll["name"] == "Pig Out (Lose all turn points)"){
            move = "ai";
            rollScore = 0;
            break;
        }
        else if(roll["name"] == "apocapig (lose all points)"){
            playerScore = 0;
            break;
        }
        rollScore += roll["points"]
        result = prompt(`would you like to roll again? yes or no: your score this roll is ${rollScore}, your score is ${playerScore}, and you rolled a ${roll["name"]} `);
    if(result == "no"){
        move = "ai";
        playerScore += rollScore;
    }
}}
function aiMove(){
    rollScore = 0;
    roll = NaN;
    while(rollScore >= 15 && !playerScore > 75 && playerScore >= aiScore){
        let roll = rollPig();
        if(roll["name"] == "Pig Out (Lose all turn points)"){
            move = "player";
            rollScore = 0;
            break;
        }
        else if(roll["name"] == "apocapig (lose all points)"){
            aiScore = 0;
            move = "player";
            break;
        }
        console.log(`ai rolled ${roll["name"]}`)
        rollScore += roll["points"];
    }
    if(rollScore >= 15 && !playerScore > 75 && playerScore >= aiScore){
        aiScore += rollScore;
        move = "player";
 }}
while(true){
    if(move === "player"){
        playerMove();
        console.clear();
    }
    else{
        aiMove();
        console.clear();
    }
    if(aiScore || playerScore >= 75){
        if(aiScore >= 75){
            playerMove()
            if(aiScore > playerScore){
                console.log("ai wins!");
                break;
            }else{
                console.log("you win!");
                break;
            }
        }
        else if(playerScore >= 75){
            aiMove()
            if(aiScore > playerScore){
                console.log("ai wins!")
            }
            else{
                console.log("you win!")
                break
            }
        }
    }
    console.log(`the score is ${playerScore} to ${aiScore}`)
}