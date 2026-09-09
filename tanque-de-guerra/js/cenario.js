/* ============================================================
   cenario.js  -  Plano de fundo (campo de batalha)
   ------------------------------------------------------------
   Sprite extra criado para a personalização. Segue o mesmo
   "contrato" dos demais sprites (métodos atualizar/desenhar),
   por isso pode entrar na animação como qualquer outro.
   Desenha o céu, o sol, colinas ao fundo, o solo do deserto
   e nuvens que se movem lentamente.
   ============================================================ */

function Cenario(context) {
   this.context = context;

   // Altura em que começa o chão (o restante acima é o céu)
   this.chaoY = Math.round(context.canvas.height * 0.775);

   // Nuvens que deslizam devagar pelo céu
   this.nuvens = [
      { x: 120, y: 70,  escala: 1.0, velocidade: 0.15 },
      { x: 430, y: 45,  escala: 0.7, velocidade: 0.10 },
      { x: 700, y: 95,  escala: 1.2, velocidade: 0.20 }
   ];

   // Detalhes fixos do solo (pedras e tufos), posições pré-definidas
   this.detalhesSolo = [
      { x: 80,  tipo: 'pedra' }, { x: 250, tipo: 'tufo' },
      { x: 470, tipo: 'pedra' }, { x: 610, tipo: 'tufo' },
      { x: 820, tipo: 'pedra' }, { x: 360, tipo: 'tufo' }
   ];
}

Cenario.prototype = {
   atualizar: function() {
      var largura = this.context.canvas.width;

      // Move as nuvens e faz elas reaparecerem do outro lado
      for (var i in this.nuvens) {
         var n = this.nuvens[i];
         n.x += n.velocidade;
         if (n.x - 60 * n.escala > largura) {
            n.x = -60 * n.escala;
         }
      }
   },

   desenhar: function() {
      var ctx  = this.context;
      var w    = ctx.canvas.width;
      var h    = ctx.canvas.height;
      var chao = this.chaoY;

      ctx.save();

      // ----- Céu (gradiente do azul ao tom quente do horizonte) -----
      var ceu = ctx.createLinearGradient(0, 0, 0, chao);
      ceu.addColorStop(0.0, '#3b5566');
      ceu.addColorStop(0.6, '#7fa0b0');
      ceu.addColorStop(1.0, '#e3c48f');
      ctx.fillStyle = ceu;
      ctx.fillRect(0, 0, w, chao);

      // ----- Sol com brilho suave -----
      var solX = w * 0.82, solY = chao * 0.42;
      var brilho = ctx.createRadialGradient(solX, solY, 6, solX, solY, 90);
      brilho.addColorStop(0, 'rgba(255,236,180,0.9)');
      brilho.addColorStop(1, 'rgba(255,236,180,0)');
      ctx.fillStyle = brilho;
      ctx.beginPath();
      ctx.arc(solX, solY, 90, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#ffe9a8';
      ctx.beginPath();
      ctx.arc(solX, solY, 30, 0, 2 * Math.PI);
      ctx.fill();

      // ----- Nuvens -----
      for (var i in this.nuvens) {
         this.desenharNuvem(ctx, this.nuvens[i]);
      }

      // ----- Colinas ao fundo -----
      ctx.fillStyle = '#9a8a5f';
      this.desenharColina(ctx, w * 0.20, chao, 220, 70);
      this.desenharColina(ctx, w * 0.62, chao, 300, 95);
      ctx.fillStyle = '#8a7a50';
      this.desenharColina(ctx, w * 0.42, chao, 260, 55);

      // ----- Solo do deserto -----
      var solo = ctx.createLinearGradient(0, chao, 0, h);
      solo.addColorStop(0, '#c2a468');
      solo.addColorStop(1, '#7d6531');
      ctx.fillStyle = solo;
      ctx.fillRect(0, chao, w, h - chao);

      // Linha do horizonte do solo
      ctx.strokeStyle = 'rgba(90,70,30,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, chao);
      ctx.lineTo(w, chao);
      ctx.stroke();

      // Detalhes do solo (pedras e tufos de mato)
      for (var j in this.detalhesSolo) {
         var d = this.detalhesSolo[j];
         if (d.tipo === 'pedra') this.desenharPedra(ctx, d.x, chao + 30);
         else                    this.desenharTufo(ctx, d.x, chao + 22);
      }

      ctx.restore();
   },

   // --- Auxiliares de desenho ------------------------------------

   desenharNuvem: function(ctx, n) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      var e = n.escala;
      ctx.beginPath();
      ctx.arc(n.x,         n.y,        22 * e, 0, 2 * Math.PI);
      ctx.arc(n.x + 26 * e, n.y - 8 * e, 28 * e, 0, 2 * Math.PI);
      ctx.arc(n.x + 58 * e, n.y,        24 * e, 0, 2 * Math.PI);
      ctx.arc(n.x + 30 * e, n.y + 10 * e, 26 * e, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
   },

   desenharColina: function(ctx, cx, base, largura, altura) {
      ctx.beginPath();
      ctx.moveTo(cx - largura / 2, base);
      ctx.quadraticCurveTo(cx, base - altura, cx + largura / 2, base);
      ctx.closePath();
      ctx.fill();
   },

   desenharPedra: function(ctx, x, y) {
      ctx.save();
      ctx.fillStyle = '#8b8172';
      ctx.beginPath();
      ctx.ellipse(x, y, 12, 7, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#6f6659';
      ctx.beginPath();
      ctx.ellipse(x + 3, y + 2, 6, 3, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
   },

   desenharTufo: function(ctx, x, y) {
      ctx.save();
      ctx.strokeStyle = '#6f7a34';
      ctx.lineWidth = 2;
      for (var k = -2; k <= 2; k++) {
         ctx.beginPath();
         ctx.moveTo(x + k * 3, y + 8);
         ctx.lineTo(x + k * 4, y - 6);
         ctx.stroke();
      }
      ctx.restore();
   }
};
