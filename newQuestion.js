var model = require('./model.js');

var question = new model.Question({
    question : "Voce tem interesse em uma ferramenta que simplifique a sua compra de anuncios na internet",
    answers  : [
        {value : "Sim"},
        {value : "Nao"}
    ]
});

question.save(function(err){
    if(err) console.log(err)
    else console.log("Pergunta cadastrada com sucesso!");
});
