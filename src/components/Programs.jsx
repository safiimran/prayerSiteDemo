// components/Programs.jsx
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

function Programs() {
  const programs = [
    {
      title: "Quran Memorization",
      description: "Our comprehensive Quran memorization program for children and adults, with qualified instructors guiding students through proper recitation and memorization techniques.",
      image: "/images/quran-program.jpg"
    },
    {
      title: "Islamic Studies",
      description: "Weekly classes covering various aspects of Islamic knowledge, including Fiqh (Islamic jurisprudence), Seerah (biography of the Prophet), and Aqeedah (Islamic creed).",
      image: "/images/islamic-studies.jpg"
    },
    {
      title: "Arabic Language",
      description: "Arabic language courses for beginners to advanced learners, focusing on reading, writing, and conversation skills essential for understanding the Quran and Islamic texts.",
      image: "/images/arabic-class.jpg"
    },
    {
      title: "Youth Programs",
      description: "Engaging activities and educational programs specifically designed for Muslim youth to strengthen their Islamic identity and build a supportive community.",
      image: "/images/youth-program.jpg"
    },
    {
      title: "Sisters' Circle",
      description: "Regular gatherings for women to learn, share experiences, and support each other in a comfortable and welcoming environment.",
      image: "/images/sisters-program.jpg"
    },
    {
      title: "Community Service",
      description: "Opportunities to participate in community service projects, including food drives, neighborhood cleanups, and support for those in need.",
      image: "/images/community-service.jpg"
    }
  ];

  return (
    <Box component="main">
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/program-header.jpg")',
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
            Our Programs
          </Typography>
          <Typography variant="h5">
            Educational and community programs for all ages
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {programs.map((program, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={program.image}
                    alt={program.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" color="primary">
                      {program.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {program.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Programs;