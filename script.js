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


var board_state =
{
'a1':'rl',
'b1':'nl',
'c1':'bl',
'd1':'ql',
'e1':'kl',
'f1':'bl',
'g1':'nl',
'h1':'rl',
'a2':'pl',
'b2':'pl',
'c2':'pl',
'd2':'pl',
'e2':'pl',
'f2':'pl',
'g2':'pl',
'h2':'pl',
'a7':'pd',
'b7':'pd',
'c7':'pd',
'd7':'pd',
'e7':'pd',
'f7':'pd',
'g7':'pd',
'h7':'pd',
'a8':'rd',
'b8':'nd',
'c8':'bd',
'd8':'qd',
'e8':'kd',
'f8':'bd',
'g8':'nd',
'h8':'rd',
}

//draw the board (this should be replaced with a FEN reader)
for (var key in board_state){
    draw(board_state[key],key);
}

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


