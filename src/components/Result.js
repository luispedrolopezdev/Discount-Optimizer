import React from 'react';

const Result = ({ setEditMode }) => {
    return (
        <>
            <div className="mt-4 text-center">
                <button 
                    onClick={() => setEditMode(true)} 
                    className="text-white underline hover:text-blue-100"
                >
                    ¿Desea calcular el descuento para un resultado particular?
                </button>
            </div>
        </>
    );
};

export default Result;
