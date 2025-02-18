import UpdateButton from 'src/modules/shared/components/update-button/UpdateButton';
import { getInventoryLabel } from 'src/modules/shared/components/listView/utils';

import { paths } from '../../shared/routes/paths';

export const ColumnsInfo = [
  {
    id: 'id',
    name: 'id',
    label: 'Id',
    show: true,
    type: 'numberRange',
    sortable: true,
    returns: (item: any) => <span>{item?.id || null}</span>,
  },

  {
    id: 'First Name',
    name: 'name',
    label: 'First Name',
    show: true,
    type: 'searchable',
    sortable: true,
    returns: (item: any) => <span>{item?.name || null}</span>,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    show: true,
    type: 'searchable',
    sortable: true,
    returns: (item: any) => <span>{item?.email || null}</span>,
  },
  {
    id: 'status',
    name: 'status',
    label: 'status',
    show: true,
    type: 'searchable',
    sortable: true,
    returns: (item: any) => <span>{getInventoryLabel(item?.status || false) || null}</span>,
  },
  {
    id: 'City',
    name: 'city',
    label: 'City',
    show: true,
    type: 'searchable',
    sortable: true,
    returns: (item: any) => <span>{item?.city || null}</span>,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone number',
    show: true,
    type: 'searchable',
    sortable: true,
    returns: (item: any) => <span>{item?.phoneNumber || null}</span>,
  },
  {
    id: 'actions',
    label: 'Actions',
    show: true,
    type: 'actions',
    returns: (item: any) => (
      <div className="action_buttons">
        <UpdateButton icon="fa-solid fa-pen-to-square fa-xs" path={paths.user.edit(item?.id)} />
      </div>
    ),
  },
];
