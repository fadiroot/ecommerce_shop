/* eslint-disable react/jsx-no-constructed-context-values */
import { Card, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../button/Button';
import FormikContext from '../../../../contexts/formikContext';
import useFilters from '../../../../hooks/useFilters';
import BooleanFilter from './components/BooleanFilter/BooleanFilter';
import DateFilter from './components/DateFilter/DateFilter';
import { DateRangeFilter } from './components/DateRangeFilter';
import { DateTimeFilter } from './components/DateTimeFilter';
import DateTimeRangeFilter from './components/DateTimeRangeFilter/DateTimeRangeFilter';
import { MonoSelectFilter } from './components/MonoSelectFilter';
import MultiSelectFilter from './components/MultiSelectFilter/MultiSelectFilter';
import NumberFilter from './components/NumberFilter/NumberFilter';
import NumberRangeFilter from './components/NumberRangeFilter/NumberRangeFilter';
import { createFilterQuery } from './utils';

interface ResultFiltersProps {
  setPage: (page: number) => void;
}

const ResultFilters: React.FC<ResultFiltersProps> = ({ setPage }) => {
  const { t } = useTranslation('table');

  const filterContext: any = useFilters();
  const { initialValues, schema, columnsInfo, setQuery } = filterContext;

  const filteredColumns = useMemo(
    () =>
      columnsInfo.filter((item: { type: any }) => !['searchable', 'actions'].includes(item?.type)),
    [columnsInfo]
  );

  const handleFilter = (inputValues: Record<string, any>) => {
    const finalQuery = createFilterQuery(columnsInfo, inputValues);
    setQuery(finalQuery);
  };

  const switchFn =
    (lookupObject: Record<string, any>, defaultCase = '_default') =>
    (expression: { type: string }) =>
      (lookupObject[expression.type] || lookupObject[defaultCase])(expression);

  const columnType = useMemo(
    () => ({
      dateTimeRange: (expression: any) => <DateTimeRangeFilter expression={expression} />,
      dateRange: (expression: any) => <DateRangeFilter expression={expression} />,
      dateTime: (expression: any) => <DateTimeFilter expression={expression} />,
      date: (expression: any) => <DateFilter expression={expression} />,
      multiSelect: (expression: any) => <MultiSelectFilter expression={expression} multiple />,
      monoSelect: (expression: any) => (
        <MonoSelectFilter
          expression={expression} //@ts-ignore
          multiple={false}
        />
      ),
      numberRange: (expression: any) => <NumberRangeFilter expression={expression} />,
      number: (expression: any) => <NumberFilter expression={expression} />,
      boolean: (expression: any) => <BooleanFilter expression={expression} />,
      default: () => null,
    }),
    []
  );

  const columnSwitch = switchFn(columnType, 'default');

  return (
    <Card
      style={{ border: 'none', boxShadow: 'none' }}
      sx={{
        padding: '0 20px 20px 20px',
        // background: '#F8FAFC',
      }}
    >
      {/* @ts-ignore */}
      <Formik initialValues={initialValues} validationSchema={schema}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          resetForm,
          touched,
          values,
        }) => (
          <FormikContext.Provider
            value={{
              values,
              setFieldValue,
              setFieldTouched,
              handleBlur,
              handleChange,
              errors,
              touched,
              resetForm,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {filteredColumns.map(
                      (obj: { type: string }, i: React.Key | null | undefined, arr: any) => (
                        <Fragment key={i}>{columnSwitch(obj)}</Fragment>
                      )
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12} md="auto" style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    label={t('filter')}
                    className="btn-outline-secondary"
                    type="submit"
                    onClick={() => {
                      if (JSON.stringify(values) !== '{}') {
                        setPage(1);
                        handleFilter(values);
                      }
                    }}
                  />

                  <Button
                    label={t('reset')}
                    className="btn-outline-secondary"
                    onClick={() => {
                      if (JSON.stringify(values) !== '{}') {
                        setPage(1);
                        resetForm();
                        setQuery(null);
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </FormikContext.Provider>
        )}
      </Formik>
    </Card>
  );
};

export default React.memo(ResultFilters);
