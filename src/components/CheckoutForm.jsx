// components/CheckoutForm.jsx
import { useState} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Box, Container, Typography, Button, TextField, Paper,
  CircularProgress, Alert, Grid, Divider
} from '@mui/material';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51O8G86AAMWncDxHvklYQBP4gjhrUBk8VXx4kInP8bJZdKHyRXWE2kW5jt3DKr3VTSrGfPRjXYcIOMvKXO7Zy3ONz00V3QjpgTr');

function StripeCheckoutForm() {
  const { amount, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const searchParams = new URLSearchParams(location.search);
  const isAnonymous = searchParams.get('anonymous') === 'true';
  const fund = searchParams.get('fund') || 'general';
  
  // Map fund IDs to display names
  const fundDisplayNames = {
    general: 'General Masjid Fund',
    community: 'Community Programs',
    education: 'Islamic Education',
    building: 'Building & Maintenance'
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, you would call your backend to create a payment intent
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount, type, fund, isAnonymous, name: isAnonymous ? 'Anonymous' : name, email })
      // });
      // const data = await response.json();
      
      // For demo purposes, we're simulating a successful payment
      // const { clientSecret } = data;
      
      // const result = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: isAnonymous ? 'Anonymous' : name,
      //       email
      //     }
      //   }
      // });
      
      // if (result.error) {
      //   throw new Error(result.error.message);
      // }
      
      // Simulating payment processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page
      navigate('/success', { 
        state: { 
          amount, 
          type, 
          fund: fundDisplayNames[fund], 
          isAnonymous, 
          name: isAnonymous ? 'Anonymous' : name 
        } 
      });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Donation Summary
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Amount:</Typography>
              <Typography variant="body1" fontWeight="bold">${amount}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Type:</Typography>
              <Typography variant="body1">{type === 'one-time' ? 'One-time donation' : 'Monthly donation'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Fund:</Typography>
              <Typography variant="body1">{fundDisplayNames[fund]}</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {!isAnonymous && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Donor Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </>
        )}
        
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Grid>
        
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={!stripe || loading}
            size="large"
            sx={{ py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              `Pay $${amount} ${type === 'monthly' ? 'Monthly' : ''}`
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function CheckoutForm() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Complete Your Donation
        </Typography>
        <Typography variant="body1" align="center" paragraph color="text.secondary">
          Thank you for supporting Masjid e Ahmed
        </Typography>
        
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      </Paper>
    </Container>
  );
}

export default CheckoutForm;