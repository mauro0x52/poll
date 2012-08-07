var model = require('./model.js');

var question = new model.Question({
    question : "O que você acha do Empreendemia ser integrado com ferramentas de gestão?",
    answers  : [
        {value : "Muito bom"},
        {value : "Bom"},
        {value : "Indiferente"},
        {value : "Ruim"}
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
