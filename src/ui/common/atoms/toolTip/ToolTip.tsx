import React, { ReactNode, useState } from 'react';
import './ToolTip.css'; // Import your CSS file

interface TooltipProps {
    text: string;
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div
            className='tooltip-container'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <div className='tooltip-text'>{text}</div>}
        </div>
    );
};

export default Tooltip;
