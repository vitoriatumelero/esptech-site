# ESPtech · site

Landing page da ESPtech: React 19 + Tailwind CSS 4, gerada com esbuild e publicada automaticamente no GitHub Pages.

## Colocar no ar (uma vez só)

1. Crie um repositório novo no GitHub, por exemplo `esptech-site`.
2. Envie esta pasta para ele:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/esptech-site.git
   git push -u origin main
   ```
3. No GitHub, abra **Settings → Pages** e, em **Build and deployment → Source**, escolha **GitHub Actions**.
4. Abra a aba **Actions**: o fluxo "Publicar no GitHub Pages" roda sozinho. Quando ficar verde, o site está em
   `https://SEU-USUARIO.github.io/esptech-site/`.

Daí em diante, todo `git push` na branch `main` publica a versão nova. Não precisa rodar nada no computador.

### Domínio próprio (opcional)

Em **Settings → Pages → Custom domain**, digite o domínio (ex.: `esptech.com.br`) e siga as instruções de DNS que o GitHub mostrar.

## Deixar o formulário de contato funcionando

O formulário usa o [FormSubmit](https://formsubmit.co), que é grátis e não precisa de cadastro.

1. Abra `src/config.js` e preencha:
   ```js
   email: 'contato@seudominio.com.br',
   formEndpoint: 'https://formsubmit.co/ajax/contato@seudominio.com.br',
   ```
2. Faça commit e push.
3. Com o site no ar, envie **uma mensagem de teste** pelo formulário. O FormSubmit manda um e-mail de **ativação** para esse endereço: clique no link de confirmação.
4. Pronto: as próximas mensagens chegam direto nesse e-mail, com nome, e-mail, empresa e o desafio do visitante.

Enquanto `formEndpoint` estiver vazio (`''`), o botão abre o app de e-mail do visitante com a mensagem já escrita, então o contato nunca fica quebrado.

> Dica: depois da ativação, o FormSubmit envia um código aleatório que pode substituir o e-mail na URL (`https://formsubmit.co/ajax/CODIGO`), para o endereço não ficar visível no código do site.

## Onde editar cada coisa

| O quê | Arquivo |
| --- | --- |
| E-mail, WhatsApp, redes, CNPJ e cidade | `src/config.js` |
| Linha do tempo, fotos da origem, time e serviços | `src/content.js` |
| Fotos | `public/fotos/` (mesmos nomes, ou ajuste o caminho em `content.js`) |
| Textos e layout das seções | `src/App.jsx` |
| Cores, fontes e animações | `src/styles.css` |
| Título da aba e descrição para Google e WhatsApp | `public/index.html` |

No time, preencha `role` (função), `stack`, `line` (frase), `github` e `linkedin` de cada pessoa. Campos vazios não aparecem na página.

## Rodar no computador (opcional)

Precisa do [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install
npm run dev     # abre em http://localhost:5173 e atualiza a cada alteração
npm run build   # gera a versão final em dist/
```

## Estrutura

```
.github/workflows/deploy.yml   publica no GitHub Pages a cada push
build.mjs                      monta o site (esbuild + Tailwind)
public/                        index.html, favicon e fotos
src/                           App.jsx, config.js, content.js, styles.css, main.jsx
```
