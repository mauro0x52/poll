var model = require('./model.js');

var question = new model.Question({
    question : "Em relacao ao vale transporte de seus funcionarios, como voce o oferece?",
    answers  : [
        {value : "Pago em dinheiro/deposito como ajuda de custo"},
        {value : "Incluo no salario mesmo, sem separacao"},
        {value : "Pago atraves do vale transporte municipal"},
        {value : "Pago atraves do vale transporte da Ticket"},
        {value : "Pago atraves do vale transporte da Visa Vale"},
        {value : "Pago atraves do vale transporte da Sodexo"},
        {value : "Pago atraves de uma outra empresa que faz a gestao"},
        {value : "Nao pago vale transporte"}
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
