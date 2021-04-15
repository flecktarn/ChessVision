var chessboard= "";
var active_square = '';
var target = 'a1';

function create_board(){
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
}

create_board();

function draw (piece,square){
    $(`#${square}`).html(`<img src='./images/Chess_${piece}t45.svg'/>`)
}

function clear(square){
    $(`#${square}`).html('')
}

var starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

function parse_fen(fen){
	rank = 8;
	file = 1;
	for(let i=0; i<starting_fen.length; i++){
		let character = starting_fen[i];
		//if character represents a piece
		if ("PRNBKQ".includes(character.toUpperCase())){
			let file_letter = "abcdefgh"[8 - file];
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

parse_fen(starting_fen);



//disable context menu and dragging
$('img').on('dragstart', function(event) { event.preventDefault(); });
$('img').on('contextmenu', function(event) { event.preventDefault(); });

//prompt the player with a new square to find
function prompt(){
    let random1 = Math.floor(Math.random()*8) + 1;
    let random2 = Math.floor(Math.random()*8) + 1;
    rank = random1;
    let files = 'abcdefgh';
    file = files[random2-1];
    target = file + String(rank)
    console.log('target:'+target);
    $('#prompt').html(target);
    $('#prompt2').html(target);
    $('#prompt2').css('background-color','black');
    $('#prompt').stop(true,true).show().fadeOut(1500);
}

prompt();


//handler for user clicking on a square
$(".square").click(function(){
    let square = $(this).attr('id');
    console.log('clicked:'+ square);
    if(square == target){
        prompt()
    }
    else{
        $('#prompt2').css('background-color','red');
    }
});


