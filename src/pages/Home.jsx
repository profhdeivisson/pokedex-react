import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'

export const Home = () => {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        getPokemons()
    });
    const getPokemons = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=50").then((response) => setPokemons(response.data.results)).catch((error) => console.error(error));
    }
    
    return(
        <div>
            <Navbar />
            <Container maxWidth="false">
                <Grid container spacing={1}>
                    {pokemons.map((pokemon) => {
                        <Grid item xs={3}>
                            <PokemonCard />
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}