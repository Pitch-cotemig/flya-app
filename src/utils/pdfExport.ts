interface TripData {
  prompt_data: object;
  ai_prompt: string;
  plan_result: string;
}

export const exportToPDF = (tripData: TripData) => {
  // Criar conteúdo HTML para o PDF
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Roteiro de Viagem - Flya</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 40px;
          line-height: 1.6;
          color: #333;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #00bcd4;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #00bcd4;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #00bcd4;
          margin-bottom: 10px;
          border-left: 4px solid #00bcd4;
          padding-left: 10px;
        }
        .content {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          white-space: pre-wrap;
          font-size: 14px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        @media print {
          body { margin: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">✈️ Flya</div>
        <div class="subtitle">Seu Roteiro de Viagem Personalizado</div>
      </div>
      
      <div class="section">
        <div class="section-title">📋 Roteiro Detalhado</div>
        <div class="content">${tripData.plan_result}</div>
      </div>
      
      <div class="section">
        <div class="section-title">📝 Informações do Planejamento</div>
        <div class="content">
          <strong>Dados do Formulário:</strong>
          ${JSON.stringify(tripData.prompt_data, null, 2)}
          
          <strong>Prompt Enviado para IA:</strong>
          ${tripData.ai_prompt}
        </div>
      </div>
      
      <div class="footer">
        <p>Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        <p>Flya - Planejamento de Viagens com IA</p>
      </div>
    </body>
    </html>
  `;

  // Criar blob e download
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Abrir em nova aba para impressão
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
  
  // Limpar URL após um tempo
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const exportToText = (tripData: TripData) => {
  const content = `
ROTEIRO DE VIAGEM - FLYA
========================

ROTEIRO DETALHADO:
${tripData.plan_result}

INFORMAÇÕES DO PLANEJAMENTO:
Dados do Formulário:
${JSON.stringify(tripData.prompt_data, null, 2)}

Prompt Enviado para IA:
${tripData.ai_prompt}

Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
Flya - Planejamento de Viagens com IA
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `roteiro-viagem-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}; 