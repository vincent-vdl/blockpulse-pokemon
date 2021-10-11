import { useEffect, useState } from 'react';
import { fetchPokemon } from '../services/requests';

function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const fetchList = async () => {
      const requests = [];
      for (let i = offset; i < offset + 50 && i < 899; i += 1) {
        requests.push(fetchPokemon(i));
      }
      const requestAll = await Promise.all(requests);
      const fmt = requestAll.map((r) => r.data);
      setPokemons((prevPokemons) => ([...prevPokemons, ...fmt]));
      setLoading(false);
    };
    fetchList();
  }, [offset]);

  return { pokemons, loading, setOffset };
}

export default usePokemon;
