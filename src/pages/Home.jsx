import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import CustomButton from '../components/CustomButton';

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loadedPokemons, setLoadedPokemons] = useState(100);
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
        console.log(pokemonEndpoints)
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
    setLoadedPokemons(prevLoadedPokemons => prevLoadedPokemons + 20);
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
              <PokemonCard id={pokemon.data.id} name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types.map((type) => (
            <span
              key={type.type.name}
              style={{
                marginRight: '0.5rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                textTransform: 'uppercase',
                color: '#fff',
                fontWeight: 'bold',
                backgroundColor: getTypeColor(type.type.name),
              }}
            >
              {type.type.name}
            </span>
          ))}/>
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
const getTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case 'normal':
      return 'gray';
    case 'fire':
      return 'orangered';
    case 'fighting':
      return 'red';
    case 'water':
      return '#6890F0';
    case 'flying':
      return 'skyblue';
    case 'grass':
      return 'green';
    case 'poison':
      return 'purple';
    case 'electric':
      return 'goldenrod';
    case 'ground':
      return 'brown';
    case 'psychic':
      return 'deeppink';
    case 'rock':
      return 'dimgray';
    case 'ice':
      return 'lightblue';
    case 'bug':
      return 'green';
    case 'dragon':
      return 'indigo';
    case 'ghost':
      return '#705898';
    case 'dark':
      return 'black';
    case 'steel':
      return 'gray';
    case 'fairy':
      return 'hotpink';
    default:
      return 'black';
  }
};
