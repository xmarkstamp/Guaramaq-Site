
# Guarámaq — Landing Page (GitHub Pages)

Este pacote contém os arquivos para publicar uma landing page estática (HTML/CSS/JS) no GitHub Pages, com links de **telefone** e **WhatsApp** em destaque e formulário via **Formspree**.

## 1) Personalize
- **Telefone:** procure por `+5561999999999` e `(61) 9 9999-9999` no `index.html` e substitua pelo seu.
- **WhatsApp:** atualize os links `https://wa.me/5561...` com seu número no formato internacional.
- **Formulário:** crie um endpoint no Formspree e substitua `https://formspree.io/f/SEU_ID`.
- **Domínio:** se desejar, configure um domínio próprio em Settings → Pages (crie o arquivo `CNAME` com seu domínio).

## 2) Publicar no GitHub Pages
1. Crie um repositório (ex.: `guaramaq-pages`).
2. Envie os arquivos (`index.html`, pastas `assets/`, `css/`, `js/`, `favicon.svg`).
3. Em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
4. Aguarde a publicação em `https://SEUUSUARIO.github.io/guaramaq-pages`.

## 3) Dicas para Google Ads (ligações)
- Exiba o **número de telefone em texto** na página (já incluso no header) para facilitar a **verificação** do Google Ads.
- Mantenha textos do anúncio **consistentes** com o título/CTA da página.
- Teste o site no mobile e o funcionamento dos links `tel:` e `wa.me`.

## 4) Otimização
- Comprima imagens (use WebP quando possível).
- Rode o PageSpeed Insights e Lighthouse para acompanhar LCP/CLS/INP.
