import {
  FilledTextFieldProps,
  Grid,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import { useTranslation } from 'react-i18next';
import { JSX } from 'react/jsx-runtime';

interface DateTimeFilterProps {
  expression: {
    id?: string;
  };
}

const DateTimeFilter: React.FC<DateTimeFilterProps> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values, setFieldTouched } = formikContext;
  const label = expression?.id;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={3}>
        <DatePicker
          label={expression?.id !== undefined ? t(expression.id) : ''}
          format="YYYY-MM-DD HH:mm"
          // @ts-ignore

          name={label}
          inputVariant="outlined"
          // @ts-ignore

          value={values[label]}
          emptyLabel=""
          onBlur={() => setFieldTouched(label)}
          onClose={() => setFieldTouched(label)}
          onAccept={() => setFieldTouched(label)}
          onChange={(date) => setFieldValue(label, date)}
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

export default DateTimeFilter;
