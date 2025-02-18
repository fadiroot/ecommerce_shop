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
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { JSX } from 'react/jsx-runtime';

interface DateRangeFilterProps {
  expression: {
    id?: string;
  };
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values, setFieldTouched } = formikContext;
  const label = expression?.id;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item xs={12}>
        <Typography
          component={'h4'}
          sx={{
            '&': {
              marginBottom: (theme) => theme.spacing(1.3),
            },
          }}
        >
          {expression?.id !== undefined ? t(expression.id) : ''}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              label={t('start-date')}
              format="YYYY-MM-DD"
              // @ts-ignore
              name={label}
              inputVariant="outlined"
              emptyLabel=""
              // @ts-ignore
              value={values[label]?.start_date}
              onBlur={() => setFieldTouched(`${label}.start_date`)}
              onClose={() => setFieldTouched(`${label}.start_date`)}
              onAccept={() => setFieldTouched(`${label}.start_date`)}
              onChange={(date) => {
                setFieldValue(
                  `${label}.start_date`,
                  dayjs(dayjs(date).format('YYYY-MM-DD')).startOf('day').add(1, 'hour')
                );
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & {
                  variant?: TextFieldVariants | undefined;
                } & Omit<
                    OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                    'variant'
                  >
              ) => (
                <TextField
                  {...params}
                  sx={(theme) => ({
                    '&.MuiFormControl-root': {
                      width: '100%',
                    },
                  })}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label={t('end-date')}
              format="YYYY-MM-DD"
              // @ts-ignore

              name={`${label}.end_date`}
              inputVariant="outlined"
              // @ts-ignore

              value={dayjs(values[label]?.end_date).subtract(1, 'hour')}
              onBlur={() => setFieldTouched(`${label}.end_date`)}
              onClose={() => setFieldTouched(`${label}.end_date`)}
              onAccept={() => setFieldTouched(`${label}.end_date`)}
              emptyLabel=""
              onChange={(date) => {
                setFieldValue(
                  `${label}.end_date`,
                  dayjs(dayjs(date).format('YYYY-MM-DD')).endOf('day').add(1, 'hour')
                );
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & {
                  variant?: TextFieldVariants | undefined;
                } & Omit<
                    OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                    'variant'
                  >
              ) => (
                <TextField
                  sx={(theme) => ({
                    '&.MuiFormControl-root': {
                      width: '100%',
                    },
                  })}
                  {...params}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
