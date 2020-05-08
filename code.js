

///    ОБЩИЕ ДАННЫЕ     \\\


var arrayEdit = [];
	arrayNoEdit = [];
	arrayIndexNoCorrect = [];
	arrayHelp = [
		[1,2,0,0,0,0,0,0,0,0],
		[1,3,1,0,0,0,0,0,0,0],
		[1,3,1,3,0,0,0,0,0,0],
		[1,3,2,3,1,0,0,0,0,0],
		[1,6,1,1,1,1,0,0,0,0],
		[1,4,3,2,2,1,1,0,0,0],
		[1,5,3,2,1,2,1,1,0,0],
		[1,6,3,2,1,1,2,1,1,0],
		[1,7,3,2,1,1,1,2,1,1],
	];
	$(document).ready(function(){
		$('#columns_error_max').hide();
		$('#columns_error_min').hide();
		$('#columns_error').hide();
		$('#secret_error').hide();
		$('#correct').hide();
		$('#wrong').hide();
		$('#correct_secret').hide();
		$('#wrong_secret').hide();
	});
	
	$(window).keydown(function(event){					//ловим событие нажатия клавиши
		if(event.keyCode == 13 || event.keyCode == 66) {						//если это Enter
			$('#columns').blur();								//снимаем фокус с поля ввода
		}
	});
	
	
	
	
	
	
	
	
///    ДОБАВЛЕНИЕ/ЗАПОЛНЕНИЕ ТАБЛИЦЫ     \\\	
	
	
	
				function addTable(){
					
					var columns = document.myform.columns.value;
					if(columns > 10 || columns <= 1){
						 if(columns <= 1){
						  $('#columns_error_min').css('color','#FF82AB');
						  $('#columns_error_min').show(500);
						  $('#columns_error_min').fadeOut(10000);
						 }
						 if(columns > 10){
						  $('#columns_error_max').css('color','#FF82AB');
						  $('#columns_error_max').show(500);
						  $('#columns_error_max').fadeOut(10000);
						 }
						 console.log('Введеное число: ' + columns);
					}
					else{
						$('#columns_error_min').css('color','#FFF');
						$('#columns_error_max').css('color','#FFF');
						$('#columns_error_max').fadeOut(10000);
						$('#columns_error_min').fadeOut(10000);
						arrayEdit = [];
						arrayNoEdit = [];
						$("#tab").remove();
						
						var content = '<table id="tab">';
						for(var i = 0; i < 2; i++){
							content += '<tr>';
							for(var j = 0; j < columns; j++){
								if(i == 0){
									content += '<td id="str">' + j + '</td>';
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
							var code = '<input type="text" id="edit" size="1px" style="text-align:center" value="'+val+'" />';
							$(this).empty().append(code);
							$('#edit').focus();
							$('#edit').blur(function()	{
								var val = $(this).val();					//Функция для снятии фокуса с ячейки
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









///    ПОДСКАЗКА     \\\



				$(function(){
					$(".helper").on("click", function(){
						
						var columns = document.myform.columns.value;
						var arrayIndexHelper = [];	
						$('table tr').each(function(row){
							$(this).find('td').each(function(cell){
								if(row == 1 && $(this).html() == 0){
									arrayIndexHelper.push(cell);
								}
							});
						});
						
						console.log('Индексы пустых ячеек: ' + arrayIndexHelper);
						
						function rand(arrayIndexHelper) {
							var rand = Math.floor(Math.random() * arrayIndexHelper.length);
							return arrayIndexHelper[rand];
						}
						
						var helping = rand(arrayIndexHelper);
						console.log('Индекс случайно подсказанная ячейка из пустых: ' + helping);
						
						var sos = arrayHelp[columns-2][helping];
						console.log('Ответ в этой ячейке: ' + sos);
						
						$('table tr').each(function(row){
							$(this).find('td').each(function(cell){
									if(row == 1 && cell == helping){
										$(this).html(sos);
										$(this).css('background-image','url(bubble3.png)');   //Если массив с ошибочными индексами пуст
										$(this).css('border-color','#00FF00');
										$(this).css('color','#00FF00');
									}
							});
						});
						
							
					});
				});








///    ОБЫЧНАЯ ТАБЛИЦА     \\\



					function checkTable() {
						var arrayEdit = [];
						var columns = document.myform.columns.value;
						$('table tr').each(function(row){
							$(this).find('td').each(function(cell){
								if(row == 1){
									arrayEdit.push($(this).html());
										
								}
							});
						});
						
						for(var i = 0; i < columns; i++){
							arrayEdit[i] = arrayEdit[i]*1;
						}
						console.log('Первая строка: ' + arrayNoEdit);
						console.log('Вторая строка: ' + arrayEdit);
						
						var arrayIndexNoCorrect = [];
						for(var i = 0; i < columns; i++){
							var sum = 0;
							for(var j = 0; j < columns; j++){
								if(i == arrayNoEdit[j]){sum++;}			//Подсчет цифр во всей таблице
								if(i == arrayEdit[j]){sum++;}
							}
							arrayIndexNoCorrect[i] = sum;
						}
						console.log('Пересчитанная таблица: ' + arrayIndexNoCorrect);
						
						
						var arrayDopIndex = [];
						for(var i = 0; i < columns; i++){
							if(arrayIndexNoCorrect[i] != arrayEdit[i]){  //Проверка на схожесть 2х проверок
								arrayDopIndex.push(i);
							}
						}
						
						console.log('Ошибочный индекс: ' + arrayDopIndex);
						
						if (arrayDopIndex.length == 0){
							$('table tr').each(function(row){
								$(this).find('td').each(function(cell){
									for(var i = 0; i < columns; i++){
										if(row == 1){
											$(this).css('background-image','url(bubble3.png)');   //Если массив с ошибочными индексами пуст
											$(this).css('border-color','#00FF00');
											$(this).css('color','#00FF00');
										}
									}
								});
							});		
							$('#correct').show(500);
							$('#correct').css('display', 'block');
							$('#correct').fadeOut(10000);
						}
						else{
							alert('Ошибки - наши лучшие учителя!');
							$('table tr').each(function(row){
								$(this).find('td').each(function(cell){
									for(var i = 0; i < columns; i++){
										if(row == 1 && cell == arrayDopIndex[i]){
											$(this).css('background-image','url(bubble2.png)');		//
											$(this).css('border-color','red');
											$(this).css('color','#FFFFFF');
										}
									}
								});
							});
						}
							
					}









///    СЕКРЕТНАЯ ПРОВЕРКА     \\\



				function secretTable() {
					var columns = document.myform.columns.value;
						arrayOne = [1,11,2,1,1,1,1,1,1,1];
						arrayExtra = [];
						arrayEdit = [];
						var columns = document.myform.columns.value;
						
					if(columns != 10){
						$('#secret_error').css('display','block');
						$('#secret_error').show(500);
						$('#secret_error').fadeOut(10000);
					}
					else{
						
						$('table tr').each(function(row){
							$(this).find('td').each(function(cell){
								if(row == 1){
									arrayEdit.push($(this).html());
								}
							});
						});
						
						for(var i = 0; i <= columns; i++){
							if(arrayEdit[i] != arrayOne[i]){
								arrayExtra.push(i);
							}
						}
						console.log('Вторая строка: ' + arrayEdit);
						console.log('Секретная строка: ' + arrayOne);
						console.log('Ошибочный индекс секрета: ' + arrayExtra);
						
						if(arrayExtra.length == 0){
							$('#correct_secret').show(500);
							$('#correct_secret').css('display', 'block');
							$('#correct_secret').fadeOut(10000);
							$('table tr').each(function(row){
								$(this).find('td').each(function(cell){
									for(var i = 0; i < columns; i++){
										if(row == 1){
											$(this).css('background-image','url(bubble3.png)');   //Если массив с ошибочными индексами пуст
											$(this).css('border-color','#00FF00');
											$(this).css('color','#00FF00');
										}
									}
								});
							});
						}
						else{
							alert('В следующий раз обязательно получится!');
							$('#wrong_secret').show(500);
							$('#wrong_secret').css('display', 'block');
							$('#wrong_secret').fadeOut(10000);
							$('table tr').each(function(row){
								$(this).find('td').each(function(cell){
									for(var i = 0; i < columns; i++){
										if(row == 1 && cell == arrayExtra[i]){
											$(this).css('background-image','url(bubble2.png)');		//
											$(this).css('border-color','red');
											$(this).css('color','#FFFFFF');
										}
									}
								});
							});
						}
						
						
					}
					
				}






///    УДАЛЕНИЕ ТАБЛИЦЫ     \\\


						function subTable() {
							$('#tab').remove();
							arrayEdit = [];
							arrayIndexEdit = [];
							arrayExtra = [];
							arrayDopIndex = [];
							arrayNoEdit = [];
							arrayEditTwo =[];
							
							$('#correct_secret').hide();
							$('#wrong_secret').hide();
							$('#correct').hide();
							$('#wrong').hide();
							
						}








///    БЕГАЮЩИЕ ГЛАЗА НА КРАБЕ     \\\


						  document.addEventListener('mousemove', stare);
						  function stare(e) {
						   const to = {
								x: e.pageX, // Координаты курсора 
								y: e.pageY
							};
							 const eyes = document.querySelectorAll('.eye');
							 
							 for (var eye in Array.from(eyes)) {
							  eyes[eye].parentNode.style.display = 'inline-block';
							  lookTo(eyes[eye], to);
							 }
						  }
						
						  function lookTo(eye, to){
							   const offset = eye.offsetWidth;
							   const white = eye.parentNode;
							   white.style.transform = 'rotate(0deg)';
							   const whiteRadius = white.offsetWidth/2;
							   const whiteTop = white.offsetTop;//расположение глаза
							   const whiteLeft = white.offsetLeft;
							   const mouseX = to.x;
							   const mouseY = to.y;
							   const x0New = mouseX - whiteRadius - whiteLeft;//смещение осей х0 у0
							   const y0New = mouseY - whiteRadius - whiteTop;
							   const mouseR = Math.sqrt(x0New*x0New + y0New*y0New) + offset/2; //расстояние до курсора
							   if (mouseR <= whiteRadius){
								  eye.style.top = (mouseY - offset/2 - whiteTop) + 'px';
								  eye.style.left = (mouseX - offset/2 - whiteLeft) + 'px';
							   } else {
								const rotationAngle = (x,y) => {
								 if (x>=0) {
								  return Math.atan(y/x)*180/Math.PI;
								 } 
								 return Math.atan(y/x)*180/Math.PI - 180;
								};
								eye.style.top = (whiteRadius - offset/2) + 'px';
								eye.style.left = (whiteRadius*2 - offset) + 'px';
								white.style.transform = 'rotate('+ rotationAngle(x0New,y0New) + 'deg)';
								};
						   };


