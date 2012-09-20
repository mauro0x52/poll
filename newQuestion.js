var model = require('./model.js');

var question = new model.Question({
    question : "Em que banco sua empresa tem conta aberta?",
    answers  : [
        {value : "Itau"},
        {value : "Banco do Brasil"},
        {value : "Bradesco"},
        {value : "Santander"},
        {value : "Caixa"},
        {value : "Outros"}
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
