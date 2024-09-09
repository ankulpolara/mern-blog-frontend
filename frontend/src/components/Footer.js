import React from 'react';
import { Box, Typography, Link, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#242424',
                color: 'white',
                padding: '2rem 0',
                textAlign: 'center',
                mt: 'auto', // Ensure footer appears after content
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            About Polara's Blog
                        </Typography>
                        <Typography variant="body2">
                            Polara's Blog is a platform where we share insightful articles, tutorials, and resources on various topics including technology, programming, and personal development.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            Home
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            About
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            Contact
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box>
                            <IconButton href="#" color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1">
                        © {new Date().getFullYear()} Polara's Blog. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
