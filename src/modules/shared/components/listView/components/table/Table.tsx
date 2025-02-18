/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { palette as themePalette } from 'src/theme/palette';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ConfirmDialog } from '../../../custom-dialog';
import { useBoolean } from '../../../../hooks/use-boolean';

interface ColumnInfo {
  id: string;
  show: boolean;
  label: string;
  sortable: boolean;
  returns: (item: any) => React.ReactNode;
}

interface MUITableProps {
  selectedAllItems: boolean;
  deleteHandler: any;
  HandleSelectAllItems: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columnsInfo: ColumnInfo[];
  orderBy: string;
  orderDirection: string;
  createSortHandler: (column: ColumnInfo) => void;
  data: any[];
  dataCheck: any[];
  selectedItems: any[];
  setSelectedItems: any;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setOrderDirection: any;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
  checkboxForm?: boolean;
  checkboxFormAll?: boolean;
  checked: any[] | undefined;
  setChecked?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}
const MUITable: React.FC<MUITableProps> = ({
  selectedAllItems,
  HandleSelectAllItems,
  columnsInfo,
  orderBy,
  orderDirection,
  createSortHandler,
  data,
  dataCheck,
  deleteHandler,
  selectedItems,
  setSelectedItems,
  setOrderBy,
  setOrderDirection,
  setQuery,
  checkboxForm = true,
  checkboxFormAll = true,
  checked,
  setChecked,
}) => {
  const { t } = useTranslation('table');
  // const theme = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const confirm = useBoolean();
  const { pathname } = useLocation();
  const path = pathname.split('?')[0].split('/').at(-1);
  // eslint-disable-next-line no-unused-vars
  const [isShow, setIsShow] = useState(
    path === 'main-categories' || path === 'sub-categories' || path === 'products'
  );

  const palette = themePalette('light');

  return (
    <>
      {selectedItems?.length > 0 && (
        <div
          className="delete-header-container"
          style={{ backgroundColor: palette.primary.lighter }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {checkboxForm && checkboxFormAll && (
              <Checkbox
                checked={selectedAllItems}
                onChange={HandleSelectAllItems}
                sx={{ marginLeft: '5px' }}
              />
            )}
            <p style={{ color: palette.primary.main }}>Selected item : {selectedItems?.length}</p>
          </div>
          <Tooltip title="Delete">
            <IconButton onClick={confirm.onTrue}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Table className="table_loading">
        <TableHead className="table_head">
          <TableRow>
            {selectedItems?.length === 0 && (
              <>
                {checkboxForm && checkboxFormAll && (
                  <TableCell scope="row" align="center" padding="checkbox">
                    <Checkbox checked={selectedAllItems} onChange={HandleSelectAllItems} />
                  </TableCell>
                )}

                {columnsInfo?.map((item) => {
                  return (
                    item?.show && (
                      <TableCell align="center" key={item.id}>
                        {item?.sortable ? (
                          <div
                            className="table_head_sort"
                            style={{ display: item?.sortable ? '' : 'none' }}
                          >
                            <span className="table_head_label">{t(item?.id)}</span>
                            <TableSortLabel
                              active={orderBy === item?.id}
                              //@ts-ignore

                              direction={orderDirection}
                              onClick={() => {
                                createSortHandler(item);
                              }}
                            />
                          </div>
                        ) : (
                          <span className="table_head_label">{t(item?.label)}</span>
                        )}
                      </TableCell>
                    )
                  );
                })}
              </>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index} hover selected={selectedItems.includes(item?.id)}>
              {isShow && (
                <TableCell scope="row" align="center" padding="checkbox">
                  <i className="fa-solid fa-bars darg-and-drop-icon" />
                </TableCell>
              )}

              {checkboxForm && (
                <TableCell scope="row" align="center" padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item?.id)}
                    onChange={() => {
                      if (selectedItems.includes(item?.id)) {
                        const newSelected = selectedItems.filter(
                          (selectedId) => selectedId !== item?.id
                        );

                        const newChecked = checked
                          ? checked.filter((selectedId) => selectedId?.id !== item?.id)
                          : [];
                        setSelectedItems(newSelected);

                        if (setChecked) setChecked(newChecked);
                      } else {
                        if (setChecked)
                          //@ts-ignore

                          checked ? setChecked((prev) => [...prev, item]) : setChecked([item]);
                        setSelectedItems((prev: any) => [...prev, item?.id]);
                      }
                    }}
                    value={selectedItems.includes(item?.id)}
                  />
                </TableCell>
              )}

              {columnsInfo?.map((column, index) => {
                return (
                  column?.show && (
                    <TableCell scope="row" align="center" key={index}>
                      {column.returns(item)}
                    </TableCell>
                  )
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedItems.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              deleteHandler();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};

export default MUITable;
