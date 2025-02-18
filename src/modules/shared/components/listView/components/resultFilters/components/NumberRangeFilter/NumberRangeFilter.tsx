/* eslint-disable react/prop-types */
import { useContext, ChangeEvent } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import { Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Expression {
  id: string;
}

const NumberRangeFilter: React.FC<{ expression: Expression }> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values } = formikContext;
  const label = expression?.id;

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`${label}.min`, +e.target.value);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`${label}.max`, +e.target.value);
  };

  return (
    <Grid item xs={12}>
      <Typography
        component="h4"
        sx={{
          '&': {
            marginBottom: (theme) => theme.spacing(1.3),
          },
        }}
      >
        {t(expression?.id)}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: '100%',
            }}
            id={expression?.id}
            label="Min"
            name={label}
            value={values[label]?.min || ''}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            size="small"
            variant="outlined"
            onChange={handleMinChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{
              width: '100%',
            }}
            id={expression?.id}
            label="Max"
            name={label}
            value={values[label]?.max || ''}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            size="small"
            variant="outlined"
            onChange={handleMaxChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NumberRangeFilter;
