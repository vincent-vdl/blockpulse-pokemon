import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import usePokemon from '../src/lib/usePokemon';
import MainLayout from '../src/layouts/MainLayout';
import ResultLayout from '../src/layouts/ResultLayout';

const GRID_MODE = 'GRID';
const LIST_MODE = 'LIST';

function Home() {
  const [mode, setMode] = useState(LIST_MODE);
  const [team, setTeam] = useState([]);
  const [isVersus, setIsVersus] = useState(false);
  const { pokemons, loading, setOffset } = usePokemon();

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 50);
  };

  const handleModeToggle = (event) => {
    setMode(event.target.value);
  };

  const handleVersusToggle = (id) => {
    if (team.includes(id)) {
      setTeam((prevTeam) => prevTeam.filter((v) => v !== id));
    } else {
      setTeam((prevTeam) => ([...prevTeam, id]));
    }
  };

  const handleVersus = () => {
    const ids = Object.values(pokemons).map((p) => p.id);

    const computerTeam = [
      ids[Math.floor(Math.random() * ids.length)],
      ids[Math.floor(Math.random() * ids.length)],
      ids[Math.floor(Math.random() * ids.length)],
    ].join('-');
    const playerTeam = team.join('-');
    window.open(`/versus?player=${playerTeam}&computer=${computerTeam}`, '_blank');
  };

  useEffect(() => {
    setIsVersus(team.length === 3);
  }, [team]);

  return (
    <MainLayout>
      <div>
        <input type="radio" id="grid" name="mode" value={GRID_MODE} checked={GRID_MODE === mode} onChange={handleModeToggle} />
        Grille
        <input type="radio" id="list" name="mode" value={LIST_MODE} checked={LIST_MODE === mode} onChange={handleModeToggle} />
        Liste
      </div>
      <button type="button" disabled={!isVersus} onClick={handleVersus}>VERSUS</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <InfiniteScroll
          dataLength={pokemons.length}
          next={handleNext}
          hasMore
          loader={<p>Loading...</p>}
        >
          <ResultLayout mode={mode} data={pokemons} onToggle={handleVersusToggle} selected={team} />
        </InfiniteScroll>
      )}
    </MainLayout>
  );
}

export default Home;
