var model = require('./model.js');

var question = new model.Question({
    question : "Em que faixa de faturamento anual a sua empresa se encaixa?",
    answers  : [
        {value : "Ate RS 50 mil/ano"},
        {value : "Ate RS 100 mil/ano"},
        {value : "Ate RS 200 mil/ano"},
        {value : "Ate RS 300 mil/ano"},
        {value : "Ate RS 500 mil/ano"},
        {value : "Ate RS 1 milhao/ano"},
        {value : "Mais de RS 1 milhao/ano"}
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
