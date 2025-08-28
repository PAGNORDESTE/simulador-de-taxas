import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const App = () => {
  const [valor, setValor] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [bandeira, setBandeira] = useState("Visa / Master");
  const [resultado, setResultado] = useState(null);

  const taxas = {
    "Visa / Master": {
      débito: 1.39,
      parcelas: {
        1: 2.91, 2: 4.68, 3: 5.45, 4: 6.21, 5: 6.95, 6: 7.69,
        7: 8.47, 8: 9.19, 9: 9.91, 10: 10.61, 11: 11.32, 12: 12.01,
        13: 12.70, 14: 13.38, 15: 14.05, 16: 14.72, 17: 15.38, 18: 16.03
      }
    },
    "Outras Bandeiras": {
      débito: 1.45,
      parcelas: {
        1: 3.24, 2: 4.83, 3: 5.60, 4: 6.36, 5: 7.10, 6: 7.84,
        7: 8.67, 8: 9.39, 9: 10.11, 10: 10.81, 11: 11.52, 12: 12.21,
        13: 12.90, 14: 13.58, 15: 14.25, 16: 14.92, 17: 15.58, 18: 16.23
      }
    }
  };

  const calcular = () => {
    const valorNum = parseFloat(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(valorNum) || valorNum <= 0) {
      alert("Digite um valor válido!");
      return;
    }

    let taxa = parcelas === 1 ? taxas[bandeira].débito : taxas[bandeira].parcelas[parcelas];
    let desconto = (valorNum * taxa) / 100;
    let liquido = valorNum - desconto;
    let parcela = parcelas > 1 ? liquido / parcelas : liquido;

    setResultado({
      valorBruto: valorNum.toFixed(2),
      taxa: taxa.toFixed(2),
      desconto: desconto.toFixed(2),
      valorLiquido: liquido.toFixed(2),
      valorParcela: parcela.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 text-gray-900 p-4">
      
      {/* Conteúdo principal */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-xl font-bold text-center text-orange-600 mb-4">
          Simulador de Taxas - PagNordeste
        </h1>

        {/* Valor */}
        <div className="mb-4">
          <label className="block mb-1">Valor da Venda (R$):</label>
          <input
            type="text"
            placeholder="Ex: 100,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Bandeira */}
        <div className="mb-4">
          <label className="block mb-1">Bandeira:</label>
          <select
            value={bandeira}
            onChange={(e) => setBandeira(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="Visa / Master">Visa / Master</option>
            <option value="Outras Bandeiras">Outras Bandeiras</option>
          </select>
        </div>

        {/* Parcelas */}
        <div className="mb-4">
          <label className="block mb-1">Parcelas:</label>
          <select
            value={parcelas}
            onChange={(e) => setParcelas(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          >
            {[...Array(18)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}x
              </option>
            ))}
          </select>
        </div>

        {/* Botão */}
        <button
          onClick={calcular}
          className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 transition"
        >
          Calcular
        </button>

        {/* Resultado */}
        {resultado && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <p><strong>Valor da Venda:</strong> R$ {resultado.valorBruto}</p>
            <p><strong>Taxa aplicada:</strong> {resultado.taxa}%</p>
            <p><strong>Desconto:</strong> R$ {resultado.desconto}</p>
            <p><strong>Valor Líquido:</strong> R$ {resultado.valorLiquido}</p>
            {parcelas > 1 && (
              <p><strong>Valor por Parcela:</strong> R$ {resultado.valorParcela}</p>
            )}
          </div>
        )}
      </div>

      {/* Rodapé */}
      <footer className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PagNordeste - Todos os direitos reservados.  
        <br />
        <a href="mailto:suporte@pagnordeste.com.br" className="text-orange-600 underline">
          suporte@pagnordeste.com.br
        </a>
      </footer>
    </div>
  );
};

export default App;


