import { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PrayerTimes from './components/PrayerTimes';
import DonationForm from './components/DonationForm';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckoutForm from './components/CheckoutForm';
import SuccessPage from './components/SuccessPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Programs from './components/Programs';
import Events from './components/Events';
import DonatePage from './components/DonatePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e5631', // Deep green color for Islamic theme
    },
    secondary: {
      main: '#d3a625', // Gold accent
    },
    background: {
      default: '#f8f8f8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [location, setLocation] = useState({ lat: 29.6196, lng: -95.2067 }); // Default: Houston TX area
  
  useEffect(() => {
    // Get user location for more accurate prayer times
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className="app-container" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Routes>
            <Route path="/" element={
              <Box component="main" sx={{ flex: 1, pb: 4 }}>
                <Box className="hero-section" sx={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/mosque.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  textAlign: 'center',
                  py: 8,
                  px: 2,
                  mb: 4
                }}>
                  <Typography variant="h2" component="h1" gutterBottom>
                    Masjid e Ahmed
                  </Typography>
                  <Typography variant="h5" sx={{ maxWidth: 600, mx: 'auto' }}>
                    8346 Almeds Genoa Rd, Houston, TX 77075, US
                  </Typography>
                </Box>
                
                <Container maxWidth="lg">
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ flex: 1, maxWidth: 600, minWidth: 300, p: 3, mx: 'auto' }}>
                      <Typography variant="h4" align="center" gutterBottom color="primary">
                        Prayer Times
                      </Typography>
                      <PrayerTimes location={location} />
                    </Paper>
                  </Box>
                </Container>
              </Box>
            } />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/checkout/:amount/:type" element={<CheckoutForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;