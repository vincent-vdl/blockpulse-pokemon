import axios from 'axios';

export const BASE_HOST = 'https://pokeapi.co/api/v2';

export function fetchPokemon(id) {
  try {
    return axios.get(`${BASE_HOST}/pokemon/${id}`);
  } catch (err) {
    return null;
  }
}

export function fetchMove(moveURL) {
  try {
    return axios.get(moveURL);
  } catch (err) {
    return 0;
  }
}
