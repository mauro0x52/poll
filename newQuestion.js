var model = require('./model.js');

var question = new model.Question({
    question : "Sua empresa tem algum plano empresarial de telefonia e internet movel (celulares ou modem)?",
    answers  : [
        {value : "Sim, da Oi"},
        {value : "Sim, da Claro"},
        {value : "Sim, da TIM"},
        {value : "Sim, de outra empresa"},
        {value : "Nao tenho nenhum plano empresarial de telefonia movel"}
    ]
});

model.Question.find(function(err, questions) {
    var i;

    if (err) console.log(err);
    
    for (i = 0; i < questions.length; i ++) {
        questions[i].remove();
    }
    
    question.save(function(err){
        if(err) console.log(err)
        else console.log("Pergunta cadastrada com sucesso!");
    });
});
