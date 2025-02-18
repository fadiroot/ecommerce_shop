/* eslint-disable react/button-has-type */
import React, { ReactNode, MouseEventHandler } from 'react';
import { palette as themePalette } from 'src/theme/palette';

interface ButtonProps {
  icon?: any;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  type = 'button',
  className = 'btn-primary',
  disabled = false,
  onClick = () => {},
}) => {
  const palette = themePalette('light');
  return (
    <div className="button_container">
      <button
        style={{ backgroundColor: palette.primary.main }}
        type={type}
        className={`btn ${className} ${disabled ? 'btn-disabled' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <i className={`${icon} btn_icon`} />}
        <p className="label">{label}</p>
      </button>
    </div>
  );
};

export default Button;
