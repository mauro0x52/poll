/*----------------------------------------------------------------------------*/
/** Minienquete
 * 
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Servidor de minienquetes
 */

var express = require('express');
var model = require('./model.js');

var app = module.exports = express.createServer();

app.configure(function(){        
    
    app.use(express.bodyParser());
    app.use(express.methodOverride());    
    app.use(app.router);
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    app.use(express.errorHandler());
});

/*----------------------------------------------------------------------------*/
/** load 
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Retorna o script de controle do cliente side da minienquete
 */

app.get('/(load)?', function(request,response){
    response.sendfile('poll.js');
});

/*----------------------------------------------------------------------------*/
/** get-question 
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Retorna caso disponível uma enquete para o usuario
 * 
 * @ param userId : identificação do usuário que esta requisitando a enquete
 */
 
app.get('/:userId/get-question', function(request, response){

    var Question = model.Question;
    
    Question.find(function(error, questions) {
        if(error) response.end('__parseJSONPResponse({"error" : "'+error+'"})');
        
        questions.forEach(function(question){
            if(!question.answeredByUser(request.params.userId))
                response.end('__parseJSONPResponse({"error" : "", "question" : ' + question.toJson() + '})');
        });
        
        response.end('__parseJSONPResponse({"error" : "Nenhuma enquete encontrada"})');
    });        
});    

/*----------------------------------------------------------------------------*/
/** answer-question
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Responde uma enquete 
 * 
 * @ param userId     : identificação do usuário que esta respondendo a enquete
 * @ param questionId : chave da enquete que esta sendo respondida
 * @ param answerId   : chave da opção selecionada
 */
 
app.get('/:userId/answer-question/:questionId/:answerId', function(request, response){

    var Question = model.Question;
    
    Question.find({_id : request.params.questionId},function(error, questions) {
        if(error) response.end('{"error" : "'+error+'"}');        
        if(questions[0] === undefined) response.end('__parseJSONPResponse({"error" : "Enquete não encontrada"})');
        
        var question = questions[0];
        if(question.answeredByUser(request.params.userId)) response.end('__parseJSONPResponse({"error" : "Enquete já respondida"})');
        
        var answer = question.findAnswerById(request.params.answerId);
        if(answer === undefined) response.end('__parseJSONPResponse({"error" : "Opção não encontrada"})');
        
        answer.users.push(request.params.userId);        
        question.save(function(error){
            if(error) response.end('__parseJSONPResponse({"error" : "' + error + '"})');
            else response.end('__parseJSONPResponse({"error" : ""})');
        });
        
    });        
});   

/*----------------------------------------------------------------------------*/
/** admin
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Lista respostas da minienquete
 */
 
app.get('/admin', function(request, response){

    var Question = model.Question;
    
    Question.find(function(error, questions) {
        if(error) response.end('Ocorreu um erro na execução da pagina.');        
        response.render('list', {questions : questions});
    });        
});    

/*----------------------------------------------------------------------------*/

app.listen(33880);