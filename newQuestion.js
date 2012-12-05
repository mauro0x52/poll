var model = require('./model.js');

var question = new model.Question({
    question : "Quantas pessoas (incluindo voce) trabalham na sua empresa?",
    answers  : [
        {value : "1"},
        {value : "2"},
        {value : "De 3 a 5"},
        {value : "De 6 a 10"},
        {value : "De 11 a 15"},
        {value : "Mais de 15"}
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
