function Sprite(exemplo = {}){
    var {
        x = 0,
        y = 0,

        w = 30,

        vx = 0,
        vy = 0,

        color = "blue",

        ponto = 0,
        imune = 0,

        atirando = 0
    } = exemplo;

    this.x = x;
    this.y = y;

    this.w = w;

    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.ponto = ponto;
    this.imune = imune;
    this.atirando = atirando;
}

Sprite.prototype = new Sprite({});
Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx){
    ctx.fillStyle= this.color;
    ctx.strokeStyle="black";
    if (this.imune > 1){
        ctx.globalAlpha = 0.5*Math.cos(60*this.imune);
    }
    ctx.fillRect(this.x,this.y,this.w,this.w);
    ctx.globalAlpha = 1;
}

Sprite.prototype.mover = function(dt){
    this.x = this.x + this.vx*dt*2;
    this.y = this.y + this.vy*dt*2;
    if (this.imune >= 0){
        this.imune = this.imune - 1*dt;
    }
    if (this.atirando >= 0){
        this.atirando = this.atirando - 1*dt;
    }
}

Sprite.prototype.colidiuCom = function(alvo){
    if(alvo.x+alvo.w < this.x)
        return false;
    if(alvo.x > this.x+this.w)
        return false; 
    if(alvo.y+alvo.w < this.y)
        return false;
    if(alvo.y > this.y+this.w)
        return false;
    return true;
}

Sprite.prototype.perseguir = function(opcoes){
    if(Math.sqrt(((opcoes.alvo.x - this.x)*(opcoes.alvo.x - this.x))+((opcoes.alvo.y-this.y)*(opcoes.alvo.y - this.y))) - 30 >= 100){
        this.vx = 40*Math.sign(opcoes.alvo.x + opcoes.alvo.vx - this.x);
        this.vy = 40*Math.sign(opcoes.alvo.y +opcoes.alvo.vy - this.y);
    }
    else{
        this.vx = 30*Math.sign(opcoes.alvo.x - this.x);
        this.vy = 30*Math.sign(opcoes.alvo.y - this.y);
    }
}

Sprite.prototype.controlePorTeclas = function(opcoes){
    if (!opcoes.teclas.esquerda && !opcoes.teclas.direita){
        this.vx=0;
    }
    if (opcoes.teclas.esquerda){this.vx = -110};
    if (opcoes.teclas.direita){this.vx = 110};
    if (!opcoes.teclas.cima && !opcoes.teclas.baixo){
        this.vy=0;
    }
    if (opcoes.teclas.cima){this.vy = -110};
    if (opcoes.teclas.baixo){this.vy = 110};
}

Sprite.prototype.addPonto = function(alvo){
    if(alvo.imune < 1){
        this.ponto = this.ponto + 1;
    }
}

Sprite.prototype.removePonto = function(){
    if(this.imune < 1){
        this.ponto = this.ponto - 1;
        this.imune = 3;
    }
}

Sprite.prototype.getPonto = function(){
    return this.ponto;
}