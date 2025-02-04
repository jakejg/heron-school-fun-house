const prompt = require('prompt-sync')();

const rolls = [
  { name: 'Reading (1 points)', points: 1, probability: 0.3 },
  {
    name: 'Watching Sherlock with my mom (5 points)',
    points: 5,
    probability: 0.18,
  },
  { name: 'Coding at Home (5 points)', points: 5, probability: 0.15 },
  {
    name: 'Playing Settelers of Catan (10 points)',
    points: 10,
    probability: 0.05,
  },
  { name: 'FullStack Developer (15 points)', points: 15, probability: 0.03 },
  { name: 'Ember (20 points)', points: 20, probability: 0.07 },
  {
    name: 'Go on a Hike (Tombstone) (10 Points)',
    points: 10,
    probability: 0.05,
  },
  {
    name: 'Pig Out (Lose all turn points)',
    points: 0,
    probability: 0.14,
    pigOut: true,
  },
  {
    name: 'Apocapig (Lose all points)',
    points: 0,
    probability: 0.01,
    apocaPig: true,
  },
  {
    name: 'MicroPig (0.1 Points)',
    points: 0.1,
    probability: 0.02,
  },
];

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

function delayLog(message, delay) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay)
  );
}

async function playGame() {
  let bankedScore = 0;
  let playing = true;

  while (playing) {
    let turnScore = 0;
    let rolling = true;

    while (rolling) {
      let roll = rollPig();

      await delayLog(`You rolled a ${roll.name}`, 1500);

      if (roll.pigOut) {
        turnScore = 0;
        rolling = false;
      } else if (roll.apocaPig) {
        await delayLog('ApocaPig (You lose all banked points) ', 1500);
        bankedScore = 0;
        rolling = false;
      } else {
        turnScore += roll.points;
        let choice = prompt(
          `Banked Points before turn: ${bankedScore} and Pending Turn points: ${turnScore} Do you want to keep rolling (y/n)? `
        );
        if (choice.toLowerCase() !== 'y') {
          bankedScore += turnScore;
          rolling = false;
        }
      }
    }

    await delayLog(`Your banked score is now ${bankedScore}`, 1500);

    let keepPlaying = prompt(
      'Do you want to do your next turn or are you FINISHED?:(y/n) '
    );
    if (keepPlaying.toLowerCase() !== 'y') {
      playing = false;
    }
  }
  await delayLog(`Game over, your final score is: ${bankedScore}`, 1500);
}

playGame();
