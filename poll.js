function quiz(params)
{    
    var target = params.target;
    var userId = params.user;
    var questionId;
    
    $.ajax({
            url: 'http://empreendemia.no-ip.org:33880/' + userId + '/get-question',
            dataType     : 'jsonp',
            jsonpCallback: '__parseJSONPResponse',
            cache        : false,
            success: function(data){
                $(target).append('<span class="quiz_validation"></span>');
                if(data.error === 'Nenhuma enquete encontrada') return;
                if(data.error !== '') $('.quiz_validation').html('Ocorreu um erro no processamento do quiz.');
                
                questionId = data.question._id;
                
                $(target).append("<span class='question'><span class='title'>Enquete:</span>" + data.question.question + "</span>");                
                params.view();

                var answers = data.question.answers;
                var size = answers.length;                
                
                for(var i = 0; i < size; i++){
                    $(target).append("<span class='answer'><input type='radio' name='quiz_answer' id='quiz_answer" + i + "' value='" + answers[i]._id + "' />" + answers[i].value + "</span>");
                    $('#quiz_answer'+i).click(function(e){
		        params.change($(this).val());
		    });
		}

                $(target).append("<span class='send'><input type='button' id='quiz_send' name='quiz_send' value='Responder' /></span>");
                
                $(target).fadeIn('slow');
                
                $('#quiz_send').click(function(){
		    var option = $('[name = "quiz_answer"]').val();
                    params.submit(option);
                    $.ajax({
                        url: "http://empreendemia.no-ip.org:33880/" + userId + "/answer-question/" + questionId + "/" + $('[name = "quiz_answer"]').val(),
                        dataType     : 'jsonp',
                        jsonpCallback: '__parseJSONPResponse',
                        cache        : false,
                        success: function(data){
                            if(data.error !== '') $('.quiz_validation').html(data.error);
                            else{
			        $(target).html('<span class="question">Muito obrigado pela sua resposta!<br />Caso tenha interesse em dicas sobre como produzir mais no dia a dia, confira nosso artigo: <a href="http://www.saiadolugar.com.br/dia-a-dia-do-empreendedor/as-3-diferencas-entre-a-pessoa-produtiva-e-a-pessoa-ocupada/" id="follow_up_poll" target="_blank">As 3 diferencas entre a pessoa produtiva e pessoa ocupada</a></span>');

				$('#follow_up_poll').click(function(){
				    params.followup(option);
				});
		            }
                        }
                    });
                });
            }
        });    
    
    return true;
};
