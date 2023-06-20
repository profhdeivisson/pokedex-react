import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PokemonCard({id, name, image, types}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, backgroundSize: 'contain' }}
        image={image}
        title={name}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
        Nº: {id}
        </Typography>
        <Typography gutterBottom fontSize="1rem" component="div" sx={{ fontWeight: 'bold' }}>
          {name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">{types}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
