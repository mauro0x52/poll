var model = require('./model.js');

var question = new model.Question({
    question : "Voce utiliza algum tipo de vale beneficio para seus funcionarios, como vale alimentacao ou refeicao/restaurante?",
    answers  : [
        {value : "Nao"},
        {value : "Sim, da Ticket"},
        {value : "Sim, da Alelo (Visa Vale)"},
        {value : "Sim, da Sodexo"},
        {value : "Sim, outros"}
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
