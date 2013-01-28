var model = require('./model.js');

var question = new model.Question({
    question : "Em que faixa de faturamento anual sua empresa se encaixa?",
    answers  : [
        {value : "Ate R$ 500 mil/ano"},
        {value : "Ate R$ 1 milhqo/ano"},
        {value : "Ate R$ 5 milhoes/ano"},
        {value : "Ate R$ 10 milhoes/ano"},
        {value : "Mais de R$ 10 milhoes/ano"}
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
