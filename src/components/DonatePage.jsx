// components/DonatePage.jsx
import { Container, Typography, Box, Paper } from '@mui/material';
import DonationForm from './DonationForm';

function DonatePage() {
  return (
    <Box component="main" sx={{ flex: 1, pb: 4 }}>
      <Box className="hero-section" sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/donate-header.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        py: 8,
        px: 2,
        mb: 4
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Support Masjid e Ahmed
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 600, mx: 'auto' }}>
          Your contribution helps maintain our masjid and support community programs
        </Typography>
      </Box>
      
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Make a Donation
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Your generous donations enable us to maintain our facilities, provide educational programs, and support our community. All contributions are tax-deductible.
          </Typography>
          <DonationForm />
        </Paper>
      </Container>
    </Box>
  );
}

export default DonatePage;