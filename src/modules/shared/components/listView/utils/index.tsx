import { palette as themePalette } from 'src/theme/palette';

export const getInventoryLabel = (inventoryType: string | number) => {
  const palette = themePalette('light');
  const map = {
    active: {
      text: 'Active',
      color: 'primary',
      background: 'unset',
    },
    banned: {
      text: 'Banned',
      color: '#ac2f2d',
      background: '#f39594',
    },
  };

  const { text, color, background } = map[inventoryType as keyof typeof map];

  return (
    <span
      color={color}
      style={{
        padding: '2px 8px ',
        background: 'red',
        height: '24px',
        color: text === 'Active' ? palette.primary.main : color,
        textAlign: 'center',
        borderRadius: '8px',
        backgroundColor: text === 'Active' ? palette.primary.lighter : background,
      }}
    >
      {text}
    </span>
  );
};
