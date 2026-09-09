var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA  = 2;

function Tanque(context, teclado, animacao) {
   this.context   = context;
   this.teclado   = teclado;
   this.animacao  = animacao;
   this.x         = 0;
   this.y         = 0;
   this.direcao   = DIRECAO_DIREITA;

   this.largura        = 96;
   this.altura         = 60;
   this.velocidade     = 6;
   this.velocidadeTiro = 15;
   this.margem         = 12;
   this.flash          = 0;
}

Tanque.prototype = {
   atualizar: function() {
      var limiteDireita = this.context.canvas.width - this.largura - this.margem;

      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > this.margem) {
         this.direcao = DIRECAO_ESQUERDA;
         this.x -= this.velocidade;
      }
      else if (this.teclado.pressionada(SETA_DIREITA) && this.x < limiteDireita) {
         this.direcao = DIRECAO_DIREITA;
         this.x += this.velocidade;
      }

      if (this.flash > 0) this.flash--;
   },

   atirar: function() {
      var tiro = new Projetil(this.context);

      var canhaoY = this.y + 19;
      if (this.direcao == DIRECAO_ESQUERDA) {
         tiro.x = this.x - 9;
         tiro.velocidadeX = -this.velocidadeTiro;
      } else {
         tiro.x = this.x + 105;
         tiro.velocidadeX = this.velocidadeTiro;
      }
      tiro.y = canhaoY;

      this.animacao.novoSprite(tiro);
      this.flash = 6;
   },

   desenhar: function() {
      var ctx = this.context;
      var x = this.x, y = this.y;
      var apontaDireita = (this.direcao == DIRECAO_DIREITA);

      ctx.save();

      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath();
      ctx.ellipse(x + 48, y + 60, 54, 8, 0, 0, 2 * Math.PI);
      ctx.fill();

      this.desenharEsteira(ctx, x, y + 44, 96, 16);

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

      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(x + 14, y + 30, 68, 4);

      ctx.fillStyle   = '#6b7838';
      ctx.strokeStyle = '#3c4420';
      this.retanguloArredondado(ctx, x + 33, y + 10, 30, 20, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#48501f';
      ctx.beginPath();
      ctx.arc(x + 48, y + 19, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle   = '#414a1e';
      ctx.strokeStyle = '#2c3216';
      ctx.lineWidth   = 1.5;
      var canhaoY = y + 19;
      if (apontaDireita) {
         ctx.fillRect(x + 60, canhaoY - 5, 45, 9);
         ctx.strokeRect(x + 60, canhaoY - 5, 45, 9);
         ctx.fillRect(x + 99, canhaoY - 7, 8, 13);
      } else {
         ctx.fillRect(x - 9, canhaoY - 5, 45, 9);
         ctx.strokeRect(x - 9, canhaoY - 5, 45, 9);
         ctx.fillRect(x - 11, canhaoY - 7, 8, 13);
      }

      if (this.flash > 0) {
         var bocaX = apontaDireita ? (x + 111) : (x - 11);
         this.desenharClarao(ctx, bocaX, canhaoY, this.flash);
      }

      ctx.restore();
   },

   desenharEsteira: function(ctx, x, y, largura, altura) {
      ctx.save();
      ctx.fillStyle = '#262626';
      this.retanguloArredondado(ctx, x, y, largura, altura, altura / 2);
      ctx.fill();

      ctx.fillStyle = '#4a4a4a';
      var raio = altura / 2 - 2;
      var cy = y + altura / 2;
      for (var rx = x + raio + 3; rx < x + largura - raio; rx += 16) {
         ctx.beginPath();
         ctx.arc(rx, cy, raio, 0, 2 * Math.PI);
         ctx.fill();
      }
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
