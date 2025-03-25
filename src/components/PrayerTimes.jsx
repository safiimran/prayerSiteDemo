// components/PrayerTimes.jsx
import { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Box, CircularProgress, Alert, Typography, Divider
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {  addDays, differenceInSeconds } from 'date-fns';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Sun rise and set animation
const riseSet = keyframes`
  0% { transform: translateY(20px) scale(0.8); opacity: 0.3; }
  50% { transform: translateY(0) scale(1.2); opacity: 1; }
  100% { transform: translateY(20px) scale(0.8); opacity: 0.3; }
`;

// Rotation animation for the sun
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Stars twinkle animation
const twinkle = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 1; }
  100% { opacity: 0.1; }
`;

// Styled components for the animations
const SkyBackground = styled(Box)(({ theme, timeOfDay }) => {

  let bgGradient;
  
  if (timeOfDay === 'dawn') {
    bgGradient = 'linear-gradient(to bottom, #141e30, #243b55, #f7797d)';
  } else if (timeOfDay === 'day') {
    bgGradient = 'linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)';
  } else if (timeOfDay === 'dusk') {
    bgGradient = 'linear-gradient(to bottom, #ff7e5f, #feb47b, #7b4397)';
  } else {
    bgGradient = 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
  }
  
  return {
    background: bgGradient,
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    height: '150px',
    width: '100%',
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
    transition: 'background 1s ease',
  };
});

const Sun = styled(WbSunnyIcon)(({ position }) => ({
  position: 'absolute',
  color: '#FDB813',
  fontSize: '40px',
  left: position.x,
  bottom: position.y,
  animation: `${riseSet} 3s infinite alternate, ${rotateAnimation} 10s linear infinite`,
}));

const Moon = styled(NightsStayIcon)(() => ({
  position: 'absolute',
  color: 'white',
  fontSize: '30px',
  right: '15%',
  top: '20%',
}));

const Star = styled(Box)(({ delay, size, top, left }) => ({
  position: 'absolute',
  backgroundColor: 'white',
  width: size,
  height: size,
  borderRadius: '50%',
  top: top,
  left: left,
  animation: `${twinkle} ${2 + delay}s infinite`,
  animationDelay: `${delay}s`,
}));

const Timer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const ProgressBar = styled(Box)(({ theme, progress }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: `${progress}%`,
  height: '4px',
  backgroundColor: theme.palette.secondary.main,
  transition: 'width 1s linear',
}));

function PrayerTimes({ location }) {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [nextPrayer, setNextPrayer] = useState({name: '', time: null});
  const [countdown, setCountdown] = useState({hours: 0, minutes: 0, seconds: 0});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Determine time of day based on current hour
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 7) {
      setTimeOfDay('dawn');
    } else if (hour >= 7 && hour < 17) {
      setTimeOfDay('day');
    } else if (hour >= 17 && hour < 19) {
      setTimeOfDay('dusk');
    } else {
      setTimeOfDay('night');
    }
    
    // Calculate countdown if we have prayer times
    if (prayerTimes) {
      const current = currentTime;
      const prayers = [
        { name: 'Fajr', time: parsePrayerTime(prayerTimes.Fajr, current) },
        { name: 'Sunrise', time: parsePrayerTime(prayerTimes.Sunrise, current) },
        { name: 'Dhuhr', time: parsePrayerTime(prayerTimes.Dhuhr, current) },
        { name: 'Asr', time: parsePrayerTime(prayerTimes.Asr, current) },
        { name: 'Maghrib', time: parsePrayerTime(prayerTimes.Maghrib, current) },
        { name: 'Isha', time: parsePrayerTime(prayerTimes.Isha, current) },
        // Add next day's Fajr
        { name: 'Fajr (Tomorrow)', time: parsePrayerTime(prayerTimes.Fajr, addDays(current, 1)) }
      ];
      
      // Find the next prayer
      const next = prayers.find(prayer => prayer.time > current) || prayers[0];
      setNextPrayer(next);
      
      // Calculate time difference
      const diffSeconds = differenceInSeconds(next.time, current);
      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = diffSeconds % 60;
      setCountdown({ hours, minutes, seconds });
      
      // Calculate progress percentage
      const previousPrayerIdx = prayers.findIndex(prayer => prayer.name === next.name) - 1;
      const previousPrayer = previousPrayerIdx >= 0 ? prayers[previousPrayerIdx] : prayers[prayers.length - 2];
      
      if (previousPrayer && previousPrayer.time) {
        const totalInterval = differenceInSeconds(next.time, previousPrayer.time);
        const elapsedInterval = differenceInSeconds(current, previousPrayer.time);
        const newProgress = (elapsedInterval / totalInterval) * 100;
        setProgress(Math.min(Math.max(newProgress, 0), 100));
      }
    }
  }, [currentTime, prayerTimes]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        // Using the Aladhan API to fetch prayer times
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${location.lat}&longitude=${location.lng}&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        setPrayerTimes(data.data.timings);
        setError(null);
      } catch (err) {
        setError('Failed to load prayer times. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [location, date]);

  // Helper to parse prayer time string into Date object
  const parsePrayerTime = (timeStr, baseDate) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(baseDate);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}:00`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <Star 
          key={i}
          delay={Math.random() * 2} 
          size={size} 
          top={`${Math.random() * 80}%`} 
          left={`${Math.random() * 100}%`}
        />
      );
    }
    return stars;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </Box>
      </LocalizationProvider>
      
      <SkyBackground timeOfDay={timeOfDay}>
        {timeOfDay === 'day' && (
          <Sun position={{ x: '70%', y: '60%' }} />
        )}
        {timeOfDay === 'dawn' && (
          <Sun position={{ x: '20%', y: '10%' }} />
        )}
        {timeOfDay === 'dusk' && (
          <Sun position={{ x: '80%', y: '10%' }} />
        )}
        {(timeOfDay === 'night' || timeOfDay === 'dawn') && (
          <>
            <Moon />
            {generateStars(20)}
          </>
        )}
        <Typography 
          variant="h6" 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: 10, 
            color: 'white',
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
          }}
        >
          {currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})}
        </Typography>
      </SkyBackground>
      
      {nextPrayer.name && (
        <Timer>
          <Typography variant="h6">
            Next Prayer: {nextPrayer.name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
            {countdown.hours.toString().padStart(2, '0')}:
            {countdown.minutes.toString().padStart(2, '0')}:
            {countdown.seconds.toString().padStart(2, '0')}
          </Typography>
          <Typography variant="body2">
            {nextPrayer.time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Typography>
          <ProgressBar progress={progress} />
        </Timer>
      )}
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      
      {prayerTimes && !loading && (
        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="prayer times table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Prayer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Fajr' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Fajr' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Brightness4Icon sx={{ mr: 1, fontSize: 20 }} />
                    Fajr
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Fajr' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Fajr)}
                </TableCell>
              </TableRow>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Sunrise' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Sunrise' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WbSunnyIcon sx={{ mr: 1, fontSize: 20, color: '#FDB813' }} />
                    Sunrise
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Sunrise' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Sunrise)}
                </TableCell>
              </TableRow>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Dhuhr' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Dhuhr' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Brightness7Icon sx={{ mr: 1, fontSize: 20, color: '#FDB813' }} />
                    Dhuhr
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Dhuhr' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Dhuhr)}
                </TableCell>
              </TableRow>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Asr' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Asr' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Brightness7Icon sx={{ mr: 1, fontSize: 20, color: '#F2CB61' }} />
                    Asr
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Asr' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Asr)}
                </TableCell>
              </TableRow>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Maghrib' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Maghrib' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Brightness4Icon sx={{ mr: 1, fontSize: 20, color: '#F28C61' }} />
                    Maghrib
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Maghrib' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Maghrib)}
                </TableCell>
              </TableRow>
              <TableRow 
                sx={{ bgcolor: nextPrayer.name === 'Isha' ? 'primary.main' : 'inherit' }}
              >
                <TableCell sx={{ color: nextPrayer.name === 'Isha' ? 'white' : 'inherit' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NightsStayIcon sx={{ mr: 1, fontSize: 20 }} />
                    Isha
                  </Box>
                </TableCell>
                <TableCell sx={{ color: nextPrayer.name === 'Isha' ? 'white' : 'inherit' }}>
                  {formatTime(prayerTimes.Isha)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default PrayerTimes;