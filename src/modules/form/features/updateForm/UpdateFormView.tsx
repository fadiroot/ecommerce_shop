// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/modules/shared/routes/paths';
// components
import { useSettingsContext } from 'src/modules/shared/components/settings';
import CustomBreadcrumbs from 'src/modules/shared/components/custom-breadcrumbs';
//
import EditCreateForm from '../../components/EditCreateForm';

// ----------------------------------------------------------------------

export default function UpdateFormView() {
  const settings = useSettingsContext();
  const data = {
    name: 'test name',
    description: 'test description',
    subDescription: 'test sub desc',
    images: [],
    //
    code: '12546',
    sku: '',
    price: 0,
    quantity: 0,
    priceSale: 0,
    tags: [],
    taxes: 0,
    gender: '',
    category: '',
    colors: [],
    sizes: [],
    newLabel: { enabled: false, content: '' },
    saleLabel: { enabled: false, content: '' },
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          //   {
          //     name: 'Product',
          //     href: paths.dashboard.product.root,
          //   },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EditCreateForm currentProduct={data} />
    </Container>
  );
}
