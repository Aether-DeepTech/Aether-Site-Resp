import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal,TrendingDown, Headset, CalendarCheck, LineChart } from 'lucide-react';


const conversation = [
  { sender: 'patient', text: 'OLÁ, GOSTARIA DE AGENDAR UMA CONSULTA COM A DRA. ANA.' },
  { sender: 'bot', text: 'OLÁ! 😊 SOU A ASSISTENTE VIRTUAL DA DRA. ANA. JÁ ENCONTREI SEU CADASTRO:\nNOME: JOÃO\nDATA DE NASCIMENTO: 24/01/1991\nENDEREÇO: AVENIDA DELFIM MOREIRA, LEBLON\nVAMOS PARA O SEU AGENDAMENTO! QUAL DIA E HORÁRIO SERIA IDEAL PARA SUA CONSULTA?🦷✨' },
  { sender: 'patient', text: 'A DOUTORA TEM HORÁRIO DISPONÍVEL SEXTA-FEIRA 15H?' },
  { sender: 'bot', text: 'ESTÁ DISPONÍVEL SIM, QUAL SERIA O MOTIVO DA CONSULTA?😊' },
  { sender: 'patient', text: 'CONSULTA DE ROTINA.' },
  { sender: 'bot', text: 'OK. SUA CONSULTA DE ROTINA FOI CONFIRMADA PARA SEXTA-FEIRA 15H! 🦷📅\nVOCÊ SABE CHEGAR ATÉ A NOSSA CLÍNICA? POSSO TE AJUDAR COM ISSO.' },
  { sender: 'patient', text: 'SEI SIM! MUITO OBRIGADO!' },
  { sender: 'bot', text: 'DE NADA! ATÉ LÁ!😊👋' }
];

const features = [
  { title: "COMO O NOSSO SISTEMA FUNCIONA?", description: "NOSSA INTELIGÊNCIA ARTIFICIAL CONVERSA COM SEUS PACIENTES DE FORMA NATURAL E EFICIENTE. ELA ENTENDE SEU PÚBLICO-ALVO E SE ADAPTA A ELE." },
  { title: "COMO FUNCIONA O AGENDAMENTO DE CONSULTAS?", description: "O AGENTE FAZ O AGENDAMENTO BASEADO NO HORÁRIO DE ATENDIMENTO PADRÃO DO MÉDICO E DEPOIS VERIFICA A DISPONIBILIDADE NO GOOGLE AGENDA. ASSIM QUE A CONSULTA É MARCADA, ELE ENVIA UMA MENSAGEM AO MÉDICO COM AS INFORMAÇÕES SOBRE A CONSULTA E SOBRE O PACIENTE." },
  { title: "COMO FUNCIONA OS LEMBRETES DE CONSULTA?", description: "PROGRAMAMOS NOSSO SISTEMA PARA ENVIAR UMA MENSAGEM AO PACIENTE PARA LEMBRA-LO DA CONSULTA, PODENDO SER ALGUMAS HORAS OU ALGUNS DIAS ANTES." },
  { title: "COMO O AGENTE TIRA AS DÚVIDAS SOBRE AS CONSULTAS?", description: "ANTES DE INSTALAR O SISTEMA NO SEU WHATSAPP NOSSA EQUIPE TE PEDE TODAS AS INFORMAÇÕES SOBRE SUA CLÍNICA, COMO: HORÁRIOS DE ATENDIMENTO, VALORES, PROCEDIMENTOS, EXAMES, ETC. CRIAMOS UMA BASE DE DADOS E TREINAMOS NOSSO AGENTE." },
  { title: "MEU PACIENTE QUER ATENDIMENTO HUMANO, COMO FUNCIONA ESSE DIRECIONAMENTO?", description: "TEMOS ALGUMAS SOLUÇÕES E DEIXAMOS A ESCOLHA DO MÉDICO. TEMOS A POSSIBILIDADE DO AGENTE FAZER O ENVIO DE UM NÚMERO COM ALGUMA RECOMENDAÇÃO (COMO LIGAR OU SÓ MANDAR MENSAGEM) OU APENAS ENVIAR UM REQUERIMENTO PARA UM NÚMERO DIFERENTE INDICANDO O PACIENTE QUE PRECISA DE ATENDIMENTO HUMANO." },
];

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
      <header className="fixed top-0 left-0 w-full bg-white z-20">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Link to="/"><img src="/icone.png" alt="LOGO AETHER" className="h-24 md:h-36 lg:h-48 w-auto transition-all duration-300" /></Link>
          <Link to="/fale-com-especialista" className="border-2 border-black bg-transparent text-red-600 font-bold text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-md transition-all duration-300 hover:bg-black hover:text-white">FALE COM UM ESPECIALISTA</Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 pt-40 md:pt-52 lg:pt-64">
        <div className="w-full max-w-5xl text-center mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-black">TRANSFORME O ATENDIMENTO DA SUA CLÍNICA COM INTELIGÊNCIA ARTIFICIAL</h1>
          <p className="text-gray-700 text-base md:text-xl leading-relaxed">MAIS AGENDAMENTOS, MENOS FALTAS E ATENDIMENTO 24H — TUDO PELO WHATSAPP COM NOSSO SISTEMA TREINADO ESPECIALMENTE PARA A ÁREA MÉDICA.</p>
        </div>
      </main>

      {/* SEÇÃO COM STICKY E ALINHAMENTO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? 'mt-[60px]' : ''
                } ${index === features.length - 1 ? 'h-[40vh]' : 'h-screen'} flex flex-col justify-start`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h2>
                <p className="text-lg md:text-xl text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="md:w-1/2">
            <div className="sticky top-[180px] h-[calc(100vh-180px)] flex items-center">
              <div className="w-full">
                <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] border-4 border-gray-900 shadow-2xl">
                  <div className="w-full h-[600px] bg-gray-100 rounded-[2.2rem] flex flex-col overflow-hidden">
                    <div className="flex-shrink-0 flex items-center p-4 border-b-2 border-gray-300">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">A</div>
                      <div className="ml-3 text-left">
                        <p className="font-bold text-gray-800">AETHER IA</p>
                        <p className="text-sm text-green-600">ONLINE</p>
                      </div>
                    </div>
                    <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end animate-fade-in-up ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow whitespace-pre-line ${msg.sender === 'bot' ? 'bg-white text-gray-800 rounded-bl-none' : 'bg-black text-white rounded-br-none'}`}>
                            <p className="text-sm text-left">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-shrink-0 p-4 bg-gray-200 border-t border-gray-300">
                      <div className="flex items-center space-x-2">
                        <div className="flex-grow bg-white rounded-full px-4 py-2 text-left">
                          <p className="text-gray-500 text-sm">DIGITE UMA MENSAGEM</p>
                        </div>
                        <button className="bg-black rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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

      {/* FRASE CENTRAL */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">AETHER É A SUA MELHOR ESCOLHA</h2>
          <p className="text-lg md:text-xl text-gray-500">NÓS CUIDAMOS DE TUDO PARA VOCÊ</p>
        </div>
      </section>

      {/* NOVA SEÇÃO COM ÍCONES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: <SlidersHorizontal className="w-8 h-8" />, text: 'ALTA PERSONALIZAÇÃO DO SISTEMA' },
              { icon: <TrendingDown className="w-8 h-8" />, text: 'REDUZA O CUSTO OPERACIONAL' },
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

      {/* SEÇÃO PERGUNTAS FREQUENTES */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">PERGUNTAS FREQUENTES</h2>
    <div className="space-y-6">
      {[
        {
          question: "Quantos agentes de atendimento temos funcionando simultaneamente?",
          answer: "Nosso sistema não possui limite de atendimento. Independente do volume de mensagens, todas são respondidas com o mesmo nível de atenção e cuidado."
        },
        {
          question: "Como funciona a personalização do sistema?",
          answer: "Nosso sistema se adapta ao seu público: com tom de voz formal ou informal e leitura de áudio para maior acessibilidade."
        },
        {
          question: "Meu paciente necessita atendimento humano. É possível?",
          answer: "Sim! Fica a seu critério: o agente pode enviar uma solicitação pelo WhatsApp do médico ou encaminhar o número do médico com orientações para o contato."
        },
        {
          question: "Eu preciso configurar o agente manualmente?",
          answer: "Não. Nós cuidamos de tudo para você."
        },
        {
          question: "Como funciona o tempo de resposta do agente? É possível ajustar esse tempo?",
          answer: "Recomendamos um tempo de 10 segundos para uma conversa mais natural. Mas, se preferir, esse tempo pode ser ajustado conforme sua necessidade."
        },
        {
          question: "Como funciona o sistema de agendamento de consultas?",
          answer: "O agente é integrado ao Google Agenda. Ao marcar uma consulta, ele registra o horário e envia os dados pelo WhatsApp ou e-mail. O padrão inclui nome, horário e motivo da consulta, mas podemos adicionar mais informações se necessário."
        }
      ].map((faq, idx) => (
        <FaqItem key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  </div>
</section>

<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 uppercase mb-10">VALORES</h2>

    <div className="w-full border-2 border-black bg-white p-10 rounded-md">
      <div className="mb-10">
        <p className="text-2xl md:text-3xl font-bold mb-4">MENSALIDADE: R$650,00</p>
        <p className="text-lg md:text-xl text-black leading-relaxed">
          ATÉ 200 CONTATOS. CASO ULTRAPASSE O LIMITE MENSAL, TEM UM ADICIONAL DE R$20,00 A CADA 10 CONTATOS.
        </p>
      </div>

      <div>
        <p className="text-2xl md:text-3xl font-bold mb-4">INSTALAÇÃO: R$1500,00</p>
        <p className="text-lg md:text-xl text-black leading-relaxed">
          VALOR ÚNICO PROVENIENTE A INSTALAÇÃO, PERSONALIZAÇÃO E DESENVOLVIMENTO.<br />
          PAGAMENTO REALIZADO EM ATÉ 3 VEZES (SEM JUROS)
        </p>
      </div>
    </div>
  </div>
</section>

      {/* RODAPÉ */}
      <footer className="w-full bg-white py-8 mt-auto border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
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