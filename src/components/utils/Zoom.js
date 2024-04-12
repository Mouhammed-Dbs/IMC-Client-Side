import { useState } from 'react';

export default function Zoom() {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleRightClick = (e) => {
        e.preventDefault();
        setIsZoomed(!isZoomed);

        return (
            <div
                onClick={handleRightClick}
                style={{ transform: isZoomed ? 'scale(1.2)' : 'scale(1)' }}
            >
            </div>
        );
    };
};
