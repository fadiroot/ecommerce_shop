import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  icon?: any;
  disabled?: boolean;
  path?: string;
}

const UpdateButton: React.FC<ButtonProps> = ({ icon, disabled = false, path = '' }) => {
  const navigate = useNavigate();
  return (
    <div className="button_container">
      <Tooltip title="Edit" placement="top" arrow>
        <IconButton disabled={disabled} onClick={() => navigate(path)}>
          {icon && <i className={`${icon} btn_icon`} />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default UpdateButton;
