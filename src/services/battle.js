import { fetchMove } from './requests';

export const CONTINUE = 4;
export const PLAYER_WINNER = 2;
export const COMPUTER_WINNER = 3;

function pickMove(pokemon) {
  return pokemon.attacks[Math.floor(Math.random() * pokemon.attacks.length)];
}

function pickAlivePokemon(pokemons) {
  const alives = Object.keys(pokemons).filter((p) => pokemons[p].health > 0);
  if (alives.length === 0) {
    return null;
  }
  return pokemons[alives[Math.floor(Math.random() * alives.length)]];
}

function pvLeft(defender, move) {
  return defender.health - move[1];
}

function logTurn({
  attacker, defender, move, pv,
}) {
  return `${attacker.name} uses ${move[0]} against ${defender.name}, left with ${pv}pv`;
}

export async function moveSubset(pokemon) {
  const moves = await Promise.all(pokemon.moves.map((m) => fetchMove(m.move.url)));
  const powerfullMoves = moves
    .filter((m) => m.data.power !== null)
    .map((m) => ([m.data.name, m.data.power]))
    .slice(0, 4);
  return powerfullMoves;
}

export function battle(player, computer) {
  let pv = 0;
  let move = null;
  let [attacker, defender] = [null, null];

  const logs = [];
  const status = CONTINUE;

  const team1 = { ...player };
  const team2 = { ...computer };

  while (status === CONTINUE) {
    attacker = pickAlivePokemon(team1);
    if (!attacker) {
      return { status: COMPUTER_WINNER, logs: logs.concat(['winner : computer']) };
    }
    defender = pickAlivePokemon(team2);
    if (!defender) {
      return { status: PLAYER_WINNER, logs: logs.concat(['winner : player']) };
    }
    move = pickMove(attacker);
    pv = pvLeft(defender, move);
    team2[defender.id].health = pv;
    logs.push(logTurn({
      attacker, defender, move, pv,
    }));

    attacker = pickAlivePokemon(team2);
    if (!attacker) {
      return { status: PLAYER_WINNER, logs: logs.concat(['winner : player']) };
    }
    defender = pickAlivePokemon(team1);
    if (!defender) {
      return { status: COMPUTER_WINNER, logs: logs.concat(['winner : computer']) };
    }
    move = pickMove(attacker);
    pv = pvLeft(defender, move);
    team1[defender.id].health = pv;
    logs.push(logTurn({
      attacker, defender, move, pv,
    }));
  }
  return null;
}
