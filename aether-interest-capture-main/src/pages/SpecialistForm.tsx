import { Link } from 'react-router-dom';
import InterestForm from '@/components/InterestForm';

const SpecialistForm = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    // Div principal continua com h-screen para fixar a altura total
    <div className="h-screen bg-white flex flex-col font-creato uppercase">
      {/* --- CABEÇALHO PARA DESKTOP (md e maior) --- */}
      <header className="hidden md:block fixed top-0 left-0 w-full z-20">
        <nav className="container mx-auto flex items-center justify-between p-2 md:py-1 md:px-4">
          <Link to="/" onClick={scrollToTop} className="relative right-[6px]">
            <img 
              src="/icone_sem_fundo.png" 
              alt="LOGO AETHER" 
              className="h-20 md:h-28 lg:h-40 w-auto transition-all duration-300" 
            />
          </Link>
        </nav>
      </header>

      {/* --- CABEÇALHO PARA MOBILE (apenas telas pequenas) --- */}
      <header className="w-full z-20 bg-white md:hidden">
        <div className="container mx-auto p-2">
            <Link to="/" onClick={scrollToTop}>
              <img src="/icone_sem_fundo.png" alt="LOGO AETHER" className="h-20 w-auto" />
            </Link>
        </div>
      </header>
      
      {/* --- CONTEÚDO PRINCIPAL --- */}
      {/* ALTERAÇÃO 1: Removido 'overflow-y-auto' */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pb-12">
        <div className="w-full max-w-md">
          {/* --- ALTERAÇÃO AQUI: LINHA VAZIA PARA AJUSTE MANUAL ---
            - Este 'div' está escondido no mobile ('hidden') e visível no desktop ('md:block').
            - A classe 'h-32' define a altura do espaçamento. 
            - Para descer o texto: AUMENTE o número (ex: h-36, h-40).
            - Para subir o texto: DIMINUA o número (ex: h-28, h-24).
          */}
          <div className="hidden md:block h-8"></div>

          <p className="text-black text-base md:text-xl leading-relaxed mb-8 text-left">
            PARA TESTAR O SISTEMA NO WHATSAPP, PREENCHA AS SEGUINTES INFORMAÇÕES:
          </p>
          <InterestForm />
        </div>
      </main>

      {/* RODAPÉ */}
      {/* ALTERAÇÃO 2: Padding vertical (py-8) reduzido para (py-4) */}
      <footer className="w-full bg-white py-4 border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <a href="https://www.instagram.com/aetherdeeptech" target="_blank" rel="noopener noreferrer" aria-label="INSTAGRAM" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/aether-inteligencia-artificial/" target="_blank" rel="noopener noreferrer" aria-label="LINKEDIN" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
          <div className="text-center">
            <a href="mailto:contato@aetherdeeptech.com" className="text-gray-500 hover:text-black transition-colors text-xs tracking-wider">CONTATO@AETHERDEEPTECH.COM</a>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs tracking-wider">CNPJ: 63.102.535/0001-93</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs tracking-wider">+55 21 97156-5719</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs tracking-wider">© 2025 AETHER INTELIGÊNCIA ARTIFICIAL. TODOS OS DIREITOS RESERVADOS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpecialistForm;