// components/SuccessPage.jsx
import { useLocation, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function SuccessPage() {
  const location = useLocation();
  const { amount, type, fund, isAnonymous, name } = location.state || {};
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
        </Box>
        
        <Typography variant="h4" gutterBottom>
          Thank You for Your Donation!
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Your contribution to Masjid e Ahmed has been received and is greatly appreciated.
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 4, py: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Donation Receipt
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, mx: 'auto', px: 3, mb: 1 }}>
            <Typography variant="body1">Amount:</Typography>
            <Typography variant="body1" fontWeight="bold">${amount}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, mx: 'auto', px: 3, mb: 1 }}>
            <Typography variant="body1">Type:</Typography>
            <Typography variant="body1">{type === 'one-time' ? 'One-time donation' : 'Monthly donation'}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, mx: 'auto', px: 3, mb: 1 }}>
            <Typography variant="body1">Fund:</Typography>
            <Typography variant="body1">{fund}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, mx: 'auto', px: 3, mb: 1 }}>
            <Typography variant="body1">Donor:</Typography>
            <Typography variant="body1">{isAnonymous ? 'Anonymous' : name}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, mx: 'auto', px: 3, mb: 1 }}>
            <Typography variant="body1">Date:</Typography>
            <Typography variant="body1">{new Date().toLocaleDateString()}</Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          A confirmation email has been sent to your provided email address.
        </Typography>
        
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary" 
          size="large"
        >
          Return to Homepage
        </Button>
      </Paper>
    </Container>
  );
}

export default SuccessPage;