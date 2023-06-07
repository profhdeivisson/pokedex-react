import {useEffect, useState} from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'

export const Home = () => {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        getPokemons();
    }, []);
    const getPokemons = () => {
        var endpoints = [];
        for (let i = 1; i <= 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        console.log(endpoints)
        var response = axios.all(endpoints.map(endpoint => axios.get(endpoint))).then((response) => setPokemons(response));
        return response;
        // axios.get("https://pokeapi.co/api/v2/pokemon?limit=50").then((response) => setPokemons(response.data.results)).catch((error) => console.error(error));
    }

    const pokemonFilter = (name) => {
        var filteredPokemons = []
        if(!name){
            getPokemons()
        }
        for(var i in pokemons){
            if(pokemons[i].data.name.includes(name)){
                filteredPokemons.push(pokemons[i])
            }
        }
        // console.log(filteredPokemons)
        setPokemons(filteredPokemons)
    }
    
    return(
        <div>
            <Navbar pokemonFilter={pokemonFilter}/>
            <Container maxWidth="false">
                <Grid container spacing={1}>
                {pokemons.map((pokemon, key) => {
                    return (
                        <Grid item xs={6} sm={3} md={2} key={key}> 
                        <PokemonCard id={pokemon.data.id} name={pokemon.data.name} image={pokemon.data.sprites.front_default}/>
                        </Grid>
                    );
                    })}
                </Grid>
            </Container>
        </div>
    )
}