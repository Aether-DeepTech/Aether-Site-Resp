import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, TrendingDown, CalendarCheck, LineChart } from 'lucide-react';

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
  { title: "SISTEMA DE ATENDIMENTO", description: "NOSSA INTELIGÊNCIA ARTIFICIAL CONVERSA COM SEUS PACIENTES COM NATURALIDADE E EFICIÊNCIA. ELA ENTENDE SEU PÚBLICO-ALVO, PENSA, E SE ADAPTA A ELE." },
  { title: "AGENDAMENTO DE CONSULTAS", description: "O AGENTE VERIFICA A DISPONIBILIDADE DOS PROFISSIONAIS NO GOOGLE AGENDA. ASSIM QUE A CONSULTA É MARCADA, ELE ENVIA UMA MENSAGEM AO MÉDICO COM AS INFORMAÇÕES SOBRE A CONSULTA E O PACIENTE." },
  { title: "CONFIRMAÇÃO DE PRESENÇA", description: "O SISTEMA ENVIA UMA MENSAGEM AO PACIENTE LEMBRANDO-O DA CONSULTA E SOLICITANDO CONFIRMAÇÃO DE PRESENÇA. GARANTIMOS QUE O SEU TEMPO NÃO SEJA DESPERDIÇADO." },
  { title: "RESPOSTAS ÀS DÚVIDAS DOS PACIENTES", description: "ANTES DE INSTALAR O SISTEMA NO SEU WHATSAPP, NOSSA EQUIPE FAZ UMA ANÁLISE DE TODAS AS INFORMAÇÕES SOBRE SUA CLÍNICA (HORÁRIOS DE ATENDIMENTO, VALORES, PROCEDIMENTOS, EXAMES, ETC.) E CRIA UMA BASE DE DADOS PARA TREINAR O NOSSO AGENTE. TODOS OS DADOS SÃO PROTEGIDOS DE ACORDO COM A LEI GERAL DE PROTEÇÃO DE DADOS." },
  { title: "INTEGRAÇÃO COM ATENDIMENTO HUMANO", description: "OFERECEMOS DUAS OPÇÕES. NA PRIMEIRA, O AGENTE ENVIA UM NÚMERO DE CONTATO COM INSTRUÇÕES. NA SEGUNDA, É ENVIADA UMA SOLICITAÇÃO PARA UM NÚMERO DIFERENTE, INDICANDO QUE O PACIENTE PRECISA DE ATENDIMENTO HUMANO." },
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-2 border-black bg-white rounded-md p-6 cursor-pointer transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h3 className="text-lg md:text-xl font-bold mb-2">{question}</h3>
      {isOpen && (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {answer}
        </p>
      )}
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
      if (startIndex === 0) setMessages([]);
      if (startIndex < conversation.length) {
        setMessages((prev) => [...prev, conversation[startIndex]]);
        timeoutId = setTimeout(() => startAnimation(startIndex + 1), 2500);
      } else {
        timeoutId = setTimeout(() => startAnimation(0), 5000);
      }
    };
    startAnimation();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-creato uppercase">
      {/* --- CABEÇALHO --- */}
<header className="fixed top-0 left-0 w-full bg-white z-20">
  <nav className="container mx-auto flex items-center justify-between p-2 md:py-1 md:px-4">
    {/* Altura do logo diminuída no desktop (md:h-28) para reduzir o cabeçalho */}
    <Link to="/"><img src="/icone.png" alt="LOGO AETHER" className="h-20 md:h-28 lg:h-40 w-auto transition-all duration-300" /></Link>
    
    <div className="hidden md:flex items-center space-x-8">
      {/* ALTERAÇÃO: 
        - A classe 'text-sm' foi alterada para 'md:text-lg lg:text-xl'.
        - Isso aumenta a fonte em telas médias (md) e a deixa ainda maior em telas grandes (lg).
      */}
      <a href="#sistemas" className="text-black font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600">Sistemas</a>
      <a href="#faq" className="text-black font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600">Perguntas Frequentes</a>
      <a href="#valores" className="text-black font-bold text-sm md:text-lg lg:text-xl transition-colors hover:text-gray-600">Valores</a>
    </div>

    <Link to="/fale-com-especialista" className="border-2 border-black bg-transparent text-black font-bold text-center text-xs sm:text-sm md:text-base px-3 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 hover:bg-black hover:text-white md:whitespace-nowrap">
      TESTE O NOSSO SISTEMA
    </Link>
  </nav>
</header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-grow container mx-auto px-4 pt-28 md:pt-52 lg:pt-64">
        <div className="w-full max-w-5xl text-center mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-black">REVOLUCIONE O ATENDIMENTO DA SUA CLÍNICA COM INTELIGÊNCIA ARTIFICIAL</h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed">MAIS AGENDAMENTOS, MENOS FALTAS E ATENDIMENTO 24H — TENHA UM ESPECIALISTA NA ÁREA MÉDICA ATENDENDO O SEU WHATSAPP A TODO MOMENTO.</p>
        </div>
      </main>

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
                <p className="text-base md:text-xl text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            {/* ********************************************************************************
              *** A ALTERAÇÃO ESTÁ NA LINHA ABAIXO ***
              *** Ajustei o 'top' para valores responsivos que acompanham a altura do header ***
              ********************************************************************************
            */}
            <div className="relative md:sticky md:top-36 lg:top-48 md:h-screen flex items-start md:items-center">
              <div className="w-full">
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
                            <p className="text-xs text-left">{msg.text}</p>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* O restante do código permanece o mesmo */}

      <section className="py-12 md:py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">AETHER É A MELHOR ESCOLHA PARA O SEU NEGÓCIO</h2>
          <p className="text-base md:text-xl text-gray-500">REVOLUCIONAMOS SUA GESTÃO E A EXPERIÊNCIA DOS SEUS CLIENTES.</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: <SlidersHorizontal className="w-8 h-8" />, text: 'PERSONALIZE O SISTEMA DO SEU JEITO' },
              { icon: <TrendingDown className="w-8 h-8" />, text: 'REDUZA O SEU CUSTO OPERACIONAL' },
              { icon: <CalendarCheck className="w-8 h-8" />, text: 'CONVERTA MAIS AGENDAMENTOS' },
              { icon: <LineChart className="w-8 h-8" />, text: 'AUMENTO NO COMPARECIMENTO DAS CONSULTAS' }
            ].map(({ icon, text }, idx) => (
              <div key={idx} className="border-2 border-black bg-white px-6 py-8 rounded-md shadow flex flex-col items-center">
                <div className="mb-4 text-black">{icon}</div>
                <p className="text-sm md:text-base font-semibold uppercase">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="faq" className="py-12 md:py-20 bg-white scroll-mt-28 md:scroll-mt-52 lg:scroll-mt-64">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">PERGUNTAS FREQUENTES</h2>
          <div className="space-y-6">
            {[
              { question: "Quantos agentes de atendimento temos funcionando simultaneamente?", answer: "Nosso sistema não possui limite de atendimento. Independentemente do volume de mensagens, todas são respondidas com o mesmo nível de atenção e velocidade." },
              { question: "Como funciona a personalização do sistema?", answer: "Adaptamos o sistema conforme as suas necessidades e desejos: Com tom de voz formal ou informal, mensagens mais curtas ou mais extensas e personalização na captação de informações dos pacientes, garantimos que o atendimento fiquedo seu jeito." },
              { question: "Meu paciente necessita de atendimento humano. O que eu faço?", answer: "Direcionamos o paciente diretamente à você: Enviamos uma solicitação pelo WhatsApp do médico ou encaminhamos o seu contato com orientações." },
              { question: "Eu preciso configurar o agente manualmente?", answer: "Não. Nós cuidamos de tudo para você, basta nos passar as suas preferências." },
              { question: "Como funciona o tempo de resposta do agente? É possível ajustar esse tempo?", answer: "O agente responde em 7 segundos, garantindo que o paciente se mantenha na conversa. Esse tempo pode ser ajustado conforme sua necessidade." },
              { question: "Como funciona o sistema de agendamento de consultas?", answer: "O agente é integrado ao Google Agenda. Ao marcar uma consulta, ele registra automaticamente o horário e envia as informações para o profissional via WhatsApp ou e-mail. O padrão inclui nome, horário e motivo da consulta, contando com possibilidade de personalização." }
            ].map((faq, idx) => (
              <FaqItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section id="valores" className="py-12 md:py-20 bg-white scroll-mt-28 md:scroll-mt-52 lg:scroll-mt-64">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black uppercase mb-10">VALORES</h2>
          <div className="w-full border-2 border-black bg-white p-6 md:p-10 rounded-md">
            <div className="mb-10">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">MENSALIDADE: R$650,00</p>
              <p className="text-base md:text-xl text-black leading-relaxed">
                ATÉ 200 CONTATOS. AO ULTRAPASSAR O LIMITE MENSAL, TEM UM ADICIONAL DE R$20,00 A CADA 10 CONTATOS.
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">INSTALAÇÃO: R$1500,00</p>
              <p className="text-base md:text-xl text-black leading-relaxed">
                VALOR ÚNICO REFERENTE A INSTALAÇÃO, PERSONALIZAÇÃO E DESENVOLVIMENTO.<br />
                PAGAMENTO REALIZADO EM ATÉ 3 VEZES (SEM JUROS)
              </p>
            </div>
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