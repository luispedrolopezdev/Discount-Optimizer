// SuggestionsLink.js
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa'; // Importa el ícono de react-icons

const SuggestionsLink = () => {
    return (
        <a
            href="mailto:luispedrolopezdev@gmail.com?subject=Sugerencias%20para%20el%20optimizador%20de%20descuentos"
            className="fixed bottom-4 right-4 bg-green-400 text-white  py-2 px-4 rounded-full flex items-center hover:bg-white hover:border-white hover:text-green-500 transition duration-300"
            aria-label="Enviar sugerencias"
        >
            <FaQuestionCircle size={24} />
        </a>
    );
};

export default SuggestionsLink;
