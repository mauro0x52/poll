/*----------------------------------------------------------------------------*/
/** Model.js
 * 
 * @ package     : Minienquete
 * @ namespace   : Model
 *  
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 * 
 * @ description : Modelagem das enquetes
 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema;
    
mongoose.connect('mongodb://empreendemia:kawasaki88@staff.mongohq.com:10034/empreendemia');

/*----------------------------------------------------------------------------*/
/** Option
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 */
 
var AnswerSchema = new schema({
    value       : {type : String , trim : true} ,
    users       : [String]
});

/*----------------------------------------------------------------------------*/
/** Question
 *
 * @ autor       : Rafael Erthal
 * @ since       : 2012-04
 */
 
var QuestionSchema = new schema({
    question    : {type : String} ,
    
    answers     : [AnswerSchema],
    
    dateCreated : {type : Date}
});

QuestionSchema.methods.toJson = function()
{
    var answersLength = this.answers.length;
    
    var res = '{';
    res += '"_id" : "' + this._id + '" ,';
    res += '"question" : "' + this.question + '" ,';
    res += '"answers"  :[';
    
    for(var i = 0; i < answersLength; i++)
    {
        res += '{';
        res += '"value" : "' + this.answers[i].value + '",';
        res += '"_id" : "' + this.answers[i]._id + '"';
        res += '}';
        if(i < answersLength - 1) res+= ",";
    }
    
    res += ']';
    res += '}';
    return res;
};

QuestionSchema.methods.findAnswerById = function(answerId)
{
    var answers = this.answers;
    var answersLength = answers.length;
    
    for(var i = 0; i < answersLength; i++)
        if(answers[i]._id == answerId) return answers[i];
    
    return undefined;
};

QuestionSchema.methods.answerSelected = function(userId)
{
    var answers = this.answers;
    var answersLength = answers.length;
    
    for(var i = 0; i < answersLength; i++)    
    {
        var users = answers[i].users;
        var usersLength = users.length;
        
        for(var j = 0; j < usersLength; j++) 
            if(users[j].toString() === userId.toString())
                return answers[i];
    }
    
    return undefined;  
};

QuestionSchema.methods.answeredByUser = function(userId)
{
    return this.answerSelected(userId) !== undefined;
};

var Question = mongoose.model('Question', QuestionSchema);

/*----------------------------------------------------------------------------*/
                         /* Montagem do namespace */

module.exports = {
    Question : Question ,
    
    QuestionSchema : QuestionSchema
};

/*----------------------------------------------------------------------------*/