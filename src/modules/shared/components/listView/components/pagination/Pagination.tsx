import { TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  count: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
}) => {
  const { t } = useTranslation('table');

  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
      showFirstButton={true}
      showLastButton={true}
      labelRowsPerPage={t('label-rows-per-page')}
    />
  );
};

export default Pagination;
