# Deploy na Vercel - Flya App

## Passos para Deploy

### 1. Via Dashboard da Vercel (Recomendado)

1. **Acesse**: https://vercel.com/
2. **Faça login** com sua conta GitHub
3. **Clique em "New Project"**
4. **Importe seu repositório** do GitHub
5. **Configure as seguintes configurações**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2. Configuração de Variáveis de Ambiente

No dashboard da Vercel, vá para **Settings > Environment Variables** e adicione:

```bash
VITE_APP_NAME=Flya App
VITE_API_URL=https://sua-api.vercel.app
VITE_GROQ_API_KEY=sua_chave_groq_aqui
```

### 3. Via CLI da Vercel

```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 4. Configurações Automáticas

O projeto já inclui:

- ✅ `vercel.json` - Configuração de build e rotas
- ✅ `vite.config.js` - Otimizado para produção
- ✅ Scripts de build no `package.json`
- ✅ Configuração de chunks para otimização

### 5. Domínio Customizado (Opcional)

1. Vá para **Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruído

### 6. Monitoramento

A Vercel fornece:

- Analytics de performance
- Logs de build
- Métricas de Core Web Vitals

## Notas Importantes

- O build é automático a cada push no branch main
- Preview deployments são criados para PRs
- Todas as rotas do React Router são suportadas
- Assets são automaticamente otimizados
