// TotalCalculatorForm.js
import React from 'react';

const formatAmount = (num) => {
    return `$${new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num)}`;
};

const TotalCalculatorForm = ({ spending, setSpending, finalResult, originalAmount, discountAmount }) => {
    const handleSpendingChange = (e) => {
        setSpending(e.target.value);
    };

    return (
        <div className="mt-6">
            <label className="block text-gray-700 mb-2 text-center">Importe sin Descuento</label>
            <div className="relative w-64 mx-auto"> {/* Contenedor con ancho fijo y centrado */}
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input 
                    type="number"
                    value={spending} 
                    onChange={handleSpendingChange} 
                    style={{ width: '100%' }}  // El ancho del input ocupa el 100% del contenedor
                    className="pl-8 pr-4 py-2 rounded-md border border-transparent focus:border-transparent focus:ring-2 focus:ring-green-400 outline-none appearance-none"
                />
            </div>
            {finalResult !== null && (
                <div className="mt-6 text-sm md:text-base text-center text-gray-800">
                    <p>Descuento Aplicado: <span className="font-semibold">{formatAmount(discountAmount)}</span></p>
                    <p>Total con Descuento Aplicado: <span className="font-semibold">{formatAmount(finalResult)}</span></p>
                </div>
            )}
        </div>
    );
};

export default TotalCalculatorForm;
