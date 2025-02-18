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

export default function CreateFormView() {
  const settings = useSettingsContext();

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

      <EditCreateForm />
    </Container>
  );
}
