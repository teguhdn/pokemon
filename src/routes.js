import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const PokemonList = Loadable({
  loader: () => import('./modules/pokemonData'),
  render(loaded, props) { let PokemonList = loaded.PokemonList; return <PokemonList {...props}/>; },
  loading: Loading,
});
const PokemonDetail = Loadable({
  loader: () => import('./modules/pokemonData'),
  render(loaded, props) { let PokemonDetail = loaded.PokemonDetail; return <PokemonDetail {...props}/>; },
  loading: Loading,
});
const MyPokemonList = Loadable({
  loader: () => import('./modules/myPokemon'),
  render(loaded, props) { let MyPokemonList = loaded.MyPokemonList; return <MyPokemonList {...props}/>; },
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { id:"POKEMON_DETAIL", path: '/pokemon-data/:id', component: MovieDataDetail  },
  { id:"DASHBOARD", path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { id:"POKEMON", path: '/pokemon-data', name: 'Pokemon', component: PokemonList },
  { id:"POKEMON_DETAIL", path: '/pokemon-detail/:id', name: 'Pokemon Detail', component: PokemonDetail  },
  { id:"MY_POKEMON", path: '/my-pokemon', name: 'My Pokemon', component: MyPokemonList },
];

export default routes;
