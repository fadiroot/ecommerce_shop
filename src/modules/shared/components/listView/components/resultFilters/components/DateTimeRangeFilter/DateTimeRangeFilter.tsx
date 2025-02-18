import {
  Grid,
  Typography,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import { useTranslation } from 'react-i18next';
import { JSX } from 'react/jsx-runtime';

interface DateTimeRangeFilterProps {
  expression: {
    id?: string;
  };
}

const DateTimeRangeFilter: React.FC<DateTimeRangeFilterProps> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values, setFieldTouched } = formikContext;
  const label = expression?.id;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={6}>
        <Typography component={'h4'} gutterBottom={true}>
          {expression?.id !== undefined ? t(expression.id) : ''}
        </Typography>
        <DateTimePicker
          label={t('start-date')}
          format="YYYY-MM-DD HH:mm"
          //@ts-ignore
          name={label}
          inputVariant="outlined"
          emptyLabel=""
          //@ts-ignore
          value={values[label]?.start_date}
          onBlur={() => setFieldTouched(`${label}.start_date`)}
          onClose={() => setFieldTouched(`${label}.start_date`)}
          onAccept={() => setFieldTouched(`${label}.start_date`)}
          onChange={(date) => setFieldValue(`${label}.start_date`, date)}
          renderInput={(
            params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
                OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                'variant'
              >
          ) => <TextField {...params} />}
        />
        <DateTimePicker
          label={t('end-date')}
          format="YYYY-MM-DD HH:mm"
          //@ts-ignore

          name={`${label}.end_date`}
          inputVariant="outlined"
          //@ts-ignore

          value={values[label]?.end_date}
          onBlur={() => setFieldTouched(`${label}.end_date`)}
          emptyLabel=""
          onClose={() => setFieldTouched(`${label}.end_date`)}
          onAccept={() => setFieldTouched(`${label}.end_date`)}
          onChange={(date) => setFieldValue(`${label}.end_date`, date)}
          renderInput={(
            params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
                OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                'variant'
              >
          ) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default DateTimeRangeFilter;
