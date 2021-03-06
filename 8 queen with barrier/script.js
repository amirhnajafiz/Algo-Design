const N = 8;

function printSolution(board) {
    table = '<table class="table table-bordered table-dark" style="margin: 10px auto; width:500px">';
    for (var x = 0; x < N; x++) {
        table = table + "<tr>"
        for (var y = 0; y < N; y++) {
            let bg = "secondary";
            if (board[x][y] == 2)
                bg = "dark text-dark";
            else if (board[x][y] == 0)
                bg = "white"

            table = table + "<td class='text-center bg-" + bg + "'>";
            table = table + "Q";
            table = table + "</td>"
        }
        table = table + "</tr>"
    }
    table = table + "</table>";
    document.write(table);
}

function isSafe(board, row, col) {
    for (var IE = -1; IE < 2; IE++) {
        for (var JE = -1; JE < 2; JE++) {
            newRow = row + IE;
            newCol = col + JE;

            if (IE == 0 && JE == 0) {
                if (board[newRow][newCol] == 0)
                    continue;
                else   
                    return false;
            }

            while (newRow < N && newRow >= 0 && newCol < N && newCol >= 0) {
                if (board[newRow][newCol] == 1)
                    return false;
                if (board[newRow][newCol] == 2)
                    break;
                newRow += IE;
                newCol += JE;
            }
        }
    }
    return true;
}

function solveNQUtil(board, row, col, res) {
    if (res[0] >= N) {
        return true
    }

    for (var i = row; i < N; i++) {
        for (var j = 0; j < N; j ++) {
            if (i == row && j < col)
                continue;
            if (isSafe(board, i, j)) {
                board[i][j] =1;
                res[0] +=1;

                if (solveNQUtil(board, i ,j+1, res)) {
                    printSolution(board);
                    document.write("<br />");
                    res[1] += 1;
                }
                board[i][j] = 0;
                res[0] -=1;
            }
        }
    }

    return false;
}

var board = new Array(N);

for (var i = 0; i < N; i++) {
    board[i] = new Array(N);
    for (var j = 0; j < N; j++) {
        board[i][j] = Math.random() > 0.8 ? 2 : 0;
    }
}

res = [0, 0];
printSolution(board);
document.write("<br />");
solveNQUtil(board, 0, 0, res);
document.write("count found: " + res[1]);