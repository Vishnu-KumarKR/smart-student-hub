import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { PeopleAlt, Male, Female, School } from '@mui/icons-material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import api from '../services/api';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, male: 0, female: 0, other: 0 });
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/students');
        let male = 0; let female = 0; let other = 0;
        const courses = {};

        data.forEach(student => {
          if (student.gender === 'Male') male++;
          else if (student.gender === 'Female') female++;
          else other++;

          courses[student.course] = (courses[student.course] || 0) + 1;
        });

        setStats({ total: data.length, male, female, other });
        
        const courseArray = Object.keys(courses).map(key => ({
          name: key,
          students: courses[key]
        }));
        setCourseData(courseArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Students', value: stats.total, icon: <PeopleAlt sx={{ fontSize: 40, color: '#1976d2' }} />, bg: '#e3f2fd' },
    { title: 'Male Students', value: stats.male, icon: <Male sx={{ fontSize: 40, color: '#2e7d32' }} />, bg: '#e8f5e9' },
    { title: 'Female Students', value: stats.female, icon: <Female sx={{ fontSize: 40, color: '#d32f2f' }} />, bg: '#ffebee' },
    { title: 'Courses Active', value: courseData.length, icon: <School sx={{ fontSize: 40, color: '#ed6c02' }} />, bg: '#fff3e0' },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  const pieData = [
    { name: 'Male', value: stats.male },
    { name: 'Female', value: stats.female },
    { name: 'Other', value: stats.other },
  ].filter(d => d.value > 0);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ p: 2, borderRadius: 3, bgcolor: card.bg, mr: 2, display: 'flex' }}>
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 400 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Students per Course
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="students" fill="#1976d2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 400 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Gender Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
