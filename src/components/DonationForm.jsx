// components/DonationForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton, TextField,
  Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel,
  Checkbox, Divider, Paper
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LockIcon from '@mui/icons-material/Lock';

function DonationForm() {
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [fundDestination, setFundDestination] = useState('general');
  
  const handlePresetAmount = (event, newAmount) => {
    if (newAmount !== null) {
      setDonationAmount(newAmount);
      setCustomAmount('');
    }
  };
  
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount('custom');
  };
  
  const handleDonationTypeChange = (event) => {
    setDonationType(event.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the final amount
    const amount = donationAmount === 'custom' ? customAmount : donationAmount;
    
    if (!amount || (donationAmount === 'custom' && (!customAmount || parseFloat(customAmount) <= 0))) {
      alert('Please select a valid donation amount');
      return;
    }
    
    // Redirect to the Stripe checkout page
    navigate(`/checkout/${amount}/${donationType}?anonymous=${isAnonymous}&fund=${fundDestination}`);
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 'medium' }}>
            Select Fund
          </FormLabel>
          <RadioGroup
            aria-label="fund-destination"
            name="fund-destination"
            value={fundDestination}
            onChange={(e) => setFundDestination(e.target.value)}
            sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
          >
            <Paper 
              variant="outlined" 
              sx={{ 
                flex: '1 0 45%', 
                minWidth: '120px',
                p: 1.5,
                borderColor: fundDestination === 'general' ? 'primary.main' : 'grey.300',
                bgcolor: fundDestination === 'general' ? 'primary.light' : 'transparent',
                '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <FormControlLabel
                value="general"
                control={<Radio color="primary" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HomeIcon color="primary" />
                    <Typography>General Fund</Typography>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
            <Paper 
              variant="outlined" 
              sx={{ 
                flex: '1 0 45%', 
                minWidth: '120px',
                p: 1.5,
                borderColor: fundDestination === 'community' ? 'primary.main' : 'grey.300',
                bgcolor: fundDestination === 'community' ? 'primary.light' : 'transparent',
                '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <FormControlLabel
                value="community"
                control={<Radio color="primary" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon color="primary" />
                    <Typography>Community Programs</Typography>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
            <Paper 
              variant="outlined" 
              sx={{ 
                flex: '1 0 45%', 
                minWidth: '120px',
                p: 1.5,
                borderColor: fundDestination === 'education' ? 'primary.main' : 'grey.300',
                bgcolor: fundDestination === 'education' ? 'primary.light' : 'transparent',
                '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <FormControlLabel
                value="education"
                control={<Radio color="primary" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon color="primary" />
                    <Typography>Islamic Education</Typography>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
            <Paper 
              variant="outlined" 
              sx={{ 
                flex: '1 0 45%', 
                minWidth: '120px',
                p: 1.5,
                borderColor: fundDestination === 'building' ? 'primary.main' : 'grey.300',
                bgcolor: fundDestination === 'building' ? 'primary.light' : 'transparent',
                '&:hover': { borderColor: 'primary.main' }
              }}
            >
              <FormControlLabel
                value="building"
                control={<Radio color="primary" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MonetizationOnIcon color="primary" />
                    <Typography>Building Fund</Typography>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
          </RadioGroup>
        </FormControl>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Select Amount
        </Typography>
        
        <ToggleButtonGroup
          value={donationAmount}
          exclusive
          onChange={handlePresetAmount}
          aria-label="donation amount"
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            mb: 2,
            '& .MuiToggleButton-root': {
              flex: '1 0 30%',
              m: 0.5
            }
          }}
        >
          <ToggleButton value="10" aria-label="$10">$10</ToggleButton>
          <ToggleButton value="25" aria-label="$25">$25</ToggleButton>
          <ToggleButton value="50" aria-label="$50">$50</ToggleButton>
          <ToggleButton value="100" aria-label="$100">$100</ToggleButton>
          <ToggleButton value="250" aria-label="$250">$250</ToggleButton>
          <ToggleButton value="500" aria-label="$500">$500</ToggleButton>
        </ToggleButtonGroup>
        
        <TextField
          fullWidth
          label="Custom Amount ($)"
          variant="outlined"
          type="number"
          value={customAmount}
          onChange={handleCustomAmountChange}
          InputProps={{ inputProps: { min: 1 } }}
          sx={{ mb: 2 }}
        />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Donation Type
        </Typography>
        
        <RadioGroup
          row
          aria-label="donation-type"
          name="donation-type"
          value={donationType}
          onChange={handleDonationTypeChange}
        >
          <FormControlLabel value="one-time" control={<Radio />} label="One-time" />
          <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
        </RadioGroup>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={isAnonymous} 
              onChange={(e) => setIsAnonymous(e.target.checked)} 
            />
          }
          label="Make my donation anonymous"
        />
      </Box>
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ py: 1.5, fontSize: '1.1rem' }}
      >
        {donationType === 'one-time' ? 'Donate Now' : 'Start Monthly Donation'}
      </Button>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <LockIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          Secure payment via Stripe
        </Typography>
      </Box>
    </Box>
  );
}

export default DonationForm;