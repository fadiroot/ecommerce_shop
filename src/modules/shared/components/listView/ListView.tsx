/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFilters from '../../hooks/useFilters';
import debounce from 'lodash.debounce';
import { searchQueryParser } from '../../utils/searchQueryParser';
import Pagination from './components/pagination/Pagination';
import Header from './components/header/Header';
import { useLocation } from 'react-router-dom';
import MUITable from './components/table/Table';
import { useTranslation } from 'react-i18next';
// import { setPagination } from 'src/store/slices/utility/utilitySlice';

interface ColumnInfo {
  id: any;
  name: any;
  label: any;
  show: boolean;
  type: string;
  sortable: boolean;
  returns: any;
}

interface Metadata {
  total_items: number;
}

interface ListViewProps {
  modelName: string;
  fetchData: any;
  metadata: Metadata | undefined;
  status?: string;
  deleteData: any;
  path: string;
  customBtnHandleClick?: (items: any[]) => void;
  customDisableBtn?: boolean;
  btns?: boolean;
  setSelectItems?: (items: any[]) => void;
  include?: string;
  queryParam?: string;
  checkboxForm?: boolean;
  checkboxFormAll?: boolean;
  addedComponent?: JSX.Element | null;
  checked?: any[];
  setChecked?: any;
  setUnchecked: boolean;
}

const ListView: React.FC<ListViewProps> = ({
  modelName,
  fetchData,
  metadata,
  status = '',
  deleteData,
  path,
  btns = true,
  setSelectItems,
  include,
  queryParam,
  checkboxForm = true,
  checkboxFormAll = true,
  addedComponent,
  checked,
  setChecked,
  setUnchecked,
}) => {
  const { t } = useTranslation('table');
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const filterContext = useFilters();
  const { items, columnsInfo, query, setQuery } = filterContext;
  console.log(query);
  const [columns, columnsChange] = useState<ColumnInfo[]>(columnsInfo);
  const data = useMemo(() => items, [items]);
  const [orderBy, setOrderBy] = useState('created_at');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAllItems, setSelectedAllItems] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const createSortHandler = useCallback((column: { id: string }) => {
    setOrderBy(() => column?.id);
    setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);
  // useEffect(() => {
  //   if (unchecked) {
  //     setSelectedItems([]);
  //     if (setChecked) setChecked([]);
  //     setUnchecked(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [unchecked]);
  const HandleSelectAllItems = (e: { target: { checked: any } }) => {
    if (selectedAllItems === true) {
      setSelectedItems([]);
      if (setChecked) setChecked([]);

      setSelectedAllItems(false);
    } else {
      setSelectedAllItems(true);
      setSelectedItems(e.target.checked ? data?.map((item: { id: any }) => item.id) : []);
      if (setChecked) setChecked(data);
    }
  };
  useEffect(() => {
    if (setSelectItems) setSelectItems(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);
  const handleLimitChange = (event: { target: { value: string } }) => {
    if (page !== 1) setPage(() => 1);
    setLimit(parseInt(event.target.value));
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage + 1);
  };

  const ToggleColumns = useCallback(() => {
    setColumnsOpen((prev) => !prev);
  }, []);

  const ToggleFilters = useCallback(() => {
    setFiltersOpen((prev) => !prev);
  }, []);

  const deleteHandler = () => {
    dispatch(deleteData(selectedItems))
      .unwrap()
      .then((data: any) => {
        if (data.status === 'success') {
          setSelectedItems([]);
          if (setChecked) setChecked([]);

          setSelectedAllItems(false);
          // dispatch(
          //   fetchData({
          //     ...query,
          //     ...(include ? { include } : {}),
          //     ...(queryParam ? queryParam : {}),
          //     limit,
          //     page,
          //     sort_by: `${`${orderBy}.${orderDirection}`}`,
          //   })
          // );
        }
      });
  };

  const handleChange = (e: { target: { value: string } }) => {
    setPage(1);
    setQuery({
      query: encodeURIComponent(
        JSON.stringify({
          or: searchQueryParser(e.target.value.trim(), columnsInfo),
        })
      ),
    });
  };

  const debouncedResults = useMemo(() => debounce(handleChange, 500), []);

  useEffect(() => () => {
    debouncedResults.cancel();
  });

  useEffect(() => {
    dispatch(fetchData());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, limit, orderBy, orderDirection]);

  // for flickering screen
  const [loading, setLoading] = useState(status !== 'succeeded');
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper className="card_container">
        <Header
          modelName={modelName}
          onChange={debouncedResults}
          toggleFilters={ToggleFilters}
          toggleColumns={ToggleColumns}
          filtersOpen={filtersOpen}
          columnsOpen={columnsOpen}
          columns={columns}
          columnsChange={columnsChange}
          setPage={setPage}
        />

        <Box overflow="auto">
          <Box
            width="fit-content"
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            flexDirection="column"
            minWidth="100%"
            overflow="auto"
          >
            {data?.length === 0 || loading ? (
              status === 'loading' || loading ? (
                <Typography
                  sx={{
                    width: '100%',
                    mt: 4,
                    mb: 4,
                  }}
                  align="center"
                >
                  <CircularProgress />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    width: '100%',
                    mb: 2,
                  }}
                  align="center"
                >
                  {t('no-data-found')}
                </Typography>
              )
            ) : (
              <>
                {addedComponent}
                <MUITable
                  selectedAllItems={selectedAllItems}
                  HandleSelectAllItems={HandleSelectAllItems}
                  columnsInfo={columnsInfo}
                  orderBy={orderBy}
                  orderDirection={orderDirection}
                  checkboxForm={checkboxForm}
                  checkboxFormAll={checkboxFormAll}
                  createSortHandler={createSortHandler}
                  data={data}
                  deleteHandler={deleteHandler}
                  dataCheck={data}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  setOrderBy={setOrderBy}
                  setOrderDirection={setOrderDirection}
                  setQuery={setQuery}
                  setChecked={setChecked || undefined}
                  checked={checked || undefined}
                />

                <Pagination
                  count={metadata?.total_items || 0}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page - 1}
                  rowsPerPage={limit}
                />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ListView;
