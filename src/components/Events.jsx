// components/Events.jsx
import { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Chip, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Events() {
  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Friday Prayer (Jumu'ah)",
      date: "Every Friday",
      time: "1:00 PM - 2:00 PM",
      location: "Main Prayer Hall",
      description: "Weekly congregational prayer with khutbah (sermon) in English and Arabic.",
      category: "Prayer"
    },
    {
      id: 2,
      title: "Ramadan Preparation Workshop",
      date: "April 5, 2025",
      time: "6:30 PM - 8:30 PM",
      location: "Community Hall",
      description: "Learn how to prepare spiritually and practically for the blessed month of Ramadan with practical tips and guidance.",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Community Iftar",
      date: "First day of Ramadan",
      time: "Sunset",
      location: "Community Hall",
      description: "Join us for a community iftar (breaking of the fast) on the first day of Ramadan. All are welcome.",
      category: "Community"
    },
    {
      id: 4,
      title: "Islamic Finance Seminar",
      date: "April 12, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Classroom 2",
      description: "Learn about Islamic principles of finance and investment from an expert in the field.",
      category: "Education"
    },
    {
      id: 5,
      title: "Youth Hangout",
      date: "April 19, 2025",
      time: "5:30 PM - 8:00 PM",
      location: "Youth Center",
      description: "Fun evening of activities, games, and discussions for youth ages 13-18.",
      category: "Youth"
    },
    {
      id: 6,
      title: "Community Cleanup Day",
      date: "April 26, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Meet at Masjid Entrance",
      description: "Join us as we clean up our neighborhood and surrounding areas. Supplies will be provided.",
      category: "Community Service"
    }
  ];

  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Prayer', 'Workshop', 'Community', 'Education', 'Youth', 'Community Service'];
  
  const filteredEvents = filter === 'All' 
    ? upcomingEvents
    : upcomingEvents.filter(event => event.category === filter);

  return (
    <Box component="main">
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/events-header.jpg")',
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
            Events Calendar
          </Typography>
          <Typography variant="h5">
            Stay connected with what's happening at Masjid e Ahmed
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setFilter(category)}
              color={filter === category ? 'primary' : 'default'}
              variant={filter === category ? 'filled' : 'outlined'}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="h2" color="primary" gutterBottom>
                      {event.title}
                    </Typography>
                    <Chip label={event.category} color="secondary" size="small" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Typography variant="body1">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Calendar
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Events;