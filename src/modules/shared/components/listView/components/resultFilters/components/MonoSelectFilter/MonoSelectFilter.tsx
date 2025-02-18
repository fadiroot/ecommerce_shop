import { Grid, Typography, CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import FormikContext from 'src/modules/shared/contexts/formikContext';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Option {
  [x: string]: any;
  value: string;
  name: string;
}

interface Expression {
  id: string;
  label: string;
  options?: Option[];
  fetchHook: () => [Option[], () => void];
}

const MultiSelectFilter: React.FC<{ expression: Expression }> = ({ expression }) => {
  const { t } = useTranslation('table');
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values } = formikContext;
  const [options, fetchOptions] = expression.fetchHook();
  const loadOptions = () => {
    fetchOptions();
  };

  function sleep(delay = 0) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) {
      return;
    }

    let active = true;

    (async () => {
      await sleep(1e3);
      if (active) {
        loadOptions();
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Grid item xs={12}>
      <Typography
        component={'h4'}
        sx={{
          '&': {
            marginBottom: (theme) => theme.spacing(1.3),
          },
        }}
      >
        {t(expression?.id)}
      </Typography>
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: '100%',
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => option.name}
        options={
          expression.options
            ? expression?.options?.map((el) => ({
                value: el.value,
                name: el?.label,
              }))
            : options
        }
        loading={loading}
        value={
          expression.options
            ? values?.status
            : options.find((item) => item?.name === values?.status) || null
        }
        multiple={false}
        onChange={(event, value) => {
          setFieldValue(
            expression?.id,
            value ? (expression.options ? value.value : value?.name) : null
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={expression?.label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};

export default MultiSelectFilter;
