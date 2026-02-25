// src/features/settings/components/CreateSystemUser.jsx
import React from 'react';
import { Box, Typography, TextField, Switch, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { Formik } from 'formik';

export default function CreateSystemUser({ initialValues, onSubmit }) {
  const defaultValues = initialValues || {
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: true,
  };

  return (
    <Formik initialValues={defaultValues} onSubmit={onSubmit || ((values) => alert(JSON.stringify(values)))}>
      {({ values, setFieldValue, handleSubmit }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Create System User
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Full Name"
              fullWidth
              size="small"
              value={values.fullName}
              onChange={(e) => setFieldValue('fullName', e.target.value)}
            />
            <TextField
              label="User Name"
              fullWidth
              size="small"
              value={values.userName}
              onChange={(e) => setFieldValue('userName', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              size="small"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
            />
            <TextField
              label="Phone Number"
              fullWidth
              size="small"
              value={values.phone}
              onChange={(e) => setFieldValue('phone', e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
              value={values.password}
              onChange={(e) => setFieldValue('password', e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              size="small"
              value={values.confirmPassword}
              onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" sx={{ mr: 2, fontWeight: 600 }}>
                Status
              </Typography>
              <Switch
                checked={values.status}
                onChange={(e) => setFieldValue('status', e.target.checked)}
                color="primary"
              />
              <Typography variant="body2" sx={{ ml: 1, color: values.status ? 'primary.main' : 'text.secondary' }}>
                {values.status ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 4,
                bgcolor: '#2563eb',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              Create User
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}