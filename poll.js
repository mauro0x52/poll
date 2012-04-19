function quiz(params)
{    
    var target = params.target;
    var userId = params.user;
    var questionId;
    
    $.ajax({
            url: 'http://minienquete.rafaelerthal.c9.io/' + userId + '/get-question',
            dataType     : 'jsonp',
            jsonpCallback: '__parseJSONPResponse',
            cache        : false,
            success: function(data){
                $(target).append('<span class="quiz_validation"></span>');
                if(data.error === 'Nenhuma enquete encontrada') return;
                if(data.error !== '') $('.quiz_validation').html('Ocorreu um erro no processamento do quiz.');
                
                questionId = data.question._id;
                
                $(target).append("<span class='question'><span class='title'>Enquete:</span>" + data.question.question + "</span>");                
                
                var answers = data.question.answers;
                var size = answers.length;                
                
                for(var i = 0; i < size; i++)
                    $(target).append("<span class='answer'><input type='radio' name='quiz_answer' id='quiz_answer' value='" + answers[i]._id + "' />" + answers[i].value + "</span>");
                    
                $(target).append("<span class='send'><input type='button' id='quiz_send' name='quiz_send' value='Responder' /></span>");
                
                $(target).fadeIn('slow');
                
                $('#quiz_send').click(function(){
                    $.ajax({
                        url: "http://minienquete.rafaelerthal.c9.io/" + userId + "/answer-question/" + questionId + "/" + $('#quiz_answer').val(),
                        dataType     : 'jsonp',
                        jsonpCallback: '__parseJSONPResponse',
                        cache        : false,
                        success: function(data){
                            if(data.error !== '') $('.quiz_validation').html(data.error);
                            else $(target).html('<span class="question">Obrigado por responder.</span>');
                            
                            $(target).fadeOut(5000);
                        }
                    });
                });
            }
        });    
    
    return true;
};