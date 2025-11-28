import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend apenas se a API key estiver configurada
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === '') {
    return null;
  }
  return new Resend(apiKey);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    // Validação básica
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor, insira um email válido.' },
        { status: 400 }
      );
    }

    // Mapear serviços para nomes legíveis
    const serviceMap = {
      'web-development': 'Web Development',
      'ui-ux-design': 'UI/UX Design',
      'devops': 'DevOps',
      'blockchain': 'Blockchain & Smart Contracts',
      'other': 'Other',
    };

    const serviceName = serviceMap[service] || service || 'Não selecionado';

    // Escapar HTML para prevenir XSS
    const escapeHtml = (text) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Verificar se a API key está configurada
    const resend = getResend();
    if (!resend) {
      console.error('RESEND_API_KEY não está configurada');
      // Em desenvolvimento, apenas logar os dados
      console.log('=== DADOS DO FORMULÁRIO RECEBIDOS ===');
      console.log('Nome:', firstName, lastName);
      console.log('Email:', email);
      console.log('Telefone:', phone || 'Não fornecido');
      console.log('Serviço:', serviceName);
      console.log('Mensagem:', message);
      console.log('=====================================');
      
      // Em desenvolvimento, retornar sucesso mesmo sem envio real
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json(
          { 
            success: true,
            message: 'Mensagem recebida! (Modo desenvolvimento - email não enviado. Configure RESEND_API_KEY para envio real.)',
            details: 'Os dados foram logados no console do servidor.'
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Serviço de email não configurado. Configure RESEND_API_KEY no arquivo .env.local',
          details: 'Em desenvolvimento, os dados foram logados no console do servidor.'
        },
        { status: 500 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'tswork.developer@proton.me',
      replyTo: email,
      subject: `Nova mensagem de contato de ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0096c7; border-bottom: 2px solid #0096c7; padding-bottom: 10px;">
            Nova mensagem de contato
          </h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${phone ? escapeHtml(phone) : 'Não fornecido'}</p>
            <p style="margin: 10px 0;"><strong>Serviço:</strong> ${escapeHtml(serviceName)}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Mensagem:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #0096c7; margin-top: 10px; white-space: pre-wrap;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Erro ao enviar email via Resend:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
          details: error.message || 'Erro desconhecido do Resend'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}

