import React from 'react';

const ErrorMessage = ({ error }) => {
    if (error === null) {
        return null;
    }
    return <div className="error">{error}</div>;
};

export default ErrorMessage;
