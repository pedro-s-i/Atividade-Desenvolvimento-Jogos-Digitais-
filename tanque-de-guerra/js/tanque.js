/* ============================================================
   tanque.js  -  O personagem (baseado no heroi.js original)
   ------------------------------------------------------------
   Mantém EXATAMENTE a lógica do herói original:
     - anda para a esquerda / direita conforme as setas;
     - guarda a última direção (this.direcao);
     - ao atirar, o projétil segue para o lado da direção atual.
   O que mudou é a APARÊNCIA: em vez de um retângulo preto,
   desenhamos um tanque de guerra (esteiras, casco, torre e
   canhão) que aponta para o lado em que está virado, além de
   novos tamanhos, cores e velocidades.
   ============================================================ */

// Códigos únicos para as direções (iguais aos do original)
var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA  = 2;

function Tanque(context, teclado, animacao) {
   this.context   = context;
   this.teclado   = teclado;
   this.animacao  = animacao;
   this.x         = 0;
   this.y         = 0;
   this.direcao   = DIRECAO_DIREITA;

   // --- Personalização: dimensões e velocidades ---
   this.largura         = 96;  // largura do corpo/esteiras
   this.altura          = 60;  // altura total (torre + casco + esteiras)
   this.velocidade      = 6;   // velocidade de movimento (era 10 no original)
   this.velocidadeTiro  = 15;  // velocidade do disparo   (era 20 no original)
   this.margem          = 12;  // folga nas bordas para o canhão não sumir
   this.flash           = 0;   // contador do clarão do disparo (em frames)
}

Tanque.prototype = {
   atualizar: function() {
      var limiteDireita = this.context.canvas.width - this.largura - this.margem;

      // Movimento para a esquerda
      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > this.margem) {
         this.direcao = DIRECAO_ESQUERDA;
         this.x -= this.velocidade;
      }
      // Movimento para a direita
      else if (this.teclado.pressionada(SETA_DIREITA) && this.x < limiteDireita) {
         this.direcao = DIRECAO_DIREITA;
         this.x += this.velocidade;
      }

      // Consome o clarão do disparo, quadro a quadro
      if (this.flash > 0) this.flash--;
   },

   atirar: function() {
      var tiro = new Projetil(this.context);

      // Posição da boca do canhão depende da direção atual
      var canhaoY = this.y + 19;
      if (this.direcao == DIRECAO_ESQUERDA) {
         tiro.x = this.x - 9;                 // ponta do canhão à esquerda
         tiro.velocidadeX = -this.velocidadeTiro;
      } else {
         tiro.x = this.x + 105;               // ponta do canhão à direita
         tiro.velocidadeX = this.velocidadeTiro;
      }
      tiro.y = canhaoY;

      this.animacao.novoSprite(tiro);
      this.flash = 6; // aciona o clarão do disparo
   },

   desenhar: function() {
      var ctx = this.context;
      var x = this.x, y = this.y;
      var apontaDireita = (this.direcao == DIRECAO_DIREITA);

      ctx.save();

      // Sombra no chão
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath();
      ctx.ellipse(x + 48, y + 60, 54, 8, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Esteiras (parte de baixo)
      this.desenharEsteira(ctx, x, y + 44, 96, 16);

      // Casco (corpo) - trapézio com frente chanfrada
      ctx.fillStyle   = '#5f6b2f';
      ctx.strokeStyle = '#3c4420';
      ctx.lineWidth   = 2;
      ctx.beginPath();
      ctx.moveTo(x + 4,  y + 44);
      ctx.lineTo(x + 12, y + 28);
      ctx.lineTo(x + 84, y + 28);
      ctx.lineTo(x + 92, y + 44);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Faixa de luz no casco
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(x + 14, y + 30, 68, 4);

      // Torre (rotacionada levemente para o lado que aponta)
      ctx.fillStyle   = '#6b7838';
      ctx.strokeStyle = '#3c4420';
      this.retanguloArredondado(ctx, x + 33, y + 10, 30, 20, 5);
      ctx.fill();
      ctx.stroke();

      // Escotilha
      ctx.fillStyle = '#48501f';
      ctx.beginPath();
      ctx.arc(x + 48, y + 19, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Canhão - aponta conforme a direção
      ctx.fillStyle   = '#414a1e';
      ctx.strokeStyle = '#2c3216';
      ctx.lineWidth   = 1.5;
      var canhaoY = y + 19;
      if (apontaDireita) {
         ctx.fillRect(x + 60, canhaoY - 5, 45, 9);
         ctx.strokeRect(x + 60, canhaoY - 5, 45, 9);
         ctx.fillRect(x + 99, canhaoY - 7, 8, 13); // freio de boca
      } else {
         ctx.fillRect(x - 9, canhaoY - 5, 45, 9);
         ctx.strokeRect(x - 9, canhaoY - 5, 45, 9);
         ctx.fillRect(x - 11, canhaoY - 7, 8, 13); // freio de boca
      }

      // Clarão do disparo (aparece por alguns frames após atirar)
      if (this.flash > 0) {
         var bocaX = apontaDireita ? (x + 111) : (x - 11);
         this.desenharClarao(ctx, bocaX, canhaoY, this.flash);
      }

      ctx.restore();
   },

   // --- Auxiliares de desenho ------------------------------------

   desenharEsteira: function(ctx, x, y, largura, altura) {
      ctx.save();
      // Corpo da esteira
      ctx.fillStyle = '#262626';
      this.retanguloArredondado(ctx, x, y, largura, altura, altura / 2);
      ctx.fill();

      // Rodas
      ctx.fillStyle = '#4a4a4a';
      var raio = altura / 2 - 2;
      var cy = y + altura / 2;
      for (var rx = x + raio + 3; rx < x + largura - raio; rx += 16) {
         ctx.beginPath();
         ctx.arc(rx, cy, raio, 0, 2 * Math.PI);
         ctx.fill();
      }
      // Eixos claros nas rodas
      ctx.fillStyle = '#6e6e6e';
      for (var rx2 = x + raio + 3; rx2 < x + largura - raio; rx2 += 16) {
         ctx.beginPath();
         ctx.arc(rx2, cy, 2, 0, 2 * Math.PI);
         ctx.fill();
      }
      ctx.restore();
   },

   desenharClarao: function(ctx, cx, cy, forca) {
      ctx.save();
      var raio = 6 + forca * 1.6;
      var g = ctx.createRadialGradient(cx, cy, 1, cx, cy, raio);
      g.addColorStop(0, 'rgba(255,240,170,0.95)');
      g.addColorStop(0.5, 'rgba(255,150,0,0.7)');
      g.addColorStop(1, 'rgba(255,120,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
   },

   retanguloArredondado: function(ctx, x, y, largura, altura, raio) {
      ctx.beginPath();
      ctx.moveTo(x + raio, y);
      ctx.arcTo(x + largura, y,          x + largura, y + altura, raio);
      ctx.arcTo(x + largura, y + altura, x,           y + altura, raio);
      ctx.arcTo(x,           y + altura, x,           y,          raio);
      ctx.arcTo(x,           y,          x + largura, y,          raio);
      ctx.closePath();
   }
};
