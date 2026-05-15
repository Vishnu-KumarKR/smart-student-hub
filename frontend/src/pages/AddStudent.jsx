import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, TextField, Button, MenuItem, CircularProgress, Divider,
  Fade, Container
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, Update as UpdateIcon } from '@mui/icons-material';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    course: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const courses = ['Computer Science', 'Information Technology', 'Business Administration', 'Engineering', 'Arts & Design'];
  const genders = ['Male', 'Female', 'Other'];

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const { data } = await api.get(`/students`);
          const student = data.find(s => s._id === id);
          if (student) {
            // Format date for the input field (YYYY-MM-DD)
            const formattedDate = student.dob ? new Date(student.dob).toISOString().split('T')[0] : '';
            setFormData({
              ...student,
              dob: formattedDate
            });
          } else {
            toast.error('Student not found');
            navigate('/students');
          }
        } catch (error) {
          toast.error('Failed to fetch student details');
          navigate('/students');
        } finally {
          setFetching(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode, navigate]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Full Name is required";
    if (!formData.dob) tempErrors.dob = "Date of Birth is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone) tempErrors.phone = "Phone Number is required";
    if (!formData.course) tempErrors.course = "Course is required";
    if (!formData.address) tempErrors.address = "Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const age = calculateAge(formData.dob);
      const studentData = { ...formData, age };
      
      if (isEditMode) {
        await api.put(`/students/${id}`, studentData);
        toast.success('Student updated successfully');
      } else {
        await api.post('/students', studentData);
        toast.success('Student added successfully');
      }
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} student`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/students')}
            sx={{ 
              mr: 2, 
              color: 'text.secondary',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 2 }
            }}
          >
            Back
          </Button>
          <Typography variant="h4" fontWeight="800" color="text.primary" sx={{ letterSpacing: '-0.02em' }}>
            {isEditMode ? 'Edit Student' : 'Add New Student'}
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 8, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.06)',
            bgcolor: 'background.paper',
            mb: 4
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h6" fontWeight="700" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 6, height: 24, bgcolor: 'primary.main', borderRadius: 2 }} />
                Personal Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputSx}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.dob}
                    onChange={handleChange}
                    error={!!errors.dob}
                    helperText={errors.dob}
                    sx={{
                      ...inputSx,
                      '& input::-webkit-calendar-picker-indicator': {
                        cursor: 'pointer',
                        filter: 'invert(0.5)',
                        '&:hover': { filter: 'invert(0.3)' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
                    sx={inputSx}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4, borderStyle: 'dashed', opacity: 0.6 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="700" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 6, height: 24, bgcolor: 'primary.main', borderRadius: 2 }} />
                Academic Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    select
                    label="Enrolled Course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    error={!!errors.course}
                    helperText={errors.course}
                    sx={inputSx}
                  >
                    {courses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Residential Address"
                    name="address"
                    placeholder="Enter street, city, state, and zip code"
                    multiline
                    rows={4}
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    sx={inputSx}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end', gap: 2.5 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/students')}
                sx={{ 
                  px: 6, 
                  borderRadius: 3, 
                  fontWeight: 700, 
                  height: 54,
                  border: '2px solid',
                  '&:hover': { border: '2px solid', bgcolor: 'rgba(0,0,0,0.02)' }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={22} color="inherit" /> : (isEditMode ? <UpdateIcon /> : <SaveIcon />)}
                disabled={loading}
                sx={{ 
                  px: 6, 
                  borderRadius: 3, 
                  fontWeight: 700,
                  height: 54,
                  boxShadow: '0 12px 24px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    boxShadow: '0 15px 30px rgba(99, 102, 241, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {isEditMode ? 'Update Record' : 'Create Record'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Fade>
  );
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.08)',
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
  '& .MuiInputLabel-shrink': {
    fontWeight: 700,
    transform: 'translate(14px, -8px) scale(0.75)',
    backgroundColor: '#fff',
    padding: '0 8px',
    borderRadius: 1
  }
};

export default AddStudent;

