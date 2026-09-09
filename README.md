# Atividade - Desenvolvimento de Jogos Digitais

Repositório para a atividade de Jogos Digitais.

## Tema: Tanque de Guerra

Versão personalizada do exercício de aula (personagem que se movimenta e
atira), mantendo a lógica original e trocando toda a identidade visual por
um **tanque de guerra** em um campo de batalha.

### Como executar

Abra o arquivo [`tanque-de-guerra/index.html`](tanque-de-guerra/index.html)
em qualquer navegador moderno. Não é necessário instalar nada.

### Comandos

| Tecla            | Ação                                              |
| ---------------- | ------------------------------------------------- |
| ← Seta esquerda  | Move o tanque para a esquerda                     |
| → Seta direita   | Move o tanque para a direita                      |
| Barra de espaço  | Dispara (o tiro segue a direção do tanque)        |

### Estrutura

```
tanque-de-guerra/
├── index.html        # página principal (abrir esta)
├── css/estilo.css    # aparência da página
├── js/teclado.js     # leitura do teclado
├── js/animacao.js    # laço de animação (game loop)
├── js/cenario.js     # fundo do campo de batalha
├── js/tanque.js      # o personagem (tanque) que anda e atira
├── js/projetil.js    # o disparo (obus)
└── LEIA-ME.txt       # descrição (tema, alterações e comandos)
```

O arquivo `tanque-de-guerra.zip` na raiz é o pacote pronto para entrega.
