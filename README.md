# Deploy automático Heroku24

Este projeto está pronto para deploy automático no Heroku (heroku-24 stack).

## Requisitos
- Procfile presente na raiz: já existe com `web: npm run start`
- Scripts no package.json:
  - `build`: faz build do client e server
  - `start`: roda o servidor a partir de `dist/index.cjs`
- O build do client gera arquivos em `dist/public` (conforme vite.config.ts)
- O build do server gera `dist/index.cjs`

## Pipeline Heroku
1. O Heroku executa `npm install` (instala dependências)
2. O Heroku executa `npm run build` (gera client e server)
3. O Heroku executa o comando do Procfile: `npm run start`

## Observações
- Certifique-se de que variáveis de ambiente necessárias estejam configuradas no painel do Heroku.
- O script de build apaga a pasta dist antes de gerar os arquivos.
- O start usa `NODE_ENV=production`.

## Stack recomendada
```
heroku stack:set heroku-24
```

## Deploy manual
```
git push heroku main
```

## Deploy automático
- Ative o deploy automático pelo painel do Heroku conectando ao seu repositório.

---

Se precisar de buildpacks customizados, adicione pelo painel ou CLI do Heroku.
