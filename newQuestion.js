var model = require('./model.js');

var question = new model.Question({
    question : "Em qual das areas voce sente falta de qualificacao dos seus funcionarios?",
    answers  : [
        {value : "Informatica"},
        {value : "Pacote Office"},
        {value : "Linguas"},
        {value : "Administrativo"},
        {value : "Vendas"}
        {value : "Nenhuma"}
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
