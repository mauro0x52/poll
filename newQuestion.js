var model = require('./model.js');

var question = new model.Question({
    question : "Qual das op??es se encaixa melhor no seu dia a dia?",
    answers  : [
        {value : "Sempre consigo cumprir meu planejamento"},
        {value : "No geral, sou produtivo, mas sinto que me falta tempo para algumas tarefas"},
        {value : "Estou sempre correndo e me sobra pouco tempo para planejar"}
    ]
});

question.save(function(err){
    if(err) console.log(err)
});
