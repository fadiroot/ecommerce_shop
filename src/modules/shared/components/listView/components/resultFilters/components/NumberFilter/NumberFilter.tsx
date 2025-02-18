import { Grid, TextField } from '@mui/material';
import React, { useContext, ChangeEvent } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';

interface Expression {
  id: string;
  label: string;
}

interface NumberFilterProps {
  expression: Expression;
}

const NumberFilter: React.FC<NumberFilterProps> = ({ expression }) => {
  const formikContext: any = useContext(FormikContext);
  const { values, setFieldValue } = formikContext;
  const label = expression?.id || '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(label, +e.target.value);
  };

  return (
    <Grid item xs={6} sm={4} md={2}>
      <TextField
        sx={{
          width: '100%',
        }}
        id={expression?.id}
        label={expression?.label}
        name={label}
        value={values[label] || ''}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        size="small"
        variant="outlined"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );
};

export default NumberFilter;
