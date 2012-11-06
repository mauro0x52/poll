var model = require('./model.js');

var question = new model.Question({
    question : "Voce possui algum plano de saude empresarial?",
    answers  : [
        {value : "Nao e nao tenho interesse"},
        {value : "Nao, mas tenho interesse"},
        {value : "Nao, meu plano e pessoa fisica"},
        {value : "Sim, so plano odontologico"},
        {value : "Sim, so plano de saude"},
        {value : "Sim, completo (odontologico e saude)"}
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
