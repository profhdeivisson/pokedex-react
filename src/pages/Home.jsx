import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import CustomButton from '../components/CustomButton';

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loadedPokemons, setLoadedPokemons] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  const getPokemons = () => {
    setIsLoading(true); // Inicia o estado de carregamento
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${loadedPokemons}`)
      .then(response => {
        const pokemonEndpoints = response.data.results.map(pokemon => pokemon.url);
        axios.all(pokemonEndpoints.map(endpoint => axios.get(endpoint)))
          .then(response => {
            setPokemons(response);
            setIsLoading(false); // Finaliza o estado de carregamento
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
          });
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
      });
  };

  const pokemonFilter = (name) => {
    if (!name) {
      setFilteredPokemons(pokemons);
    } else {
      const filteredPokemons = pokemons.filter(pokemon => pokemon.data.name.includes(name));
      setFilteredPokemons(filteredPokemons);
    }
  };

  const loadMorePokemons = () => {
    setLoadedPokemons(prevLoadedPokemons => prevLoadedPokemons + 10);
  };

  useEffect(() => {
    getPokemons();
  }, [loadedPokemons]);

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={1}>
          {filteredPokemons.map((pokemon, key) => (
            <Grid item xs={6} sm={3} md={2} key={key}>
              <PokemonCard id={pokemon.data.id} name={pokemon.data.name} image={pokemon.data.sprites.front_default} />
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <CustomButton onClick={loadMorePokemons} loading={isLoading}>
            Carregar Mais
          </CustomButton>
        </Box>
      </Container>
    </div>
  );
};
