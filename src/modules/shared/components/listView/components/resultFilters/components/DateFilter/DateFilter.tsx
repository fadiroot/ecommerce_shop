/* eslint-disable react/self-closing-comp */
import { Grid } from '@mui/material';
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useContext } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import { Box } from '@mui/system';

interface DateFilterProps {
  expression: {
    id?: string;
    label?: string;
  };
}
interface CustomDatePickerProps {
  label: string | undefined;
  format: string;
  value: any;
  name: any;
  onBlur: () => any; // Include onBlur in the custom type
}
const DateFilter: React.FC<DateFilterProps> = ({ expression }) => {
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values, setFieldTouched } = formikContext;
  const label = expression?.id || '';

  return (
    <Grid item xs={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box mt={2}>
          <DatePicker
            sx={{
              '&.MuiFormControl-root': {
                marginLeft: (theme) => theme.spacing(2),
              },
            }}
            label={expression?.label}
            format="YYYY-MM-DD"
            // @ts-ignore
            name={label}
            inputVariant="outlined"
            value={values[label]}
            emptyLabel=""
            onBlur={() => setFieldTouched(label)}
            onClose={() => setFieldTouched(label)}
            onAccept={() => setFieldTouched(label)}
            onChange={(date) => {
              setFieldValue(label, date);
            }}
            renderInput={(
              params: DatePickerProps<any> & { variant?: TextFieldVariants | undefined } & Omit<
                  OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                  'variant'
                >
            ) => <TextField {...params} />}
          ></DatePicker>
        </Box>
      </LocalizationProvider>
    </Grid>
  );
};

export default DateFilter;
