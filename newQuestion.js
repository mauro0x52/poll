var model = require('./model.js');

var question = new model.Question({
    question : "Qual a marca do seu computador?",
    answers  : [
        {value : "1. HP"},
        {value : "2. Dell"},
        {value : "3. Lenovo"},
        {value : "4. Positivo"},
        {value : "5. Samsung"},
        {value : "6. Sony"},
        {value : "7. Acer"},
        {value : "8. Apple"},
        {value : "9. Asus"},
        {value : "10. Itautec"},
        {value : "11. Semp Toshiba (STI)"},
        {value : "12. LG"},
        {value : "13. CCE"},
        {value : "14. Montado (sem marca)"},
        {value : "15. Outra marca"}
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
