import { useTranslation } from 'react-i18next';
import Button from '../../../button/Button';
interface MyToolbarProps {
  toggleFilters: () => void;
  toggleColumns: () => void;
}

const MyToolbar: React.FC<MyToolbarProps> = ({ toggleFilters, toggleColumns }) => {
  const { t } = useTranslation('table');

  return (
    <div className="filter_container">
      <Button
        label={t('filter')}
        icon="fa-solid fa-filter"
        className="btn-outline-secondary filter_buttons"
        onClick={toggleFilters}
      />
      <Button
        label={t('columns')}
        icon="fa-solid fa-table-columns"
        className="btn-outline-secondary filter_buttons"
        onClick={toggleColumns}
      />
    </div>
  );
};

export default MyToolbar;
