//Authors: Nyran Bonilla & Asim Shariff



//resets the Presentation Layer
function recreate() {
  clearMatrix1();
  $('.btn-operations').hide();
  var str1 = "<section class='matrixCont' id='displayMatrix1'>\n<section id='scalar1'></section>\n<section id='detMatrix1'></section>\n</section>";
  var str2 = "<section class='matrixCont' id='displayMatrix2'>\n<section id='scalar2'></section><section id='detMatrix2'></section>\n</section>";
  var str3 = "<section id= 'inverseMatrix1'><section id= 'detInverse'></section></section>";
  $("#displayMatrix1").replaceWith(str1);
  $("#displayMatrix2").replaceWith(str2);
  $("#inverseMatrix1").replaceWith(str3);
  saveInput();
}

//Sets up the Presentation Layer
function create() {
  $('.btn-operations').hide();
  clearMatrix1();
  var str1 = "<section class='matrixCont' id='displayMatrix1'>\n<section id='scalar1'></section>\n<section id='detMatrix1'></section>\n</section>";
  var str2 = "<section class='matrixCont' id='displayMatrix2'>\n<section id='scalar2'></section><section id='detMatrix2'></section>\n</section>";
  var str3 = "<section id= 'inverseMatrix1'><section id= 'detInverse'></section></section>";
  $("#displayMatrix1").replaceWith(str1);
  $("#displayMatrix2").replaceWith(str2);
  $("#inverseMatrix1").replaceWith(str3);
  createInput();
}

//Verifies the Matrix is the at most 9 x 9 before creating a Table for the users to fill out
function createInput() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Verify Matrix is the right size
  if (((row > 0) && (col > 0)) && ((row < 10) && (col < 10))) {
    createTable();
  }
}

//error checks input before creating the table
function saveInput() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Checks if row and columns are less than 9
  if (row > 9 || col > 9) {
    alert("Use the upload button if the matrix is greater than 9 rows or 9 columns.");
  }

  //Checks if there is at least 1 row and column
  if (row < 1 || col < 1) {
    alert("You must have at least 1 row and 1 column.");
  }

  //creates a table for the users
  if (((row > 0) && (col > 0)) && ((row < 10) && (col < 10))) {
    createTable();
  }
}

//Creates a table that the users are able to fill out
function createTable() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Updates Presentation to allow users to fill out a table
  var string = "<form method='post' onsubmit='return createMatrix()'>\n<table class='matrix' id='matrix1'>";
  var string2 = "Rows:" + row;
  var par = "";
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      par = "data-" + i + "-" + j;
      string += "\n<td>\n<input type='Number' class='input' id='data-" + i + "-" + j +
        "' step='0.01' required></input></td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n<section id='detMatrix1'></section>" +
    "<button type='submit'>Create Matrix</button</form>";
  var container = document.getElementById('displayMatrix1');
  container.innerHTML = string;
}

//Error Checks the users inputted table and displays the matrix to the user
function createMatrix() {
  $('.btn-operations').show();
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Checks if the entered Matrix is a Square Matrix
  if(row != col) {
    $('sq-ops').hide();
  }
  else
    $('.sq-ops').show();

  //Updates Presentation to show the inputted Matrix
  var curString = "";
  var string = "<section class='matrixCont' id='displayMatrix1'>\n<table class='matrix' id='matrix1'>";
  if (row == col) {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        numcurr = document.getElementById(curString).value;
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id='detMatrix1'></section></section>";
  } else {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id='detMatrix1'></section></section>";
  }
  var container = document.getElementById('displayMatrix1');
  $("#displayMatrix1").replaceWith(string);
}

//Creates a Second Matrix that is being Added to the First
function createTableAddFunc() {
  $('#scalar1').hide();
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Creates a Second Table for users to fill out
  var string = "<div>Enter the Matrix you are adding: </div>\n" +
    "<form method='post' onsubmit='return createMatrixAddFunc()'><table class='matrix' id='matrix2'>";
  var string2 = "Rows:" + row;
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      string += "\n<td>\n<input type='Number' class='input' id='data-" + i + "-" + j +
        "' step='0.01' required></input></td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n<button type='submit'>Create</button></form>";
  var container = document.getElementById('displayMatrix2');
  container.innerHTML = string;
}

//Updates the Presentation to Display the Matrix that is being Added
function createMatrixAddFunc() {
  $('#scalar1').hide();
  $('.matrix2-ops').show();
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var curString = "";
  $('#operation').html('+');
  $('#operation').show();
  var oper = 0;

  //Checks if Matrix is a Square Matrix
  if (row == col) {
    var string = "<section class='matrixCont' id='displayMatrix2'><table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section><button id='addBtn' type='submit' onclick='addEqual()'>=</button></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Second Matrix Determinant</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Second Matrix Inverse</button>");
  } else {
    var string = "<section class='matrixCont' id='displayMatrix2'><table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section><button id='addBtn' type='submit' onclick='addEqual()'>=</button></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Find the Determinant of the Second Matrix</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Inverse of the Second Matrix</button>");
  }
  $("#displayMatrix2").replaceWith(string);
}

//Creates a Second Matrix that is being Subtracted to the First
function createTableSubFunc() {
  clearMatrix2();
  $('#scalar1').hide();
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;

  //Creates Second Matrix
  var string = "<div>Enter the Matrix you are subtracting: </div>\n" +
    "<form method='post' onsubmit='return createMatrixSubFunc()'>\n<table class='matrix' id='matrix2'>";
  var string2 = "Rows:" + row;
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      string += "\n<td>\n<input type='Number' class='input' id='data-" + i + "-" + j +
        "' step='0.01' required></input></td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n<button type='submit'>Create</button</form>";
  var container = document.getElementById('displayMatrix2');
  container.innerHTML = string;
}

//Updates Presentation to Display the Second Matrix that is gonna be Subtracted
function createMatrixSubFunc() {
  $('.matrix2-ops').show();
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var curString = "";
  var oper = 1;

  //Checks if matrix is a square matrix
  if (row == col) {
    var string = "<section class='matrixCont' id='displayMatrix2'><div>-</div>\n<table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section><button id='subBtn' type='submit' onclick='subEqual()'>=</button></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Second Matrix Determinant</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Second Matrix Inverse</button>");
  } else {
    var string = "<section class='matrixCont' id='displayMatrix2'><div>-</div>\n<table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section>" +
      "<button id='subBtn' type='submit' onclick='subEqual()'>=</button></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Find the Determinant of the Second Matrix</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Inverse of the Second Matrix</button>");
  }
  $("#displayMatrix2").replaceWith(string);
}

//Obtains the number of Columns of the Matrix that is being Multiplyed
function nextMult() {
  clearMatrix2();
  $('#scalar1').hide();
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
  var string = "Note: In order for matrix multiplication to work, the number of columns in the first matrix must be " +
    "equal to the number of rows in the second matrix.<br>" +
    "<form method='post' onsubmit='return createTableMultiFunc()'>" +
    "<input type='Number' id='colsMulti' min='1' placeholder='Number of Columns' required>" +
    "<button type='submit'>Enter</button</form>";
  var container = document.getElementById('displayMatrix2');
  container.innerHTML = string;
}

//Obtains a Scalar for the First Matrix
function nextScalar1() {
  clearMatrix2();
  $('#scalar1').show();
  var string = "<form method='post' onsubmit='return scalMtx1()'>\n" +
    "<input type='Number' id='scalNum1' placeholder='Enter Scalar' step='0.01' required>\n" +
    "<button type='submit'>Enter</button>\n</form>";
  var container = document.getElementById('scalar1');
  container.innerHTML = string;
}

//Obtains a Scalar for the Second Matrix
function nextScalar2(row, col, oper) {
  var string = "<form method='post' onsubmit='return scalMtx2(" + row + "," + col + "," + oper + ")'>\n" +
    "<input type='Number' id='scalNum2' placeholder='Enter Scalar' step='0.01' required>\n" +
    "<input type='submit' value='Enter'>\n</form>";
  var container = document.getElementById('scalar2');
  container.innerHTML = string;
}

//Creates a table for the Second Matrix that is being Multiplyed to the First Matrix
function createTableMultiFunc() {
  var row = document.getElementById("cols").value;
  var col = document.getElementById("colsMulti").value;
  var string = "<div>Enter the Matrix you are multiplying: </div>\n" +
    "<form method='post' onsubmit='return createMatrixMultiFunc(" + row + "," + col + ")'>" +
    "\n<table class='matrix' id='matrix2'>";
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      string += "\n<td>\n<input type='Number' class='input' id='data-" + i + "-" + j +
        "' step='0.01' required></input></td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n" +
    "<section id='scalar2'></section><section id='detMatrix2'></section><button type='submit'>Create</button></form>";
    
  var container = document.getElementById('displayMatrix2');
  container.innerHTML = string;
}

//Updates the Presentation to Display the Second Matrix that is being Multiplyed
function createMatrixMultiFunc(row, col) {
  var curString = "";
  var oper = 2;
  $('.matrix2-ops').show();

  //Checks if it is a Square Matrix
  if (row == col) {
    var string = "<section class='matrixCont' id='displayMatrix2'><div>X</div>\n<table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section><button id='multiBtn' type='submit' onclick='multiEqual(" + row + "," + col + ")'>=</button></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Second Matrix Determinant</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Second Matrix Inverse</button>");S
  } else {
    var string = "<section class='matrixCont' id='displayMatrix2'><div>X</div>\n<table class='matrix' id='matrix2'>";
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString = "data-" + i + "-" + j;
        curr = document.getElementById(curString).value;
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>" +
      "\n<section id='scalar2'></section><section id='detMatrix2'></section><button id='multiBtn' type='submit' onclick='multiEqual(" + row + "," + col + ")'>=</button></section>";
      $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Find the Determinant of the Second Matrix</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Inverse of the Second Matrix</button>");
  }
  $("#displayMatrix2").replaceWith(string);
}

//Determines the Determinant of the First Matrix
function findDetMtrx1() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix1 = getMatrixArray(row);
  var det = determinantOfMatrix(matrix1, row);
  var string = "<section id='detMatrix1'><p>Matrix Determinant : " + det + "</p>" +
    "<button type='submit' id='hideMtrx1Det' onclick='hideDetMtrx1()'>Hide Determinant</button></section>";
  $("#detMatrix1").replaceWith(string);
  $("button").remove("#mtrx1det");
}

//Determines the Determinant of the Inverse Matrix of the First Matrix
function findDetInverse1() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix1 = getMatrixInverseArray(row);
  var det = determinantOfMatrix(matrix1, row);
  var string = "<section id='detInverse'><p>Determinant of Inverse Matrix 1: " + det + "</p>" +
    "</section>";
  $("#detInverse").replaceWith(string);
  $("button").remove("#inv1det");
}

//Determines the Determinant of the Second Matrix
function findDetMtrx2() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix2 = getMatrixArray2(row);
  var det = determinantOfMatrix(matrix2, row);
  var string = "<section id='detMatrix2'><p>Determinant of the First Matrix: " + det + "</p>" +
    "<button type='submit' id='hideMtrx2Det' onclick='hideDetMtrx2()'>Hide Determinant of Matrix 2</button></section>";
  $("#detMatrix2").replaceWith(string);
  $("button").remove("#mtrx2det");
}

//Determines the Determinant of the Inverse Matrix of the Second Matrix
function findDetInverse2(row) {
  var matrix2 = getMatrixInverseArray2(row);
  var det = determinantOfMatrix(matrix2, row);
  var string = "<section id='detMatrix2'><p>Determinant of Inverse Matrix 2: " + det + "</p></section>";
  $("#detInverse2").replaceWith(string);
  $("button").remove("#inv2det");
}

//Finds Determinant of the Multiplication Matrix
function findDetMtrxMulti2(row, col) {
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix2 = getMatrixArray2(row);
  var det = determinantOfMatrix(matrix2, row);
  var string = "<section id='detMatrix2'><p>Determinant of the First Matrix: " + det + "</p><button type='submit' id='hideMtrx2Det' onclick='hideDetMtrx2()'>Hide Determinant of Matrix 2</button></section>";
  $("#detMatrix2").replaceWith(string);
  $("button").remove("#mtrx2det");
}

//Converts the First Matrix into an Array
function getMatrixArray(n) {
  var matrix = new Array(n);
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  var curr1;
  var curString1 = "";
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      curString1 = "mtrx1-" + i + "-" + j;
      curr1 = Number(document.getElementById(curString1).innerText);
      console.log(curString1);
      console.log(curr1);
      matrix[i][j] = curr1;
      console.log("Matrix Array: " + matrix[i][j]);
    }
  }
  return matrix;
}

//Converts the Second Matrix  into an Array
function getMatrixArray2(n) {
  var matrix = new Array(n);
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  var curr1;
  var curString1 = "";
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      curString1 = "mtrx2-" + i + "-" + j;
      curr1 = Number(document.getElementById(curString1).innerText);
      console.log(curString1);
      console.log(curr1);
      matrix[i][j] = curr1;
      console.log("Matrix Array: " + matrix[i][j]);
    }
  }
  return matrix;
}

//Converts the Inverse Matrix of the First Matrix into an Array
function getMatrixInverseArray(row) {
  var n = row;
  var matrix = new Array(n);
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  var curr1;
  var curString1 = "";
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      curString1 = "inv1-" + i + "-" + j;
      curr1 = Number(document.getElementById(curString1).innerText);
      console.log(curString1);
      console.log(curr1);
      matrix[i][j] = curr1;
      console.log("Matrix Array: " + matrix[i][j]);
    }
  }
  return matrix;
}

//Converts the Inverse Matrix of the Second Matrix into an Array
function getMatrixInverseArray2(row) {
  var n = row;
  var matrix = new Array(n);
  for (var i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  var curr1;
  var curString1 = "";
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      curString1 = "inv2-" + i + "-" + j;
      curr1 = Number(document.getElementById(curString1).innerText);
      console.log(curString1);
      console.log(curr1);
      matrix[i][j] = curr1;
      console.log("Matrix Array: " + matrix[i][j]);
    }
  }
  return matrix;
}

//Finds the inverse of the First Matrix and Update Presentation
function findInverseMtrx1() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var n = row;
  var adj = new Array(n);
  for (var i = 0; i < n; i++) {
    adj[i] = new Array(n);
  }
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix1 = getMatrixArray(row);
  var inverse = inverseOfMatrix(matrix1, row, adj);
  var curr;
  var string = "<section id= 'inverseMatrix1'><div>Inverse of the First Matrix:</div><table id='invMtrx1'class='matrix'>";
  console.log(inverse);
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      curr = inverse[i][j];
      console.log(curr);
      string += "\n<td id='inv1-" + i + "-" + j + "'>\n" + curr + "</td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n<section id='detInverse'></section><button type='submit' id='inv1det' onclick='findDetInverse1()'>Determinant of the Inverse Matrix 1</button>" +
    "<button type='submit' id='hideInvMtrx1' onclick='hideInverseMatrix1()'>Hide Inverse Matrix 1</button</section>";
  $("#inverseMatrix1").replaceWith(string);
  $("button").remove("#mtrx1Inverse");
}

//Finds the Inverse of the Second Matrix and Updates the Presentation
function findInverseMtrx2(row, col, oper) {
  var n = row;
  var adj = new Array(n);
  for (var i = 0; i < n; i++) {
    adj[i] = new Array(n);
  }
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix2 = getMatrixArray2(row);
  var inverse = inverseOfMatrix(matrix2, row, adj);
  var curr;
  var string = "<section id= 'inverseMatrix2'><div>Inverse of the Second Matrix:</div><table id='invMtrx2'class='matrix'>";
  console.log(inverse);
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      curr = inverse[i][j];
      console.log(curr);
      string += "\n<td id='inv2-" + i + "-" + j + "'>\n" + curr + "</td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n<section id='detInverse2'></section><button type='submit' id='inv2det' onclick='findDetInverse2(" + row + ")'>Determinant of the Inverse Matrix 2</button>";
  $("button").remove("#mtrx2Inverse");
  if (oper == 0) {
    $("button").remove("#addBtn");
    string += "<button id='addBtn' type='submit' onclick='addEqual()'>=</button>";
  }
  if (oper == 1) {
    $("button").remove("#subBtn");
    string += "<button id='subBtn' type='submit' onclick='subEqual()'>=</button>";
  }
  if (oper == 2) {
    $("button").remove("#multiBtn");
    string += "<button id='multiBtn' type='submit' onclick='multiEqual(" + row + "," + col + ")'>=</button>";
  }
  string += "</section>";
  $("#inverseMatrix2").replaceWith(string);
}

//Finds the Adjoint Matrix of the First Matrix and Updates the Presentation
function findAdjMtrx1() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var n = row;
  var adj = new Array(n);
  for (var i = 0; i < n; i++) {
    adj[i] = new Array(n);
  }
  if (row != col) {
    alert("Determinant are only calculated for square Matrices.")
    return;
  }
  var matrix1 = getMatrixArray(row);
  var adjoint = adjointMatrix(matrix1, row, adj);
  var curr;
  var string = "<section id= 'adjMatrix1'><button type='submit' id='hideadj1' onclick='hideAdj1()'>Hide Adjoint Matrix 1</button>" +
    "<div>Adjoint Matrix 1:</div><table id='adjMtrx1'class='matrix'>";
  console.log(adjoint);
  for (var i = 0; i < row; i++) {
    string += "\n<tr>";
    for (var j = 0; j < col; j++) {
      curr = adjoint[i][j];
      console.log(curr);
      string += "\n<td id='adj1-" + i + "-" + j + "'>\n" + curr + "</td>";
    }
    string += "\n</tr>";
  }
  string += "\n</table>\n</section>";
  $("#adjMatrix1").replaceWith(string);
  $("button").remove("#mtrx1Adj");
}

//Hides Adjoint Option if its not a Square Matrix
function hideAdj1() {
  $("button").remove("#hideadj1");
  var string = "<section id='adjMatrix1'><button type='submit' id='mtrx1Adj' onclick='findAdjMtrx1()'>Show Adjoint Matrix 1</button></section>";
  $("#adjMatrix1").replaceWith(string);
}

//Hides Determinant Option for first Matrix if its not a Square Matrix
function hideDetMtrx1() {
  $("button").remove("#hideMtrx1Det");
  var string = "<section id='detMatrix1'><button type='submit' id='mtrx1det' onclick='findDetMtrx1()'>Show Matrix 1 Determinant</button></section>";
  $("#detMatrix1").replaceWith(string);
}

//Hides Inverse Option for the first Matrix if its not a Square Matrix
function hideInverseMatrix1() {
  $("button").remove("#hideInvMtrx1");
  var string = "<section id='inverseMatrix1'><button type='submit' id='mtrx1Inverse' onclick='findInverseMtrx1()'>Show Inverse Matrix 1</button></section>";
  $("#inverseMatrix1").replaceWith(string);
}

//Hides Determinant Option for the Second Matrix if its not a Square Matrix
function hideDetMtrx2() {
  $("button").remove("#hideMtrx1Det");
  var string = "<section id='detMatrix2'><button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Show Matrix 2 Determinant</button></section>";
  $("#detMatrix2").replaceWith(string);
}

//Clears first Matrix
function clearMatrix1() {
  $('#displayMatrix1').empty();
}

//Clears Second Matrix
function clearMatrix2() {
  $('#displayMatrix2').empty();
}
