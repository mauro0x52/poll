var model = require('./model.js');

var question = new model.Question({
    question : "Sua empresa possui algum plano empresarial de telefone fixo, internet e/ou TV?",
    answers  : [
        {value : "Sim, da Vivo (Telefônica)"},
        {value : "Sim, da Claro ou Embratel"},
        {value : "Sim, da TIM ou Intelig"},
        {value : "Sim, da Oi"},
        {value : "Sim, de outra empresa"},
        {value : "Nao tenho nenhum plano empresarial de telefonia fica, internet ou TV"}
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
