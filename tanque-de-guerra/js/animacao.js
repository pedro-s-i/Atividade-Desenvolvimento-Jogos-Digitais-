function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
}

Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },

   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },

   desligar: function() {
      this.ligado = false;
   },

   proximoFrame: function() {
      if (!this.ligado) return;

      this.limparTela();

      for (var i in this.sprites)
         this.sprites[i].atualizar();

      for (var i in this.sprites)
         this.sprites[i].desenhar();

      this.sprites = this.sprites.filter(function(sprite) {
         return !sprite.remover;
      });

      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   },

   limparTela: function() {
      var ctx = this.context;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   }
};
