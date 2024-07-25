// CalculatorForm.js
import React from 'react';

const CalculatorForm = ({ discount, limit, setDiscount, setLimit, calculateResult, handleKeyPress, disabled, errorMessage }) => {

    // Función para manejar el evento de perder el foco en el campo de descuento
    const handleBlur = () => {
        if (parseFloat(discount) > 100) {
            setDiscount('100');
        }
    };

    return (
        <>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Porcentaje de Descuento (%)</label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={discount} 
                        onChange={(e) => setDiscount(e.target.value)} 
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}  // Agrega el manejador de blur aquí
                        className={`pr-10 pl-4 py-2 rounded-md border border-transparent focus:border-transparent focus:ring-2 focus:ring-green-400 outline-none appearance-none ${disabled ? 'bg-green-600 text-white' : 'bg-white'} w-full`}
                        disabled={disabled}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errorMessage && <p className="text-red-500 text-xs mt-1">* {errorMessage}</p>} {/* Mensaje de error */}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Tope de Reintegro</label>
                <div className="relative">
                    <span className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${disabled ? 'text-white' : 'text-gray-500'}`}>$</span>
                    <input 
                        type="number" 
                        value={limit} 
                        onChange={(e) => setLimit(e.target.value)} 
                        onKeyPress={handleKeyPress}
                        className={`pl-8 pr-4 py-2 rounded-md border border-transparent focus:border-transparent focus:ring-2 focus:ring-green-400 outline-none appearance-none ${disabled ? 'bg-green-600 text-white' : 'bg-white'} w-full`}
                        disabled={disabled}
                    />
                </div>
            </div>
        </>
    );
};

export default CalculatorForm;
