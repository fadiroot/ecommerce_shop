import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ColumnInfo {
  id: string;
  show: boolean;
  returns: any;
}

interface ColumnsProps {
  columns: ColumnInfo[];
  columnsChange: (columns: ColumnInfo[]) => void;
}

const Columns: React.FC<ColumnsProps> = ({ columns, columnsChange }) => {
  const { t } = useTranslation('table');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const column = columns.find((c) => c.id === event.target.name);
    if (column) {
      column.show = !column.show;
      columnsChange([...columns]);
    }
  };

  return (
    <div className="columns_container">
      {columns?.map(
        (col) =>
          col.returns && (
            <FormControlLabel
              key={col.id}
              control={<Switch checked={col.show} onChange={handleChange} name={col.id} />}
              label={t(col.id)}
            />
          )
      )}
    </div>
  );
};

export default React.memo(Columns);
