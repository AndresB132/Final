// src/components/Home.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Contenedor principal con texto e imagen */}
            <div className="text-image-container">
                {/* Contenido de texto */}
                <div className="text-content">
                    <Typography variant="h3" gutterBottom>
                    Reciclar para un futuro mejor
                    </Typography>

                    <Typography variant="h5" sx={{ mt: 2 }}>
                        ¡Reciclar es responsabilidad de todos!
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
                    Cada día generamos una gran cantidad de residuos,
                     y es fundamental tomar conciencia sobre la importancia del reciclaje para proteger nuestro medio ambiente y reducir la contaminación.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Al reciclar, no solo ayudamos a conservar recursos naturales, sino que también evitamos que
                        materiales peligrosos lleguen a nuestros vertederos. ¡Hagamos nuestra parte!
                    </Typography>

                    {/* Botón de llamada a la acción */}
                    <Button
                        variant="contained"
                        component={Link}
                        to="/puntos-recoleccion"
                        sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Comienza a Reciclar
                    </Button>
                </div>

                {/* Contenido de imagen */}
                <div className="image-content">
                    <img
                        src="https://www.pactoglobal-colombia.org/images/jch-optimize/ng/images_NoticiasHome_2023_PORTS__e5e35.webp"
                        alt="Reciclaje"
                        style={{ display: 'block', maxWidth: '100%', height: '100%' }}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Home;  