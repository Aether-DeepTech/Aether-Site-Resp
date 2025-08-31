import { Link } from 'react-router-dom';
import InterestForm from '@/components/InterestForm';

const SpecialistForm = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-creato uppercase">
      {/* --- CABEÇALHO PARA DESKTOP --- 
        - É 'fixed' e permite que o conteúdo seja centralizado na tela.
        - Aparece apenas em telas 'md' ou maiores ('hidden md:block').
      */}
      <div className="hidden md:block">
        <div className="fixed top-0 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto p-4">
            <Link to="/" className="inline-block pointer-events-auto">
              <img src="/icone_sem_fundo.png" alt="LOGO AETHER" className="h-20 md:h-28 lg:h-40 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- CABEÇALHO PARA MOBILE --- 
        - Não é 'fixed', ele rola junto com a página, evitando sobreposição.
        - Desaparece em telas 'md' ou maiores ('md:hidden').
      */}
      <header className="w-full z-20 bg-white md:hidden">
        <div className="container mx-auto p-4">
          <Link to="/">
            <img src="/icone_sem_fundo.png" alt="LOGO AETHER" className="h-20 w-auto" />
          </Link>
        </div>
      </header>
      
      {/* --- CONTEÚDO PRINCIPAL --- 
        - 'justify-center' agora pode ser usado em todas as telas.
        - No mobile, o novo <header> (que não é fixo) já empurra o conteúdo para baixo.
        - No desktop, o 'justify-center' centraliza o formulário verticalmente.
      */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pb-12 md:pb-0">
        <div className="w-full max-w-md">
          <p className="text-black text-base md:text-xl leading-relaxed mb-8 text-center md:text-left">
            PARA TESTAR O SISTEMA NO WHATSAPP, PREENCHA AS SEGUINTES INFORMAÇÕES:
          </p>
          <InterestForm />
        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="w-full bg-white py-8 mt-auto border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <a href="https://www.instagram.com/aetherdeeptech" target="_blank" rel="noopener noreferrer" aria-label="INSTAGRAM" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/aether-inteligencia-artificial/" target="_blank" rel="noopener noreferrer" aria-label="LINKEDIN" className="text-gray-500 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
          <div className="text-center">
            <a href="mailto:contato@aetherdeeptech.com" className="text-gray-500 hover:text-black transition-colors text-sm tracking-wider">CONTATO@AETHERDEEPTECH.COM</a>
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