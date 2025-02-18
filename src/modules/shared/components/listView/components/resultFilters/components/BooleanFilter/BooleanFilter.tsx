import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import FormikContext from 'src/modules/shared/contexts/formikContext';
interface BooleanFilterProps {
  expression: any;
}

const BooleanFilter: React.FC<BooleanFilterProps> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values } = formikContext;
  const label = expression?.id || '';

  return (
    <Grid item xs={6}>
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

      <FormControl fullWidth>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={label}
          label={label}
          value={values[label] === undefined ? '' : values[label]}
          onChange={(event) => {
            const value = event.target.value as boolean;
            setFieldValue(label, value);
          }}
        >
          <MenuItem value="true">{t('true')}</MenuItem>
          <MenuItem value="false">{t('false')}</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default React.memo(BooleanFilter);
