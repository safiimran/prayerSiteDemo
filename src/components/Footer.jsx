// components/Footer.jsx
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Link, Divider, 
  TextField, Button, IconButton, Paper 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', mt: 6, pt: 6, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Masjid e Ahmed
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Serving the Houston Muslim community with prayer services, educational programs, and community outreach.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                8346 Almeds Genoa Rd, Houston, TX 77075, US
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                (123) 456-7890
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1 }} fontSize="small" />
              <Typography variant="body2">
                info@masjideahmed.org
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/" color="inherit" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/programs" color="inherit" sx={{ mb: 1 }}>
                Programs
              </Link>
              <Link component={RouterLink} to="/events" color="inherit" sx={{ mb: 1 }}>
                Events
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" sx={{ mb: 1 }}>
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Stay Connected
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Subscribe to our newsletter
              </Typography>
              <Paper 
                component="form" 
                sx={{ 
                  p: '2px 4px', 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'white'
                }}
              >
                <TextField
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Your email address"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
                <Button type="submit" variant="contained" sx={{ borderRadius: '0 4px 4px 0' }}>
                  Subscribe
                </Button>
              </Paper>
            </Box>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              Follow us on social media:
            </Typography>
            <Box>
              <IconButton 
                color="inherit" 
                aria-label="Facebook" 
                component="a" 
                href="#"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Twitter" 
                component="a" 
                href="#"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Instagram" 
                component="a" 
                href="#"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="YouTube" 
                component="a" 
                href="#"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
        
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {currentYear} Masjid e Ahmed. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;