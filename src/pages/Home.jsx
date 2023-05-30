import React, {useEffect, useState} from 'react'
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
        for (let i = 1; i < 50; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        var response = axios.all(endpoints.map(endpoint => axios.get(endpoint))).then((response) => setPokemons(response));
        return response;
        // axios.get("https://pokeapi.co/api/v2/pokemon?limit=50").then((response) => setPokemons(response.data.results)).catch((error) => console.error(error));
    }
    
    return(
        <div>
            <Navbar />
            <Container maxWidth="false">
                <Grid container spacing={1}>
                {pokemons.map((pokemon, key) => {
                    return (
                        <Grid item xs={3} key={key}> 
                        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default}/>
                        </Grid>
                    );
                    })}
                </Grid>
            </Container>
        </div>
    )
}