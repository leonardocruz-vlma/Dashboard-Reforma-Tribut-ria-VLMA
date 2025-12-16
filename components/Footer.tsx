import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-12 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-slate-600 font-medium mb-2">
          Material informativo sobre a Reforma Tributária no Brasil.
        </p>
        <p className="text-sm text-slate-500 mb-6 max-w-2xl mx-auto">
          Desenvolvido para apoiar a compreensão estratégica do período de transição.
        </p>
        
        <div className="inline-block bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400">
            <strong>Disclaimer:</strong> Os dados apresentados têm caráter informativo e educacional. 
            As alíquotas exatas dependerão de Leis Complementares e resoluções do Senado. 
            Não substitui análise jurídica individualizada.
          </p>
        </div>
        <p className="text-xs text-slate-300 mt-8">
            &copy; {new Date().getFullYear()} Reforma Visual
        </p>
      </div>
    </footer>
  );
};

export default Footer;
