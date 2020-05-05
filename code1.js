var arrayEdit = [];
	arrayNoEdit = [];
	arrayIndexEdit = [];
	$(document).ready(function(){
		$('#columns_error').hide();
		$('#secret_error').hide();
	});
	$(window).keydown(function(event){					//ловим событие нажатия клавиши
		if(event.keyCode == 13) {						//если это Enter
			$('#columns').blur();								//снимаем фокус с поля ввода
		}
	});
function addTable(){
	
	var columns = document.myform.columns.value;
  	if((columns == "") || (columns > 10) || (columns <= 0 )){
	  $('#columns_error').show(500);
	}
	else{
		$('#columns_error').hide(500);
		arrayEdit = [];
		arrayNoEdit = [];
		$("#tab").remove();
		
		var content = '<table id="tab">';
		for(var i = 0; i < 2; i++){
			content += '<tr id = "str">';
			for(var j = 0; j < columns; j++){
				if(i == 0){
					content += '<td>' + j + '</td>';
					arrayNoEdit.push(j);
				}
				else{
					content += '<td class = "edit"></td>';
				}
			}
			content += '</tr>';
		}
		content += '</table>';
		$('#elem').append(content);
	}
	
	//Функция заполнения нижней строки значениями
	$(function()	{
		$('.edit').click(function(e)	{
			var t = e.target || e.srcElement;				//ловим элемент, по которому кликнули
			var elm_name = t.tagName.toLowerCase();			//получаем название тега
			if(elm_name == 'input')	{return false;}			//если это инпут - ничего не делаем
			var val = $(this).html();
			var code = '<input type="text" id="edit" size="3px" style="text-align:center" value="'+val+'" />';
			$(this).empty().append(code);
			$('#edit').focus();
			$('#edit').blur(function()	{
				var val = $(this).val();					//Функция для снятии фокуса с ячейки
				//arrayEdit.push($(this).val());				//Значение сохраняется в td и в массиве arrayEdit
				
				
				//Функция записи вводимого числа в массив
				$('.edit').each(function(row){
					$(this).find('#edit').each(function(cell){ //Функция проверяет в каком столбце произошла запись
						//сonsole.log('Строка ' + row + ', ячейка ' + cell + ', значение: ' + $(this).html());
						//arrayIndexEdit.push(row);
						var flag = true;						
						for(var i = 0; i < columns; i++){		//Проверка
							var flag = true;
							if(row == arrayIndexEdit[i]){		//Если данный индекс уже есть в массиве arrayIndexEdit
								flag = false;
								arrayEdit[i] = val;				//То в массиве значение с эти индексом перезапишется на новое 
								break;
							}
						}
						if(flag == true){						//Если же значения под таким индексом нет, то запишеться в конец.
							arrayEdit.push($(this).val());
							arrayIndexEdit.push(row);
						}
					});
				});
				
				
				
				$(this).parent().empty().html(val);
			});
			
		});
		//Функция снятия фокуса по клавише Enter
		$(window).keydown(function(event){					//ловим событие нажатия клавиши
			if(event.keyCode == 13) {						//если это Enter
			$('#edit').blur();								//снимаем фокус с поля ввода
			}
		});
	});
	
}	



function checkTable() {
	var columns = document.myform.columns.value;
		arrayExtra = [];
				
	for(var i = 0; i < columns; i++){
		var sum = 0;
		for(var j = 0; j < columns; j++){
			if(	(arrayIndexEdit[i] == arrayIndexEdit[j]) || (arrayIndexEdit[i] == arrayExtra[j])){
				sum ++;
			}
		}
		arrayExtra[i] = sum;
	}
		
//	alert(arrayEdit);
//	alert(arrayExtra);
// 	alert(arrayIndexEdit);	
	var flag = true;
		arrayDopIndex = [];
	for(var i = 0; i < columns; i++){
		if(arrayExtra[i] == arrayEdit[i]){flag = true;}			//Проверка на схожесть 2х проверок
		
		else{
			flag = false;
			arrayDopIndex.push(arrayIndexEdit[i]);
			//break;
		}
		
	}
//	alert(arrayDopIndex);	
	
	if (flag == true){
		$('table tr').each(function(row){
			$(this).find('td').each(function(cell){
				for(var i = 0; i < columns; i++){
					if(row == 1){
						$(this).css('background-image','url(bubble3.png)');
						$(this).css('border-color','#00FF00');
						$(this).css('color','#00FF00');
					}
				}
			});
		});		
		alert('Отлично!');	
	}
	else{
		alert('Ошибки - наши лучшие учителя!');
		$('#wrong').css('visibility','visible');
		$('#wrong').fadeOut(10000);
	}
	
//	if (flag == true){$('#correct').css('visibility','visible');}
//	else{$('#wrong').css('visibility','visible');} 
		
		$('table tr').each(function(row){
			$(this).find('td').each(function(cell){
				//console.log('Строка ' + row + ', ячейка ' + cell + ', значение: ' + $(this).html());
				for(var i = 0; i < columns; i++){
					if(row == 1 && cell == arrayDopIndex[i]){
						$(this).css('background-image','url(bubble2.png)');
						$(this).css('border-color','red');
					}
				}
			});
		});
		
		
}


function secretTable() {
	var columns = document.myform.columns.value;
	var arrayEditTwo = [];
	var arrayOne = [1,7,3,2,1,1,1,2,1,1];
		arrayTwo = [1,11,2,1,1,1,1,1,1,1];
		$('table tr').each(function(row){
			$(this).find('td').each(function(cell){			
				if(row == 1){
					arrayEditTwo.push($(this).html());
				}
			});
		});
	var arr = arrayEditTwo.map(function (item) {
 		return parseFloat(item);
	});
//	alert(arrayEditTwo);

	if((columns == "") || (columns != 10)){
	  $('#secret_error').show(500);
	}
	else{
//		alert(arrayOne);
//		alert(arrayTwo);
		console.log(arr);
		console.log(arrayTwo);
		$('#secret_error').hide(500);
		if (JSON.stringify(arr) == JSON.stringify(arrayOne) || JSON.stringify(arr) == JSON.stringify(arrayTwo)){
			alert('Супер! Ты прирожденный математик!');
		}
		else{alert('В следующий раз обязательно получится!');}
	}
	
}


function subTable() {
	$('#tab').remove();
	$('#wrong').css('visibility','hidden');
	arrayEdit = [];
	arrayIndexEdit = [];
	arrayExtra = [];
	arrayDopIndex = [];
	arrayNoEdit = [];
	arrayEditTwo =[];
}