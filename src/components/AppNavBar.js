import React from 'react';

export default function AppNavBar() {
    return React.createElement(
        'nav',
        { className: 'navbar navbar-dark bg-dark px-3 mb-3' },
        React.createElement('span', { className: 'navbar-brand' }, 'Strudel Demo')
    );
}
