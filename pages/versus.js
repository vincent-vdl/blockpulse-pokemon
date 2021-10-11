import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPokemon } from '../src/services/requests';
import { moveSubset, battle } from '../src/services/battle';

function Versus({ player, computer }) {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const { logs } = battle(player, computer);
    setMoves(logs);
  }, [computer, player]);

  return (
    <div>
      <h2>
        {Object.values(player).map((p) => p.name).join(', ')}
        {' '}
        VS
        {' '}
        {Object.values(computer).map((p) => p.name).join(', ')}
      </h2>
      <ul>{moves.map((move) => <li key={move}>{move}</li>)}</ul>
    </div>
  );
}

Versus.propTypes = {
  player: PropTypes.object,
  computer: PropTypes.object,
};

export async function getServerSideProps({ query }) {
  if (!query) {
    return {
      redirect: '/',
    };
  }
  const player = await Promise.all(query.player.split('-').map((id) => fetchPokemon(id)));
  const computer = await Promise.all(query.computer.split('-').map((id) => fetchPokemon(id)));

  const playerMoves = await Promise.all(player.map((p) => moveSubset(p.data)));
  const computerMoves = await Promise.all(computer.map((p) => moveSubset(p.data)));

  const playerPokemons = player.reduce((acc, cur, i) => ({
    ...acc,
    [cur.data.id]: {
      ...cur.data,
      health: 400,
      attacks: playerMoves[i],
    },
  }), {});
  const computerPokemons = computer.reduce((acc, cur, i) => ({
    ...acc,
    [cur.data.id]: {
      ...cur.data,
      health: 400,
      attacks: computerMoves[i],
    },
  }), {});

  return {
    props: {
      player: playerPokemons,
      computer: computerPokemons,
    },
  };
}

export default Versus;
