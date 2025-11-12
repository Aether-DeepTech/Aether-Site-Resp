import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; // Importando um ícone de loading

const InterestForm = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    especialidade: '',
    telefone: '',
    pacientesMes: '',
    email: ''
  });
  // Novo estado para controlar o loading
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação mais específica
    if (!formData.nomeCompleto || !formData.especialidade || !formData.telefone || !formData.pacientesMes || !formData.email) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    // Expressão regular simples para validar e-mail
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsLoading(true); // Ativa o loading

    try {
      const response = await fetch('https://primary-production-9bb3.up.railway.app/webhook/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Interesse enviado com sucesso!');

        const targetPhoneNumber = '5521971565719';
        const textMessage = `
Olá! Tenho interesse no sistema Aether.

*Nome:* ${formData.nomeCompleto}
*Especialidade:* ${formData.especialidade}
*Telefone:* ${formData.telefone}
*Pacientes/Mês:* ${formData.pacientesMes}
*E-mail:* ${formData.email}
        `;
        
        const encodedMessage = encodeURIComponent(textMessage.trim());
        const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');

        setFormData({
          nomeCompleto: '',
          especialidade: '',
          telefone: '',
          pacientesMes: '',
          email: ''
        });

      } else {
        toast.error('Erro ao enviar formulário');
      }
    } catch (error) {
      toast.error('Erro na conexão com o servidor');
    } finally {
      setIsLoading(false); // Desativa o loading, independente do resultado
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NOME COMPLETO */}
        <div className="space-y-2">
          {/* ALTERAÇÃO: Ajustado tamanho da fonte para melhor leitura em telas pequenas (xs) e maiores (sm) */}
          <label htmlFor="nomeCompleto" className="block text-black text-xs sm:text-sm">
            NOME COMPLETO:
          </label>
          <Input
            id="nomeCompleto"
            name="nomeCompleto"
            type="text"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
            disabled={isLoading} // Desabilita o campo durante o envio
          />
        </div>

        {/* ESPECIALIDADE */}
        <div className="space-y-2">
          <label htmlFor="especialidade" className="block text-black text-xs sm:text-sm">
            ESPECIALIDADE MÉDICA (NUTRIÇÃO E ODONTOLÓGICA INCLUSAS):
          </label>
          <Input
            id="especialidade"
            name="especialidade"
            type="text"
            value={formData.especialidade}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
            disabled={isLoading}
          />
        </div>

        {/* TELEFONE */}
        <div className="space-y-2">
          <label htmlFor="telefone" className="block text-black text-xs sm:text-sm">
            TELEFONE (COM DDD):
          </label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
            disabled={isLoading}
          />
        </div>

        {/* PACIENTES/MÊS */}
        <div className="space-y-2">
          <label htmlFor="pacientesMes" className="block text-black text-xs sm:text-sm">
            QUANTOS PACIENTES ATENDE POR MÊS:
          </label>
          <Input
            id="pacientesMes"
            name="pacientesMes"
            type="number"
            value={formData.pacientesMes}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
            disabled={isLoading}
          />
        </div>

        {/* E-MAIL */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-black text-xs sm:text-sm">
            E-MAIL PARA CONTATO:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-0 border-b border-black rounded-none bg-transparent focus:ring-0 focus:border-b-2 focus:border-black px-0"
            disabled={isLoading}
          />
        </div>

        {/* BOTÃO DE ENVIO */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-transparent text-black border border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-none flex items-center justify-center"
            disabled={isLoading} // Desabilita o botão durante o envio
          >
            {/* ALTERAÇÃO: Lógica para mostrar o ícone de loading ou o texto "ENVIAR" */}
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'ENVIAR'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterestForm;