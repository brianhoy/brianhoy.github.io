"use strict";

/////////////////////////////////////////////////////////////////////
// AI STUFF http://richard.to/programming/ai-for-owari-part-2.html //
/////////////////////////////////////////////////////////////////////
var TicTacToeMiniMax = function () {
    this.minPlayer = 1;
    this.maxPlayer = 2;
};

TicTacToeMiniMax.prototype.setMinMaxPlayers = function (maxPlayer, minPlayer) {
    this.minPlayer = minPlayer;
    this.maxPlayer = maxPlayer;
};

TicTacToeMiniMax.prototype.cloneBoard = function (board) {
    return board.slice(0);
};

TicTacToeMiniMax.prototype.checkWinner = function (player, board) {
	if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
};

TicTacToeMiniMax.prototype.checkTie = function (board) {
    for (var i = 0; i < board.length; i++) {
        if (board[i] == 0) {
            return false;
        }
    }
    return true;
};

TicTacToeMiniMax.prototype.makeMove = function (move, player, board) {

    var newBoard = this.cloneBoard(board);
    if (newBoard[move] == 0) {
        newBoard[move] = player;
        return newBoard;
    } else {
        return null;
    }
};

TicTacToeMiniMax.prototype.findMove = function (board) {
    var bestMoveValue = -100;
    var move = 0;
    for (var i = 0; i < board.length; i++) {
        var newBoard = this.makeMove(i, this.maxPlayer, board);
        if (newBoard) {
            var predictedMoveValue = this.minValue(newBoard);
            if (predictedMoveValue > bestMoveValue) {
                bestMoveValue = predictedMoveValue;
                move = i;
            }
        }
    }
    return move;
};

TicTacToeMiniMax.prototype.minValue = function (board) {
    if (this.checkWinner(this.maxPlayer, board)) {
        return 1;
    } else if (this.checkWinner(this.minPlayer, board)) {
        return -1;
    } else if (this.checkTie(board)) {
        return 0;
    } else {
        var bestMoveValue = 100;
        var move = 0;
        for (var i = 0; i < board.length; i++) {
            var newBoard = this.makeMove(i, this.minPlayer, board);
            if (newBoard) {
                var predictedMoveValue = this.maxValue(newBoard);
                if (predictedMoveValue < bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    move = i;
                }
            }
        }
        return bestMoveValue;
    }
};

TicTacToeMiniMax.prototype.maxValue = function (board) {
    if (this.checkWinner(this.maxPlayer, board)) {
        return 1;
    } else if (this.checkWinner(this.minPlayer, board)) {
        return -1;
    } else if (this.checkTie(board)) {
        return 0;
    } else {
        var bestMoveValue = -100;
        var move = 0;
        for (var i = 0; i < board.length; i++) {
            var newBoard = this.makeMove(i, this.maxPlayer, board);
            if (newBoard) {
                var predictedMoveValue = this.minValue(newBoard);
                if (predictedMoveValue > bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    move = i;
                }
            }
        }
        return bestMoveValue;
    }
};

/////////////////////////////////////////////////////////////////
// NEURAL NETWORK STUFF STUFF https://github.com/harthur/brain //
/////////////////////////////////////////////////////////////////
	
var ai = new TicTacToeMiniMax();

function GetRandomMove(board) {
    var i, options;
    options = [];
    for (i = 0; i < 9; i += 1) {
        if (board[i] === 0) {
            options.push(i);
        }
    }

    if (options.length === 0) {
        return -1;
    } else {
        return options[Math.floor(Math.random() * options.length)];
    }
}

function IsValidMove(board, move) {
	if ((move < 0 || move > 8)) {
		return false;
	}
	if (board[move] != 0) {
		return false;
	}

	return true;
}

function GetTrainableBoard(board) {
	var newBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0];

	for (var i = 0; i < 9; i++) {
		if (board[i] == 1) {
			newBoard[i] = 1;
		}
		else if (board[i] == 2) {
			newBoard[i + 9] = 1;
		}
	}

	return newBoard;
}

function GetTrainableOutput(move, board) {
	var newBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	for (var i = 0; i < 9; i++) {
		if (board[i] == 2) {
			newBoard[i] = 1;
		}
	}
	newBoard[move] = 1;

	return newBoard;
}

function GetNetMove(net, board) {
	var nboard = net.run(GetTrainableBoard(board));

	for (var i = 0; i < board.length; i++) {
		if (board[i] == 0 && Math.round(nboard[i]) == 1) {
			return i;
		}
	}

	return GetRandomMove(board);
}

function TestNetworksWinrate(net, games) {
	console.log("Testing winrate for " + games + " games...")

	var netWins = 0;
	var ties = 0;

	for (var i = 0; i < games; i++) {
		var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		for (var j = 0; j < 9; j++) {
			// Make random move then check if it's a tie/win
			var randomMove = GetRandomMove(board);
			board[randomMove] = 1;
			if (i % games == 0) {
				//console.log("Sample move: " + board);
			}
			if (ai.checkWinner(1, board)) {
				break;
			} else if (ai.checkTie(board)) {
				ties++;
				break;
			}
			
			// Make neural network move and check if it's a tie/win
			var netMove = GetNetMove(net, board);
			board[netMove] = 2;
			if (i % games == 0) {
				//console.log("NN response: " + netMove);
			}
			if (ai.checkTie(board)) {
				ties++;
				break;
			}
			else if (ai.checkWinner(2, board)) {
				netWins++;
				break;
			}
		}
	}

	var info = { ties: ties, wins: netWins, games: games };
	console.log("Done testing winrate. " + info.ties + " ties and " + info.wins + " wins creates a winrate of " + (info.wins / info.games));
	return info;
}

function TrainNetwork(net, games, iterations_) {
	console.log("Training for " + games + " games and " + iterations_ + " iterations...");

	var trainingSet = new Array();
	for (var i = 0; i < games; i++) {		
		// 1 is O, the random player 
		// 2 is X, the minimax algorithm

		// New board for each game
		var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		for (var j = 0; j < 9; j++) {
			// Make a random move (input)
			var randomMove = GetRandomMove(board);
			board[randomMove] = 1;
			if (ai.checkWinner(1, board)) {
				break;
			}
			else if (ai.checkTie(board)) {
				break;
			}
			trainingSet.push({});
			trainingSet[trainingSet.length - 1].input = GetTrainableBoard(board);
			
			// Make the minimax algorithm move (output)
			var computerMove = ai.findMove(board);
			board[computerMove] = 2;
			trainingSet[trainingSet.length - 1].output = GetTrainableOutput(computerMove, board);
			if (ai.checkTie(board)) {
				break;
			}
			else if (ai.checkWinner(2, board)) {
				break;
			}
		}
	}

	net.train(trainingSet, { iterations: iterations_, log: true, logPeriod: iterations_ - 1,  errorThresh: 0.001});
}

$(document).ready(function () {
	console.log("Welcome to the Neural Network Tic Tac Toe program. Created by Brian Hoy in Dec 2015 as a Science Fair Project.");
});

var g_net;
var g_board;

function SetStatus(status, isError)
{
	document.getElementById("status").style.display = 'block';
	document.getElementById("status").innerHTML = status;
	if(isError)
	{
		document.getElementById("status").className =
			document.getElementById("status").className.replace
				( /(?:^|\s)info(?!\S)/g , '' );
		document.getElementById("status").className =
			document.getElementById("status").className.replace
				( /(?:^|\s)error(?!\S)/g , '' );
				
		document.getElementById("status").className+= " error";	
	}
	else
	{
		document.getElementById("status").className =
			document.getElementById("status").className.replace
				( /(?:^|\s)error(?!\S)/g , '' );
		document.getElementById("status").className =
			document.getElementById("status").className.replace
				( /(?:^|\s)info(?!\S)/g , '' );
				
		document.getElementById("status").className+= " info";	
	}
}

function TrainAndPlay()
{
	SetStatus("Training network...");
	var trainingGames = document.getElementById("trainingGames").value || 100;
	var maxIterations = document.getElementById("maxIterations").value || 500;
	g_net = new brain.NeuralNetwork();
	TrainNetwork(g_net, trainingGames, maxIterations);
	g_board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	SetStatus("Done training network. Please make a move.");
}

function userMadeMove(move)
{
	if(g_net == null)
	{
		SetStatus("Please train the neural net before moving.", true);
	}
	else if(ai.checkTie(g_board) || ai.checkWinner(1, g_board) || ai.checkWinner(2, g_board))
	{
		SetStatus("The game has ended, you have to reset the board before making another move.", true);
	}
	else if(IsValidMove(g_board, move))
	{
		document.getElementById("t" + move).innerHTML = "X";
		g_board[move] = 1;
		if(ai.checkTie(g_board))
		{
			SetStatus("Tie.");
			return;
		}
		else if(ai.checkWinner(1, g_board))
		{
			SetStatus("You win.");
			return;
		}
		
		var netmove = GetNetMove(g_net, g_board);
		SetStatus("The net moved at position " + netmove + ". Your turn.");
		g_board[netmove] = 2;
		document.getElementById("t" + netmove).innerHTML = "O";
		if(ai.checkTie(g_board))
		{
			SetStatus("Tie.");
			return;
		}
		else if(ai.checkWinner(2, g_board))
		{
			SetStatus("The neural network won.");
			return;
		}
	}
	else
	{
		SetStatus("Invalid move. Try again.", true);
	}
}

function ResetBoard() {
	for(var i = 0; i < 9; i++)
	{
		document.getElementById("t" + i).innerHTML = "";
	}
	g_board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	SetStatus("The board has been reset. You can make a move now.");
}

function StartNeuralNetwork() {
	var trials = [1, 2, 3, 4, 5, 6];
	var GAMES_PER_STAGE = 20;

	for (var i = 1; i <= 6; i++) {
		trials[i] = {};
		console.log("Starting Trial " + i);
		trials[i].stage = [1, 2, 3, 4, 5, 6];
		for (var j = 0; j <= 5; j++) {
			
			var net = new brain.NeuralNetwork();
			if(j != 0)
			{
				TrainNetwork(net, GAMES_PER_STAGE * j, 500);
			}
			else
			{
				TrainNetwork(net, 1, 1);
			}

			//console.log("Trial " + i + " has been trained " + (GAMES_PER_STAGE * j) + " times.");
			var info = TestNetworksWinrate(net, 1000);

			trials[i].stage[j] = {};
			trials[i].stage[j].trainingGames = GAMES_PER_STAGE * j;
			trials[i].stage[j].ties = info.ties;
			trials[i].stage[j].wins = info.wins;
		}
	}

	console.log("Finished all trials. Here are the results: ");
	console.log(JSON.stringify(trials));
}