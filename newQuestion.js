var model = require('./model.js');

var question = new model.Question({
    question : "Voce ou algum funcionario fica boa parte do tempo fora da empresa em clientes ou vendendo?",
    answers  : [
        {value : "Nao"},
        {value : "So 1"},
        {value : "Ate 3"},
        {value : "Ate 5"},
        {value : "6 ou mais"}
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
