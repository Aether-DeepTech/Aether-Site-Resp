import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, TrendingDown, CalendarCheck, LineChart, ChevronDown } from 'lucide-react';

const conversation = [
  { sender: 'patient', text: 'OLÁ, GOSTARIA DE AGENDAR UMA CONSULTA COM A DRA. ANA.' },
  { sender: 'bot', text: 'OLÁ! 😊 SOU A ASSISTENTE VIRTUAL DA DRA. ANA. POR FAVOR, ENVIE SEU NOME COMPLETO E DATA DE NASCIMENTO PARA QUE EU FAÇA SEU CADASTRO. ✨' },
  { sender: 'patient', text: 'NOME: JOÃO \nDATA DE NASCIMENTO: 24/01/1991' },
  { sender: 'bot', text: 'PERFEITO! ME FALE QUE DIA E HORÁRIO SERIA MELHOR PARA A SUA CONSULTA.😊' },
  { sender: 'patient', text: 'A DOUTORA TEM HORÁRIO DISPONÍVEL SEXTA-FEIRA 15H?' },
  { sender: 'bot', text: 'ESTÁ DISPONÍVEL SIM, QUAL SERIA O MOTIVO DA CONSULTA?😊' },
  { sender: 'patient', text: 'CONSULTA DE ROTINA.' },
  { sender: 'bot', text: 'OK. SUA CONSULTA DE ROTINA FOI CONFIRMADA PARA SEXTA-FEIRA 15H! 📅\nVOCÊ SABE CHEGAR ATÉ A NOSSA CLÍNICA? POSSO TE AJUDAR COM ISSO.' },
  { sender: 'patient', text: 'SEI SIM! MUITO OBRIGADO!' },
  { sender: 'bot', text: 'DE NADA! ATÉ LÁ!😊👋' }
];

const features = [
  { title: "SISTEMA DE ATENDIMENTO", description: "Nossa Inteligência Artificial conversa com seus pacientes com naturalidade e eficiência. Ela entende seu público-alvo, pensa, e se adapta a ele." },
  { title: "AGENDAMENTO DE CONSULTAS", description: "O agente verifica a disponibilidade dos profissionais no Google Agenda. Assim que a consulta é marcada, ele envia uma mensagem ao médico com as informações sobre a consulta e o paciente." },
  { title: "CONFIRMAÇÃO DE PRESENÇA", description: "O sistema envia uma mensagem ao paciente lembrando-o da consulta e solicitando confirmação de presença. Garantimos que o seu tempo não seja desperdiçado." },
  { title: "RESPOSTAS ÀS DÚVIDAS DOS PACIENTES", description: "Antes de instalar o sistema no seu WhatsApp, nossa equipe faz uma análise de todas as informações sobre sua clínica (horários de atendimento, valores, procedimentos, exames, etc.) e cria uma base de dados para treinar o nosso agente. Todos os dados são protegidos de acordo com a Lei Geral de Proteção de Dados." },
  { title: "INTEGRAÇÃO COM ATENDIMENTO HUMANO", description: "Oferecemos duas opções. Na primeira, o agente envia um número de contato com instruções. Na segunda, é enviada uma solicitação para um número diferente, indicando que o paciente precisa de atendimento humano." },
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-2 border-black bg-white rounded-md p-4 md:p-6 cursor-pointer transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-bold normal-case">{question}</h3>
        <ChevronDown 
          className={`w-6 h-6 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      {isOpen && (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4 normal-case">
          {answer}
        </p>
      )}
    </div>
  );
}

function PhoneMockup({ messages, chatContainerRef }: { messages: typeof conversation, chatContainerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-[2.2rem] border-4 border-gray-900 shadow-2xl">
      <div className="w-full h-[450px] md:h-[500px] bg-gray-100 rounded-[2rem] flex flex-col overflow-hidden">
        <div className="flex-shrink-0 flex items-center p-3 border-b-2 border-gray-300">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-base">A</div>
          <div className="ml-2 text-left">
            <p className="font-bold text-sm text-gray-800">AETHER IA</p>
            <p className="text-xs text-green-600">ONLINE</p>
          </div>
        </div>
        <div ref={chatContainerRef} className="flex-grow p-3 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end animate-fade-in-up ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-xl px-3 py-2 shadow whitespace-pre-line ${msg.sender === 'bot' ? 'bg-white text-gray-800 rounded-bl-none' : 'bg-black text-white rounded-br-none'}`}>
                <p className="text-xs text-left normal-case">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 p-2 bg-gray-200 border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <div className="flex-grow bg-white rounded-full px-3 py-1.5 text-left">
              <p className="text-gray-400 text-xs">DIGITE UMA MENSAGEM</p>
            </div>
            <button className="bg-black rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<typeof conversation>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const startAnimation = (startIndex = 0) => {
      if (startIndex < conversation.length) {
        setMessages((prev) => [...prev, conversation[startIndex]]);
        timeoutId = setTimeout(() => startAnimation(startIndex + 1), 2500);
      }
    };
    
    setMessages([]);
    startAnimation();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerElement = document.querySelector('header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-creato uppercase">
      {/* --- CABEÇALHO --- */}
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-20">
        <nav className="container mx-auto flex items-center justify-between p-2 md:py-1 md:px-4">
          <Link to="/" onClick={scrollToTop}>
            <img 
              src="/icone_sem_fundo.png" 
              alt="LOGO AETHER" 
              className="h-20 md:h-28 lg:h-40 w-auto transition-all duration-300 dark:hidden" 
            />
            <img 
              src="/icone_sem_fundo_b.png" 
              alt="LOGO AETHER" 
              className="hidden h-20 md:h-28 lg:h-40 w-auto transition-all duration-300 dark:block" 
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#sistemas" onClick={handleSmoothScroll} className="text-black dark:text-white font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600 dark:hover:text-gray-400">Sistemas</a>
            <a href="#faq" onClick={handleSmoothScroll} className="text-black dark:text-white font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600 dark:hover:text-gray-400">Perguntas Frequentes</a>
            <a href="#sobre-nos" onClick={handleSmoothScroll} className="text-black dark:text-white font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600 dark:hover:text-gray-400">Sobre Nós</a>
          </div>
          <Link to="/fale-com-especialista" className="border-2 border-black dark:border-white bg-transparent text-black dark:text-white font-bold text-center text-xs sm:text-sm md:text-base px-3 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black md:whitespace-nowrap">
            TESTE O NOSSO SISTEMA
          </Link>
        </nav>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-grow container mx-auto px-4 pt-28 md:pt-52 lg:pt-64">
        <div className="w-full max-w-5xl text-center mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-black">
            REVOLUCIONE O ATENDIMENTO DA SUA CLÍNICA COM INTELIGÊNCIA ARTIFICIAL
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed normal-case">
            Transforme seu WhatsApp em um assistente virtual que agenda consultas, qualifica pacientes e integra tudo à sua agenda. Tenha um especialista em saúde trabalhando para você, 24 horas por dia, enquanto nossa equipe 100% te dá suporte 100% personalizado.
          </p>
        </div>
      </main>
      
      {/* --- CELULAR VISÍVEL APENAS EM TELAS PEQUENAS (MOBILE) --- */}
      <section className="py-12 md:hidden container mx-auto px-4">
          <PhoneMockup messages={messages} chatContainerRef={chatContainerRef} />
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: <SlidersHorizontal className="w-8 h-8" />, text: 'PERSONALIZE O SISTEMA DO SEU JEITO' },
              { icon: <TrendingDown className="w-8 h-8" />, text: 'REDUZA O SEU CUSTO OPERACIONAL' },
              { icon: <CalendarCheck className="w-8 h-8" />, text: 'CONVERTA MENSAGENS EM CONSULTAS' },
              { icon: <LineChart className="w-8 h-8" />, text: 'MENOS FALTAS, AGENDA CHEIA' }
            ].map(({ icon, text }, idx) => (
              <div key={idx} className="border-2 border-black bg-white px-6 py-8 rounded-md shadow flex flex-col items-center">
                <div className="mb-4 text-black">{icon}</div>
                <p className="text-sm md:text-base font-semibold uppercase">{text}</p>
              </div>
            ))}
          </div>
          {/* --- ALTERAÇÃO AQUI: Tamanho do botão e fonte restaurados --- */}
          <div className="text-center mt-16">
            <Link 
              to="/fale-com-especialista" 
              className="border-2 border-black bg-[#ff0000] text-white font-bold text-center text-sm md:text-base px-8 py-4 rounded-md transition-all duration-300 hover:bg-red-700 hover:border-black md:whitespace-nowrap"
            >
              TESTE GRÁTIS POR 30 DIAS
            </Link>
          </div>
        </div>
      </section>
      
      {/* --- SEÇÃO DE FEATURES E TELEFONE --- */}
      <section id="sistemas" className="py-12 md:py-20 bg-white scroll-mt-28 md:scroll-mt-52 lg:scroll-mt-64">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:gap-16">
          <div className="md:w-1/2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col justify-start mb-12 md:mb-0 md:h-[60vh]"
              >
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{feature.title}</h2>
                <p className="text-base md:text-xl text-gray-600 normal-case">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="hidden md:block md:w-1/2 mt-8 md:mt-0">
            <div className="relative md:sticky top-[180px] md:h-[calc(100vh-180px)] flex items-start md:items-center">
              <div className="w-full">
                <PhoneMockup messages={messages} chatContainerRef={chatContainerRef} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="faq" className="py-12 md:py-20 bg-white scroll-mt-28 md:scroll-mt-52 lg:scroll-mt-64">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">PERGUNTAS FREQUENTES</h2>
          <div className="space-y-6">
            {[
              { question: "Como funciona o teste grátis?", answer: "Instalamos nosso agente na sua clínica, integrando-o a sua agenda e seu Whatsapp. O sistema fica disponível gratuitamente por 30 dias, sem necessidade de registrar seu cartão de crédito." },
              { question: "Quantos agentes de atendimento temos funcionando simultaneamente?", answer: "Nosso sistema não possui limite de atendimento. Independentemente do volume de mensagens, todas são respondidas com o mesmo nível de atenção e velocidade." },
              { question: "Como funciona a personalização do sistema?", answer: "Adaptamos o sistema conforme as suas necessidades e desejos: Com tom de voz formal ou informal, mensagens mais curtas ou mais extensas e personalização na captação de informações dos pacientes, garantimos que o atendimento fique do seu jeito." },
              { question: "Meu paciente necessita de atendimento humano. O que eu faço?", answer: "Direcionamos o paciente diretamente à você: Enviamos uma solicitação pelo WhatsApp do médico ou encaminhamos o seu contato com orientações." },
              { question: "Eu preciso configurar o agente manualmente?", answer: "Não. Nós cuidamos de tudo para você, basta nos passar as suas preferências." },
              { question: "Como funciona o tempo de resposta do agente? É possível ajustar esse tempo?", answer: "O agente responde em 7 segundos, garantindo que o paciente se mantenha na conversa. Esse tempo pode ser ajustado conforme sua necessidade." },
              { question: "Como funciona o sistema de agendamento de consultas?", answer: "O agente é integrado ao Google Agenda. Ao marcar uma consulta, ele registra automaticamente o horário e envia as informações para o profissional via WhatsApp ou e-mail. O padrão inclui nome, horário e motivo da consulta, contando com possibilidade de personalização." }
            ].map((faq, idx) => (
              <FaqItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          {/* --- ALTERAÇÃO AQUI: Tamanho do botão retornado ao padrão anterior --- */}
          <div className="text-center mt-16">
            <Link to="/fale-com-especialista" className="border-2 border-black dark:border-white bg-transparent text-black dark:text-white font-bold text-center text-sm md:text-base px-8 py-4 rounded-md transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black md:whitespace-nowrap">
              FALE COM UM ESPECIALISTA
            </Link>
          </div>
        </div>
      </section>

      <section id="sobre-nos" className="py-12 md:py-20 bg-white scroll-mt-28 md:scroll-mt-52 lg:scroll-mt-64">
    <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-12">SOBRE NÓS</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-700 text-base md:text-xl text-left leading-relaxed normal-case">
            <p>
                A Aether Inteligência Artificial nasceu da visão de acadêmicos e professores da FGV e do Ibmec, unindo excelência acadêmica e inovação tecnológica para transformar a área da saúde.
            </p>
            <p>
                Nosso propósito é democratizar o acesso às tecnologias de Inteligência Artificial, tornando-as ferramentas acessíveis, seguras e eficazes para clínicas, consultórios e profissionais de saúde.
            </p>
            <p>
                Acreditamos que a tecnologia deve estar a serviço das pessoas. Por isso, desenvolvemos soluções que otimizam processos, reduzem custos operacionais e melhoram a experiência do paciente, como nossos sistemas de atendimento inteligente e humanizado. 
                
                
            </p>
            <p>
                Além disso, criamos sistemas de informação especializados para maquinário hospitalar, aumentando a eficiência e a segurança nos cuidados de saúde. Combinamos ciência, ética e inovação para entregar resultados reais e impulsionar o futuro da saúde, com atuação em toda a América Latina.
            </p>
        </div>
    </div>
</section>

      <footer className="w-full bg-white py-8 mt-auto border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-6">
            <a href="https://www.instagram.com/aetherdeeptech" target="_blank" rel="noopener noreferrer" aria-label="INSTAGRAM" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/aether-inteligencia-artificial/" target="_blank" rel="noopener noreferrer" aria-label="LINKEDIN" className="text-gray-500 hover:text-black transition-colors">
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
}