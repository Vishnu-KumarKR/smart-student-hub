import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Paper, Grid, Button, CircularProgress, Divider,
  Fade, Container, Avatar, Chip
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Person as PersonIcon } from '@mui/icons-material';
import api from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await api.get(`/students`);
        const found = data.find(s => s._id === id);
        if (found) {
          setStudent(found);
        } else {
          toast.error('Student not found');
          navigate('/students');
        }
      } catch (error) {
        toast.error('Failed to fetch student details');
        navigate('/students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/students')}
            sx={{ color: 'text.secondary' }}
          >
            Back to Directory
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/students/edit/${id}`)}
            sx={{ borderRadius: 2 }}
          >
            Edit Profile
          </Button>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 6, 
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3, flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)'
              }}
            >
              <PersonIcon sx={{ fontSize: '3.5rem' }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {student.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap' }}>
                <Chip label={student.course} color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                <Chip label={`Age: ${student.age}`} variant="outlined" />
                <Chip label={student.gender} variant="outlined" />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Contact Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <InfoItem label="Email Address" value={student.email} />
                <InfoItem label="Phone Number" value={student.phone} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Academic Details</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <InfoItem label="Date of Birth" value={format(new Date(student.dob), 'MMMM dd, yyyy')} />
                <InfoItem label="Student ID" value={student._id.toUpperCase()} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Residential Address</Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: '#f9fafb', borderRadius: 2 }}>
                <Typography variant="body1">{student.address}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fade>
  );
};

const InfoItem = ({ label, value }) => (
  <Box>
    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

export default StudentDetails;
