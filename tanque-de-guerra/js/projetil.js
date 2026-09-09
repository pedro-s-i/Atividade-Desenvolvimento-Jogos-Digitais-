function Projetil(context) {
   this.context = context;
   this.x = 0;
   this.y = 0;
   this.velocidadeX = 0;
   this.velocidadeY = 0;

   this.comprimento = 18;
   this.altura      = 8;
   this.cor         = '#ffc23d';
   this.remover     = false;
}

Projetil.prototype = {
   atualizar: function() {
      this.x += this.velocidadeX;
      this.y += this.velocidadeY;

      var largura = this.context.canvas.width;
      if (this.x < -40 || this.x > largura + 40) {
         this.remover = true;
      }
   },

   desenhar: function() {
      var ctx = this.context;
      var dir = (this.velocidadeX >= 0) ? 1 : -1;
      var c   = this.comprimento;
      var a   = this.altura;

      ctx.save();

      var centroBrilho = this.x - dir * c * 0.5;
      var brilho = ctx.createRadialGradient(centroBrilho, this.y, 1, centroBrilho, this.y, c);
      brilho.addColorStop(0, 'rgba(255,190,60,0.75)');
      brilho.addColorStop(1, 'rgba(255,120,0,0)');
      ctx.fillStyle = brilho;
      ctx.beginPath();
      ctx.arc(centroBrilho, this.y, c, 0, 2 * Math.PI);
      ctx.fill();

      var caudaX = this.x - dir * c;
      var pescocoX = this.x - dir * a;
      ctx.fillStyle   = this.cor;
      ctx.strokeStyle = '#c85a00';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(caudaX,   this.y - a / 2);
      ctx.lineTo(pescocoX, this.y - a / 2);
      ctx.lineTo(this.x,   this.y);
      ctx.lineTo(pescocoX, this.y + a / 2);
      ctx.lineTo(caudaX,   this.y + a / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillRect(pescocoX - dir * (c - a) / 2, this.y - a / 2 + 1,
                   dir * (c - a) / 2, 2);

      ctx.restore();
   }
};
