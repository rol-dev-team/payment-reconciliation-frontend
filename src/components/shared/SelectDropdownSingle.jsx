// src/components/shared/SelectDropdownSingle.jsx
import React, { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Autocomplete, TextField, CircularProgress, Skeleton } from '@mui/material';

export default function SelectDropdownSingle({
  name,
  placeholder = 'Select Item', // fully dynamic placeholder
  fetchOptions,
  disabled = false,
  searchable = true,
  height = 45,
  fullWidth = true,
  width = 240,
  fontSize = '0.8125rem',
  borderRadius = 1.5,
  borderColor = '#e2e8f0',
  activeBorderColor = '#3182ce',
  sx = {},
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load options async
  useEffect(() => {
    let mounted = true;
    const loadOptions = async () => {
      setLoading(true);
      try {
        const data = await fetchOptions();
        if (mounted) setOptions(data || []);
      } catch (err) {
        console.error('Error fetching options:', err);
        if (mounted) setOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadOptions();
    return () => { mounted = false; };
  }, [fetchOptions]);

  const selectedOption = options.find(opt => opt.id === field.value) || null;

  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        animation="wave"
        width={fullWidth ? '100%' : width}
        height={height}
        sx={{ borderRadius: `${borderRadius * 8}px`, ...sx }}
      />
    );
  }

  return (
    <Autocomplete
      options={options}
      disabled={disabled}
      readOnly={!searchable}
      value={selectedOption}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      getOptionLabel={option => option.label || ''}
      onChange={(_, newValue) => setFieldValue(name, newValue ? newValue.id : '')}
      sx={{
        width: '100%', // responsive full width
        fontSize,
        ...sx,
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={selectedOption ? placeholder : ''} // show placeholder as floating label when selected
          placeholder={!selectedOption ? placeholder : ''} // dynamic placeholder when empty
          size="small"
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
          InputLabelProps={{
            shrink: Boolean(selectedOption || params.inputProps.value),
          }}
          FormHelperTextProps={{ sx: { margin: 0, height: meta.error ? 'auto' : 0 } }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={16} />}
                {params.InputProps.endAdornment}
              </>
            ),
            sx: {
              minHeight: height,
              borderRadius,
              fontSize,
              backgroundColor: '#fff',
              borderColor,
            },
          }}
        />
      )}
    />
  );
}