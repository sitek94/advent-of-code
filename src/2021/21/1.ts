import { run } from '../../runner';

function solve(input: string) {
  let [pos1, pos2] = input.split('\n').map(l => Number(l.split(': ')[1]));

  const roll = deterministicDice();
  const DEBUG = false;

  type Player = {
    name: string;
    pos: number;
    score: number;
  };

  const players: [Player, Player] = [
    { name: '1', pos: pos1, score: 0 },
    { name: '2', pos: pos2, score: 0 },
  ];

  function move(player: Player) {
    for (let i = 0; i < 3; i++) {
      let value = roll();

      let newPos = (player.pos + value) % 10;
      if (newPos === 0) {
        newPos = 10;
      }

      if (DEBUG) {
        console.log(`P${player.name} rolls ${value} and goes to ${newPos}`);
      }

      player.pos = newPos;
    }
    player.score += player.pos;
    if (DEBUG) {
      console.log(`P${player.name} has ${player.score} points`);
    }
  }
  function getWinner() {
    while (true) {
      for (let player of players) {
        move(player);
        if (player.score >= 1000) {
          console.log(`P${player.name} wins with ${player.score} points`);
          return player;
        }
      }
    }
  }

  let winner = getWinner();
  let otherPlayer = players.find(p => p !== winner);

  let numberOfRolls = roll() - 1;
  let ans = otherPlayer.score * numberOfRolls;

  return ans;
}

function deterministicDice() {
  let last = 1;
  return () => last++;
}

run({
  solve,
  tests: [
    {
      input: `
        Player 1 starting position: 4
        Player 2 starting position: 8
      `,
      expected: 739785,
    },
  ],
  // onlyTests: true,
});
