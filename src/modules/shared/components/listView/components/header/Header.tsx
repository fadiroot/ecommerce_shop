/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import { Box, Collapse } from '@mui/material';
import Columns from '../columns/Columns';
import Toolbar from '../toolbar/Toolbar';
import { ResultFilters } from '../resultFilters';
import { useTranslation } from 'react-i18next';
import { palette as themePalette } from 'src/theme/palette';

interface ColumnInfo {
  id: string;
  show: boolean;
  returns: boolean;
  type: string;
  // Define other properties here
}

interface HeaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFilters: () => void;
  toggleColumns: () => void;
  filtersOpen: boolean;
  columnsOpen: boolean;
  modelName: any;
  columnsChange: any;
  columns: ColumnInfo[];
  setPage: (page: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  onChange,
  toggleFilters,
  toggleColumns,
  filtersOpen,
  columnsOpen,
  columnsChange,
  columns,
  setPage,
}) => {
  const { t } = useTranslation('table');
  const palette = themePalette('light');

  const settingsString = localStorage.getItem('settings');
  const settings = settingsString ? JSON.parse(settingsString) : null;

  const isSearchable = (): boolean => {
    const result = columns.findIndex((item) => item.type === 'searchable');
    return result === -1 ? false : true;
  };

  return (
    <>
      <div className="card_header">
        {isSearchable() ? (
          <input
            style={{
              background: settings?.themeMode === 'dark' ? palette.grey[700] : 'unset',
            }}
            type="search"
            className="search_input"
            placeholder={t('search')}
            onChange={onChange}
          />
        ) : (
          <p />
        )}
        <Toolbar toggleFilters={toggleFilters} toggleColumns={toggleColumns} />
      </div>

      <Box>
        <Collapse in={filtersOpen}>
          <ResultFilters setPage={setPage} />
        </Collapse>
        <Collapse in={columnsOpen}>
          <Columns columnsChange={columnsChange} columns={columns} />
        </Collapse>
      </Box>
    </>
  );
};

export default Header;
