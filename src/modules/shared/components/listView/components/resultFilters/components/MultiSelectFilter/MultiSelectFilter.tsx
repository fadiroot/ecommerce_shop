/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormikContext from 'src/modules/shared/contexts/formikContext';

interface Expression {
  id: string;
  fetchHook: () => Promise<any[]>;
}

interface ColourStyles {
  multiValueLabel: (styles: React.CSSProperties) => React.CSSProperties;
  multiValue: (styles: React.CSSProperties) => React.CSSProperties;
  multiValueRemove: (styles: React.CSSProperties) => React.CSSProperties;
  clearIndicator: (styles: React.CSSProperties) => React.CSSProperties;
  input: (
    styles: React.CSSProperties,
    state: { isFocused: boolean; isSelected: boolean }
  ) => React.CSSProperties;
  control: (
    styles: React.CSSProperties,
    state: { isFocused: boolean; isSelected: boolean }
  ) => React.CSSProperties;
  menuList: (styles: React.CSSProperties) => React.CSSProperties;
  option: (styles: React.CSSProperties, state: any) => React.CSSProperties;
  menu: (base: React.CSSProperties) => React.CSSProperties;
  indicatorSeparator: (base: React.CSSProperties) => React.CSSProperties;
  dropdownIndicator: (provided: React.CSSProperties) => React.CSSProperties;
  loadingIndicator: (styles: React.CSSProperties) => React.CSSProperties;
}

interface MultiSelectFilterProps {
  expression: Expression;
  multiple?: boolean;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ expression, multiple = false }) => {
  const formikContext: any = useContext(FormikContext);
  const { setFieldValue, values } = formikContext;
  //@ts-ignore
  const [options, fetchOptions] = expression.fetchHook();
  const { t } = useTranslation('table');

  const theme = useSelector((state: any) => state.theme.mode);
  const [colourStyles, setColourStyles] = useState<ColourStyles | false>(false);

  useEffect(() => {
    setColourStyles({
      multiValueLabel: (styles) => {
        return {
          ...styles,
          marginRight: '3px',
          color: '#333',
        };
      },
      multiValue: (styles) => {
        return {
          ...styles,
          padding: '4px',
          backgroundColor: '#E7E8EA',
        };
      },
      multiValueRemove: (styles) => {
        return {
          ...styles,
          cursor: 'pointer',
        };
      },
      clearIndicator: (styles) => {
        return {
          ...styles,
          '&:hover': {
            color: 'unset',
          },
          cursor: 'pointer',
          svg: {
            fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
          },
        };
      },
      input: (styles, { isFocused, isSelected }) => {
        return {
          ...styles,
          color: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        };
      },
      control: (styles, { isFocused, isSelected }) => {
        return {
          ...styles,
          cursor: 'pointer',
          backgroundColor: `${theme === 'dark' ? '#161A22 !important' : '#F8FAFC !important'}`,
          boxShadow: 'none !important',
          outline: 'none',
          borderColor: `${theme === 'dark' ? '#8B949E !important' : '#cbd5e1 !important'}`,
          borderRadius: '4px !important',
          minHeight: '50px !important',
        };
      },
      menuList: (styles) => ({
        ...styles,
        background: `${theme === 'dark' ? '#0d1117 !important' : '#F8FAFC !important'}`,
        borderRadius: '4px !important',
      }),
      option: (styles) => {
        return {
          ...styles,
          color: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
          zIndex: 1,
          cursor: 'pointer',
        };
      },
      menu: (base) => ({
        ...base,
        zIndex: 100,
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: 'none',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        svg: {
          fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        },
      }),
      loadingIndicator: (styles) => {
        return {
          ...styles,
          filter: `${theme === 'dark' ? 'invert(50%)' : 'invert(0%)'}`,
        };
      },
    });
  }, [theme]);

  const [inputValue, setInputValue] = useState('');
  const defaultAdditional = {
    page: 1,
  };

  const loadPageOptions = async (q: string, prevOptions: any[], { page }: { page: number }) => {
    const response = await fetchOptions(page, 10, {
      name: `iLike:%${inputValue}%`,
    });

    return {
      options: response?.payload?.payload?.payload,
      hasMore: response?.payload?.payload?.metadata?.next?.page !== 0,
      additional: {
        page: response?.payload?.payload?.metadata?.next?.page,
      },
    };
  };

  return (
    <Grid item xs={12}>
      <Typography
        component="h4"
        sx={{
          '&': {
            marginBottom: (theme) => theme.spacing(0.5),
          },
        }}
      >
        {t(expression?.id)}
      </Typography>
      <AsyncPaginate
        isClearable
        additional={defaultAdditional}
        //@ts-ignore
        styles={colourStyles}
        //@ts-ignore
        loadOptions={loadPageOptions}
        menuPortalTarget={document.body}
        value={values[expression?.id] || (multiple ? [] : '')}
        getOptionLabel={(option) =>
          option?.hasOwnProperty('bracket')
            ? option?.name + ' - ' + option?.bracket?.name
            : option?.name
        }
        getOptionValue={(option) => option?.id}
        onInputChange={(value) => setInputValue(value)}
        placeholder={t(expression?.id)}
        debounceTimeout={400}
        isMulti={multiple}
        hideSelectedOptions
        closeMenuOnSelect
        onChange={(newValue) => {
          setFieldValue(expression?.id, newValue);
        }}
      />
    </Grid>
  );
};

export default MultiSelectFilter;
