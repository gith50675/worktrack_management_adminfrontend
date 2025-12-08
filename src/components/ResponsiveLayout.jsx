import React from 'react';
import './ResponsiveLayout.css';

const ResponsiveLayout = () => {
    return (
        <div className="responsive-container">
            <div className="block block-a">
                <h3>Block A</h3>
                <p>This is the first block content.</p>
            </div>
            <div className="block block-b">
                <h3>Block B</h3>
                <p>This is the second block content.</p>
            </div>
            <div className="block block-c">
                <h3>Block C</h3>
                <p>This is the third block content.</p>
            </div>
        </div>
    );
};

export default ResponsiveLayout;
