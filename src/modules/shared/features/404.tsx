import { Helmet } from 'react-helmet-async';
// sections
import { NotFoundView } from 'src/modules/shared/features/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
