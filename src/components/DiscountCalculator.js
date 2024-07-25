// DiscountCalculator.js
import React, { useState, useEffect } from 'react';
import CalculatorForm from './CalculatorForm';
import Result from './Result';
import TotalCalculatorForm from './TotalCalculatorForm';

const DiscountCalculator = () => {
    const [discount, setDiscount] = useState('');
    const [limit, setLimit] = useState('');
    const [result, setResult] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [spending, setSpending] = useState('');
    const [finalResult, setFinalResult] = useState(null);
    const [originalAmount, setOriginalAmount] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(null);
    const [isCalculated, setIsCalculated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 

    const formatNumber = (num) => {
        const parsedNum = parseFloat(num);
        return parsedNum % 1 === 0 ? parsedNum.toString() : parsedNum.toFixed(2);
    };

    const calculateResult = () => {
        if (discount.trim() === '') {
            setErrorMessage('El porcentaje de descuento es obligatorio.');
            return;
        } else {
            setErrorMessage('');
        }
        const discountValue = parseFloat(discount) / 100;
        const limitValue = parseFloat(limit);
        if (discountValue > 0 && limitValue > 0) {
            const resultValue = limitValue / discountValue;
            const discountAmountValue = limitValue;
            const finalResultValue = resultValue - discountAmountValue;

            setOriginalAmount(formatNumber(resultValue));
            setDiscountAmount(formatNumber(discountAmountValue));
            setResult(formatNumber(resultValue));
            setFinalResult(formatNumber(finalResultValue));
            setIsCalculated(true);
        } else {
            setResult(null);
            setFinalResult(null);
            setOriginalAmount(null);
            setDiscountAmount(null);
            setIsCalculated(false);
        }
    };

    const calculateFinalResult = () => {
        const spendingValue = parseFloat(spending);
        const discountValue = parseFloat(discount) / 100;
        const limitValue = parseFloat(limit);

        if (spendingValue > 0 && discountValue > 0) {
            let discountAmountValue = spendingValue * discountValue;
            let finalResultValue = spendingValue - discountAmountValue;

            if (discountAmountValue > limitValue) {
                discountAmountValue = limitValue;
                finalResultValue = spendingValue - limitValue;
            }

            setOriginalAmount(formatNumber(spendingValue));
            setDiscountAmount(formatNumber(discountAmountValue));
            setFinalResult(formatNumber(finalResultValue));
        } else {
            setFinalResult(null);
            setOriginalAmount(null);
            setDiscountAmount(null);
        }
    };

    useEffect(() => {
        if (editMode && originalAmount !== null) {
            setSpending(originalAmount);
        }
    }, [editMode, originalAmount]);

    const resetForm = () => {
        setDiscount('');
        setLimit('');
        setResult(null);
        setEditMode(false);
        setSpending('');
        setFinalResult(null);
        setOriginalAmount(null);
        setDiscountAmount(null);
        setIsCalculated(false);
        setErrorMessage('');
    };

    // Verifica si el campo limit está vacío
    const isLimitEmpty = limit.trim() === '';

    // Verifica si el campo spending está vacío
    const isSpendingEmpty = spending.trim() === '';

    // Habilita el botón de calcular si no está en modo edición y el campo spending no está vacío
    const isCalculateButtonDisabled = editMode && isSpendingEmpty;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 md:px-8 md:py-12">
            <h1 className="text-2xl font-bold mb-6 text-white border-black md:text-3xl lg:text-4xl">Optimizador de Descuentos</h1>
            <CalculatorForm 
                discount={discount} 
                limit={limit} 
                setDiscount={setDiscount} 
                setLimit={setLimit} 
                calculateResult={calculateResult} 
                handleKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        if (editMode) {
                            calculateFinalResult();
                        }
                    }
                }} 
                disabled={editMode} 
                errorMessage={errorMessage} // Enviando el mensaje de error
            />
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                {!editMode && (
                    <button 
                        onClick={calculateResult} 
                        className={`py-2 px-4 rounded-md transition duration-300 'bg-transparent border border-black text-black hover:bg-green-100`}
                    >
                        Calcular
                    </button>
                )}
                {!editMode && isCalculated && (
                    <button 
                        onClick={resetForm} 
                        className="bg-transparent border border-black text-black py-2 px-4 rounded-md hover:bg-red-100 transition duration-300 mt-2 sm:mt-0"
                    >
                        Limpiar
                    </button>
                )}
            </div>
            {result !== null && !editMode && (
                <> 
                    <div className="mt-6 text-sm md:text-base text-center text-gray-800">
                        <p>Importe total con descuento optimizado: <span className="font-semibold">${originalAmount}</span></p>
                        <p>Descuento Aplicado (tope de reintegro): <span className="font-semibold">${discountAmount}</span></p>
                        <p>Total a pagar: <span className="font-semibold">${finalResult}</span></p>
                        <Result setEditMode={setEditMode} />
                    </div>
                </>
            )}
            {editMode && (
                <>
                    <TotalCalculatorForm 
                        spending={spending}
                        setSpending={setSpending}
                        finalResult={finalResult}
                        originalAmount={originalAmount}
                        discountAmount={discountAmount}
                    />
                    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                        <button 
                            onClick={calculateFinalResult} 
                            className={`py-2 px-4 rounded-md transition duration-500 ${isCalculateButtonDisabled ? 'bg-transparent text-transparent' : 'bg-transparent border border-black text-black hover:bg-green-100'}`}
                            disabled={isCalculateButtonDisabled} // Desactiva el botón si el campo spending está vacío
                        >
                            Calcular
                        </button>
                        <button 
                            onClick={resetForm} 
                            className="bg-transparent border border-black text-black py-2 px-4 rounded-md hover:bg-red-100 transition duration-300 mt-2 sm:mt-0"
                        >
                            Limpiar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DiscountCalculator;
