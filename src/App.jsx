import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign, Moon, Sun, RefreshCcw } from "lucide-react";
import logo from "./assets/logo.png"; // <-- Importa a logo

export default function SimuladorDeTaxas() {
  const [bandeira, setBandeira] = useState("");
  const [valor, setValor] = useState("");
  const [parcelas, setParcelas] = useState("1");
  const [repassar, setRepassar] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setResultado(null); // limpa resultado ao alterar inputs
  }, [bandeira, valor, parcelas, repassar]);

  const taxas = {
    "VISA E MASTER": {
      débito: 1.39,
      parcelas: {
        1: 2.91, 2: 4.68, 3: 5.45, 4: 6.21, 5: 6.95, 6: 7.69,
        7: 8.47, 8: 9.19, 9: 9.91, 10: 10.61, 11: 11.32, 12: 12.01,
        13: 12.70, 14: 13.38, 15: 14.05, 16: 14.72, 17: 15.38, 18: 16.03
      }
    },
    "OUTRAS BANDEIRAS": {
      débito: 1.45,
      parcelas: {
        1: 3.24, 2: 4.83, 3: 5.60, 4: 6.36, 5: 7.10, 6: 7.84,
        7: 8.67, 8: 9.39, 9: 10.11, 10: 10.81, 11: 11.52, 12: 12.21,
        13: 12.90, 14: 13.58, 15: 14.25, 16: 14.92, 17: 15.58, 18: 16.23
      }
    }
  };

  const simular = () => {
    if (!bandeira || !valor || !parcelas) {
      return alert("Preencha todos os campos obrigatórios");
    }

    const valorNum = parseFloat(valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
    const taxaBase = parcelas === "débito" ? taxas[bandeira].débito : taxas[bandeira].parcelas[parcelas];

    let valorFinal;
    let mensagem;

    if (repassar) {
      valorFinal = valorNum / (1 - taxaBase / 100);
      mensagem = `Para repassar a taxa, cobre R$ ${valorFinal.toFixed(2)} do cliente.`;
    } else {
      valorFinal = valorNum * (1 - taxaBase / 100);
      mensagem = `Você irá receber R$ ${valorFinal.toFixed(2)} após a taxa.`;
    }

    setResultado(""); // força atualização
    setTimeout(() => setResultado(mensagem), 10);
  };

  const handleValorChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const floatValue = (parseInt(rawValue, 10) / 100).toFixed(2);
    const formattedValue = `R$ ${floatValue.replace(".", ",")}`;
    setValor(formattedValue);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen py-10`}>
      <div className="max-w-md mx-auto p-6 shadow-2xl rounded-2xl border border-gray-100 bg-opacity-30">

        {/* Logo centralizada */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo Pagnordeste" className="h-16" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            <CreditCard className="text-orange-400" /> Simulador de Taxas
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
          </button>
        </div>

        <label className="block mb-2 font-medium">Bandeira:</label>
        <select
          value={bandeira}
          onChange={(e) => setBandeira(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-orange-500 text-black bg-white"
        >
          <option value="">Selecione</option>
          <option value="VISA E MASTER">VISA E MASTER</option>
          <option value="OUTRAS BANDEIRAS">OUTRAS BANDEIRAS</option>
        </select>

        <label className="block mb-2 font-medium">Tipo de pagamento:</label>
        <select
          value={parcelas}
          onChange={(e) => setParcelas(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-orange-500 text-black bg-white"
        >
          <option value="débito">Débito</option>
          {[...Array(18)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}x</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Valor da venda (R$):</label>
        <input
          type="text"
          value={valor}
          onChange={handleValorChange}
          placeholder="R$ 100,00"
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-orange-500 text-black bg-white"
        />

        <label className="inline-flex items-center mb-6">
          <input
            type="checkbox"
            checked={repassar}
            onChange={() => setRepassar(!repassar)}
            className="mr-2 h-4 w-4 text-orange-600"
          />
          <span>Repassar taxa para o cliente</span>
        </label>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={simular}
          className="w-full bg-orange-500 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-orange-600 transition"
        >
          <RefreshCcw className="w-4 h-4" /> Simular
        </motion.button>

        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl text-center text-lg font-medium"
          >
            <DollarSign className="inline-block mb-1 mr-2 text-orange-400" /> {resultado}
          </motion.div>
        )}
      </div>
    </div>
  );
}

