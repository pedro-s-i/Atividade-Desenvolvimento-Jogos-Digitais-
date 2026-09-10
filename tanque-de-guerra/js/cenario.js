function Cenario(context) {
   this.context = context;

   this.chaoY = Math.round(context.canvas.height * 0.775);

   this.nuvens = [
      { fx: 0.14, fy: 0.20, escala: 1.0 },
      { fx: 0.42, fy: 0.44, escala: 0.8 },
      { fx: 0.76, fy: 0.24, escala: 1.2 }
   ];

   this.detalhesSolo = [
      { fx: 0.09, tipo: 'pedra' }, { fx: 0.27, tipo: 'tufo' },
      { fx: 0.50, tipo: 'pedra' }, { fx: 0.66, tipo: 'tufo' },
      { fx: 0.88, tipo: 'pedra' }, { fx: 0.40, tipo: 'tufo' }
   ];
}

Cenario.prototype = {
   atualizar: function() {
   },

   desenhar: function() {
      var ctx  = this.context;
      var w    = ctx.canvas.width;
      var h    = ctx.canvas.height;
      var chao = this.chaoY;

      ctx.save();

      var ceu = ctx.createLinearGradient(0, 0, 0, chao);
      ceu.addColorStop(0.0, '#3b5566');
      ceu.addColorStop(0.6, '#7fa0b0');
      ceu.addColorStop(1.0, '#e3c48f');
      ctx.fillStyle = ceu;
      ctx.fillRect(0, 0, w, chao);

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

      for (var i in this.nuvens) {
         var n = this.nuvens[i];
         this.desenharNuvem(ctx, n.fx * w, n.fy * chao, n.escala);
      }

      ctx.fillStyle = '#9a8a5f';
      this.desenharColina(ctx, w * 0.20, chao, w * 0.30, chao * 0.18);
      this.desenharColina(ctx, w * 0.62, chao, w * 0.42, chao * 0.26);
      ctx.fillStyle = '#8a7a50';
      this.desenharColina(ctx, w * 0.42, chao, w * 0.36, chao * 0.15);

      var solo = ctx.createLinearGradient(0, chao, 0, h);
      solo.addColorStop(0, '#c2a468');
      solo.addColorStop(1, '#7d6531');
      ctx.fillStyle = solo;
      ctx.fillRect(0, chao, w, h - chao);

      ctx.strokeStyle = 'rgba(90,70,30,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, chao);
      ctx.lineTo(w, chao);
      ctx.stroke();

      for (var j in this.detalhesSolo) {
         var d = this.detalhesSolo[j];
         if (d.tipo === 'pedra') this.desenharPedra(ctx, d.fx * w, chao + 30);
         else                    this.desenharTufo(ctx, d.fx * w, chao + 22);
      }

      ctx.restore();
   },

   desenharNuvem: function(ctx, x, y, escala) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      var e = escala;
      ctx.beginPath();
      ctx.arc(x,          y,          22 * e, 0, 2 * Math.PI);
      ctx.arc(x + 26 * e, y - 8 * e,  28 * e, 0, 2 * Math.PI);
      ctx.arc(x + 58 * e, y,          24 * e, 0, 2 * Math.PI);
      ctx.arc(x + 30 * e, y + 10 * e, 26 * e, 0, 2 * Math.PI);
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
