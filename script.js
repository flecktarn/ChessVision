var chessboard= "";
var active_square = '';
var target = 'a1';

var starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var blank_fen = "///////";
var current_fen = "";
var piece_setting = 'starting';

var positions = []
//load positions

$('#close_button').click(function(){
	$('#menu').hide();
	$('#curtain').hide();
});


function create_board(){
	$("#board").html("");
	let files = 'abcdefgh';
	//create board elements
	for (let i=0; i<64; i++){
		let color ='light';
		let row = Math.floor(i/8)
		let rank = 8-row;
		let file = files[i%8];
		if(row % 2 == 0 && i % 2 == 0){
		    color = 'light';
		}
		else if(row%2 == 0 && i%2 == 1){
		    color = 'dark'
		}
		else if(row%2 == 1 && i%2 == 1){
		    color = 'light';

		}
		else{
		    color = 'dark';
		}
		chessboard += `<div class = 'square ${color}' id = '${file}${rank}'></div>`
	}
	$("#board").html(chessboard);
	$("#board").append("<div id='prompt'></div>");
	$("#board").append("<div id='prompt2'></div>");
	$("#board").append("<button id='menu_button'>menu</button>");

	$('#white_perspective_button').click(function(){
		change_perspective('white');
		$(this).addClass('selected');
		$('#black_perspective_button').removeClass('selected');
	})
	$('#black_perspective_button').click(function(){
		change_perspective('black');
		$(this).addClass('selected');
		$('#white_perspective_button').removeClass('selected');
	})

$('#menu_button').click(function(){
	$('#menu').show();
	$('#curtain').show();
});
	draw_rank_and_file_labels();
	change_perspective("white");
}

$('#no_pieces_button').click(function(){
	piece_setting = 'none';
	$('.row_button').each(function(){
		$(this).removeClass('selected');
	});
	$(this).addClass('selected');
	parse_fen(blank_fen);
})

$('#starting_pieces_button').click(function(){
	piece_setting = 'starting';
	$('.row_button').each(function(){
		$(this).removeClass('selected');
	});
	$(this).addClass('selected');
	parse_fen(starting_fen);
})

$('#random_pieces_button').click(function(){
	piece_setting = 'random';
	$('.row_button').each(function(){
		$(this).removeClass('selected');
	});
	$(this).addClass('selected');
 	draw_random();
})

function change_perspective(color){
	let files = 'abcdefgh';
	if (color == "white"){
		$('.square').each(function(index){
			let file = files[index % 8];
			let rank = (8-Math.floor(index/8));
			$(this).attr('id',`${file}${rank}`);
		});
		$('#prompt2').css('background-color','white');
		$('#prompt2').css('color','black');
	}
	else if(color == "black"){
		$('.square').each(function(index){
			let file = files[7 - (index % 8)];
			let rank = Math.floor(index/8)+1;
			$(this).attr('id',`${file}${rank}`);
		});
		$('#prompt2').css('background-color','black');
		$('#prompt2').css('color','white');
	}
	draw_rank_and_file_labels();
	parse_fen(current_fen);

}

function draw_rank_and_file_labels(){
	$(".square").slice(-8).each(function(){
		let file = $(this).attr('id')[0];
		$(this).find('.file').remove();
		$(this).append(`<div class = 'file'>${file}</div>`);
	});
	$(".square:nth-child(8n)").each(function(){
		let rank = $(this).attr('id')[1];
		$(this).find('.rank').remove();
		$(this).append(`<div class = 'rank'>${rank}</div>`);
	});
}

create_board();

function draw (piece,square){
    $(`#${square}`).append(`<img src='./images/Chess_${piece}t45.svg'/>`)
}

function clear(square){
    $(`#${square} img`).remove()
}



function parse_fen(fen){
	current_fen = fen;
	clear_board();
	rank = 8;
	file = 1;
	for(let i=0; i<fen.length; i++){
		let character = fen[i];
		//if character represents a piece
		if ("PRNBKQ".includes(character.toUpperCase())){
			let file_letter = "abcdefgh"[file-1];
			//test if character is light or dark
			let color = "d";
			if (character === character.toUpperCase()){
				//white
				color = "l";
			}

			draw(character.toLowerCase()+color,file_letter+rank);

			file += 1;
		}
		else if(character == "/"){
			//move to next rank
			rank -= 1;
			file = 1;
		}
		//if character is a number
		else if(!isNaN(parseInt(character))){
			//skip that many spaces
			file += parseInt(character)
		}
	}
}


//empty the board of all pieces
function clear_board(){
	$(".square").each(function(){
		$(this).find("img").remove();
	});
}
//disable context menu and dragging
$('img').on('dragstart', function(event) { event.preventDefault(); });
$('img').on('contextmenu', function(event) { event.preventDefault(); });

function draw_random(){
		let index = Math.floor(Math.random() * positions.length);
		position = positions[index];
		parse_fen(position);
}

//prompt the player with a new square to find
function prompt(){
	if (piece_setting == 'random'){
		draw_random();
	}

	else if(piece_setting == 'starting'){
		parse_fen(starting_fen);
	}

    let random1 = Math.floor(Math.random()*8) + 1;
    let random2 = Math.floor(Math.random()*8) + 1;
    rank = random1;
    let files = 'abcdefgh';
    file = files[random2-1];
    target = file + String(rank)
    $('#prompt').html(target);
    $('#prompt2').html(target);
    $('#prompt2').removeClass('bad');
    $('#prompt').stop(true,true).show().fadeOut(1500);
}



//handler for user clicking on a square
$(".square").click(function(){
    let square = $(this).attr('id');
    if(square == target){
        prompt()
    }
    else{
        $('#prompt2').addClass('bad');
    }
});






$.get("/resources/positions.txt",function(data){
	positions = data.split("\n");
	prompt();
});

