import React from 'react';
import { Button } from 'antd';
import './style.scss';

const HvxButton = ({ text, type, onClick, onBlur, style, className, icon, htmlType }) => {
    return (
        <Button htmlType={htmlType} className={`hvxButton ${className}`} style={style} type={type} onClick={onClick} onBlur={onBlur}>
            {text}{icon}
        </Button>
    );
}

export default HvxButton;
