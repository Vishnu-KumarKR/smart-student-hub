import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Container, Paper, Typography, TextField, Button,
  InputAdornment, IconButton, Checkbox, FormControlLabel,
  CircularProgress, Link, Fade, Grow
} from '@mui/material';
import { 
  Visibility, VisibilityOff, 
  EmailOutlined as EmailIcon, 
  LockOutlined as LockIcon,
  LoginOutlined as LoginIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoadingLocal(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'radial-gradient(circle at 50% 50%, #6366f1 0%, #4f46e5 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }
      }}
    >
      {/* Decorative Blur Orbs */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(99, 102, 241, 0.4)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(244, 63, 94, 0.3)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Grow in={true} timeout={800}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 6, 
              bgcolor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Box 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: 'primary.main', 
                  borderRadius: 3, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                }}
              >
                <LoginIcon sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography variant="h4" component="h1" gutterBottom color="text.primary">
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Securely sign in to your SmartHub account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      color="primary" 
                    />
                  }
                  label={<Typography variant="body2" sx={{ color: 'text.secondary' }}>Remember me</Typography>}
                />
                <Link 
                  component={RouterLink} 
                  to="/forgot-password" 
                  variant="body2" 
                  sx={{ 
                    color: 'primary.main', 
                    textDecoration: 'none', 
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loadingLocal}
                sx={{ 
                  py: 1.8, 
                  fontSize: '1rem', 
                  boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                {loadingLocal ? <CircularProgress size={26} color="inherit" /> : 'Sign In to Dashboard'}
              </Button>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 700, 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Create an account
                </Link>
              </Typography>
            </Box>

            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Test Credentials: admin@example.com / password123
              </Typography>
            </Box>
          </Paper>
        </Grow>
      </Container>
    </Box>
  );
};

export default Login;

