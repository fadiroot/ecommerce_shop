import { m } from 'framer-motion';
// @mui
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// components
import Iconify from 'src/modules/shared/components/iconify';
import { varHover } from 'src/modules/shared/components/animate';
import CustomPopover, { usePopover } from 'src/modules/shared/components/custom-popover';
import { useTranslation } from 'react-i18next';
import { useSettingsContext } from 'src/modules/shared/components/settings';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'French',
    value: 'fr',
    icon: 'flagpack:fr',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    icon: 'flagpack:vn',
  },
  {
    label: 'Chinese',
    value: 'cn',
    icon: 'flagpack:cn',
  },
  {
    label: 'Arabic',
    value: 'ar',
    icon: 'flagpack:sa',
  },
];

export default function LanguagePopover() {
  const popover = usePopover();
  const { i18n, t } = useTranslation();
  const settings = useSettingsContext();

  const currentLang = allLangs.find((lang) => lang.value === i18n.language);

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...(popover.open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={currentLang?.icon} sx={{ borderRadius: 0.65, width: 28 }} />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {allLangs.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === i18n.language}
            onClick={() => {
              i18n.changeLanguage(option.value),
                popover.onClose(),
                settings.onChangeDirectionByLang(option.value);
            }}
          >
            <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />

            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
