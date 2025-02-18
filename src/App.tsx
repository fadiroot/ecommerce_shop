// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// ----------------------------------------------------------------------
import 'react-quill/dist/quill.snow.css';

// routes
import Router from 'src/modules/shared/routes';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/modules/shared/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/modules/shared/components/progress-bar';
import { MotionLazy } from 'src/modules/shared/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/modules/shared/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/modules/auth/context/jwt';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <SettingsDrawer />
            <ProgressBar />
            <AuthConsumer>
              <Router />
            </AuthConsumer>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
