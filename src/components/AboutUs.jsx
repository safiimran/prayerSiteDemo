// components/AboutUs.jsx
import { Container, Typography, Box, Grid, Paper, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

function AboutUs() {
  return (
    <Box component="main">
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/mosque-interior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        py: 8,
        px: 2,
        mb: 6
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            About Masjid e Ahmed
          </Typography>
          <Typography variant="h5">
            Serving the Houston Muslim community since 1995
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom color="primary">
              Our History
            </Typography>
            <Typography variant="body1" paragraph>
              Masjid e Ahmed was established in 1995 by a group of dedicated Muslims who recognized the need for a place of worship and community gathering in the southeast Houston area. What began as a small prayer space in a converted house has grown into a vibrant Islamic center that serves hundreds of families.
            </Typography>
            <Typography variant="body1" paragraph>
              Over the years, our community has expanded both in numbers and in the services we provide. In 2005, we completed construction on our current building, which includes a spacious prayer hall, classrooms for Islamic education, a community hall, and administrative offices.
            </Typography>
            <Typography variant="body1">
              Today, Masjid e Ahmed continues to grow and evolve to meet the needs of our diverse community while staying true to our founding principles of faith, education, and service.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="/images/mosque-building.jpg"
              alt="Masjid e Ahmed building"
              sx={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 4 }} />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom color="primary" align="center">
              Our Mission & Values
            </Typography>
            <Typography variant="body1" paragraph align="center" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
              At Masjid e Ahmed, we are dedicated to creating a welcoming space where Muslims can worship, learn, and build community together. Our mission is guided by the principles of the Quran and the Sunnah of Prophet Muhammad (peace be upon him).
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <HomeIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Worship
              </Typography>
              <Typography variant="body2">
                Providing a dedicated space for prayer and spiritual reflection, welcoming Muslims from all backgrounds.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <SchoolIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Education
              </Typography>
              <Typography variant="body2">
                Offering comprehensive Islamic education for all ages, from Quran memorization to Islamic studies.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <PeopleIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Community
              </Typography>
              <Typography variant="body2">
                Building a strong, inclusive community through regular gatherings, celebrations, and support services.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <VolunteerActivismIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Service
              </Typography>
              <Typography variant="body2">
                Extending our mission beyond our walls through community service, charity, and outreach programs.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutUs;