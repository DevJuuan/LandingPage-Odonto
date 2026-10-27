# Clínica Odontológica Melhor Sorriso — Landing page

Projeto estático em HTML, CSS e JavaScript, com foco em responsividade, acessibilidade básica e contatos pelo WhatsApp.

## Arquivos

- `index.html`: página principal e copy inicial.
- `styles.css`: identidade visual e layout responsivo.
- `script.js`: menu mobile, links de WhatsApp, formulário que prepara uma mensagem e eventos iniciais no `dataLayer`.
- `privacidade.html`: modelo preliminar de política de privacidade.
- `assets/logo.svg`: símbolo vetorial original.
- `robots.txt` e `sitemap.xml`: modelos que precisam do domínio real.

## Testar localmente

Abra `index.html` no navegador ou use a extensão Live Server do VS Code. A conexão com a internet é necessária para as imagens remotas e a fonte Google Fonts.

## Antes de publicar — obrigatório

1. **Confirmar WhatsApp:** `script.js` usa `5511911111111`, interpretado a partir do número recebido. Faça um teste real com a clínica.
2. **Confirmar tratamentos:** os cards são conteúdo inicial. Remova ou ajuste os serviços que a clínica não oferece.
3. **Identificação profissional:** inserir razão social/nome empresarial, endereço, contatos oficiais, nome e CRO dos responsáveis/profissionais, conforme as exigências aplicáveis do CFO/CRO. Não inventar dados.
4. **Endereço e mapa:** obter endereço completo e incorporar um mapa correto; não foi inventado um endereço.
5. **Redes sociais:** substituir os textos de Instagram/Facebook por links oficiais.
6. **Política de Privacidade:** revisar com a clínica, preencher controlador/canal de privacidade e validar fluxos reais, base legal, retenção e compartilhamentos.
7. **Formulário:** atualmente não envia e-mail nem grava numa planilha. Ele abre o WhatsApp com a mensagem preparada, que o visitante precisa revisar e enviar. Para e-mail/planilha, conectar um serviço/backend, configurar antispam e documentar o tratamento.
8. **Google Analytics 4 / GTM / Meta Pixel:** inserir IDs reais e configurar consentimento e bloqueio de tags até a escolha aplicável do visitante. Nunca enviar nomes, telefones, mensagens ou dados de saúde para ferramentas de analytics.
9. **Conversões:** configurar no GTM/GA4 os eventos `whatsapp_hero`, `whatsapp_contact_info`, `whatsapp_float` e `form_whatsapp_start` (cliques/início do fluxo no WhatsApp), além de `select_implantes`, `select_clareamento`, `select_ortodontia`, `select_facetas`, `select_limpeza` e `select_outros` (interesse em um tratamento, enviado com o parâmetro `interest`). Esses eventos representam cliques/início do fluxo, não um agendamento confirmado.
10. **SEO:** substituir domínio nos metadados/`robots.txt`/`sitemap.xml`, confirmar título e descrição, cadastrar a propriedade no Search Console e revisar indexação.
11. **Domínio e SSL:** configurar domínio no provedor de hospedagem, DNS e HTTPS. Isso não pode ser concluído sem acesso ao domínio/provedor.
12. **Imagens:** as imagens são referências remotas do Unsplash. Para produção, confirme direitos/termos, prefira fotografias autorizadas da clínica e otimize em WebP/AVIF. Não representam necessariamente o espaço real da clínica.
13. **Revisão profissional:** submeter os textos finais à clínica e ao responsável técnico para adequação às normas vigentes de publicidade odontológica.

## Publicação sugerida

Para um site estático, GitHub Pages, Netlify ou Cloudflare Pages podem servir os arquivos. Escolha a conta controlada pelo cliente, conecte o repositório e configure o domínio/HTTPS. Guarde acessos em nome da clínica e entregue instruções de manutenção.

## Nota de privacidade

O código atual não envia formulário para servidor próprio nem instala pixels. A mensagem é montada no navegador e aberta no WhatsApp. Se analytics, pixels, formulários de terceiros, mapas incorporados ou outros serviços forem adicionados, revise a política, os contratos e o consentimento aplicável antes de ativar.

## Melhorias da versão 2

- Ícones SVG no lugar de símbolos de texto; setas padronizadas.
- Entrada animada do hero, barra de progresso de leitura, cabeçalho que compacta ao rolar, menu ativo por seção, menu mobile animado.
- FAQ com abertura suave (uma pergunta por vez), linha dos passos que se desenha, hover dos tratamentos, pulso discreto no botão do WhatsApp.
- Formulário com validação visual, contador de caracteres e confirmação.
- SEO: fontes via `<link>` com preconnect, canonical, Open Graph/Twitter, JSON-LD `Dentist` (sem endereço inventado). Troque `SEU-DOMINIO.com.br` e adicione `og:image`.
- Respeita `prefers-reduced-motion`. A estrutura de pastas agora tem `assets/logo.svg` como o HTML espera.

## Melhorias da versão 3

- Responsividade: corrigido o estouro de largura na seção "Sobre" (colunas com `minmax(0,1fr)`), elementos decorativos que eram cortados e o layout de tablet (empilha até 900 px, menu hambúrguer até 900 px).
- Menos redirecionamentos ao WhatsApp: os cards de tratamento, a seção "Sobre" e os "Passos" agora levam ao formulário (o card já preenche o assunto). O WhatsApp fica no hero, no formulário, no link de contato e no botão flutuante, que só aparece depois do hero e some quando o formulário está visível.
