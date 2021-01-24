//Authors: Nyran Bonilla & Asim Shariff


//Calculates the Solution for Addition Operation
function addEqual() {
  $('#operation').hide();
  $('.matrix2-ops').hide();

  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var string = "<section class='matrixCont' id='displayMatrix1'><table class='matrix' id='matrix1'>";
  var sum;
  var curr1;
  var curr2;
  var curString1 = "";
  var curString2 = "";

  //Checks if it is a Square Matrix
  if (row == col) {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curString2 = "mtrx2-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        curr2 = Number(document.getElementById(curString2).innerText);
        sum = curr1 + curr2;
        console.log(sum);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  } else {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curString2 = "mtrx2-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        curr2 = Number(document.getElementById(curString2).innerText);
        sum = curr1 + curr2;
        console.log(sum);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  }
  $("#displayMatrix2").replaceWith("<section class='matrixCont' id='displayMatrix2'>\n<section id='detMatrix2'></section>\n</section>");
  $("#displayMatrix1").replaceWith(string);
  $("#inverseMatrix1").replaceWith("<section id= 'inverseMatrix1'><section id='detInverse'></section></section>");
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
}

//Calculates the Solution for the Subtraction Operation
function subEqual() {
  $('.matrix2-ops').hide();
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var string = "<section class='matrixCont' id='displayMatrix1'><table class='matrix' id='matrix1'>";
  var sum;
  var curr1;
  var curr2;
  var curString1 = "";
  var curString2 = "";

  //Checks if it is a Square Matrix
  if (row == col) {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curString2 = "mtrx2-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        curr2 = Number(document.getElementById(curString2).innerText);
        sum = curr1 - curr2;
        console.log(sum);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  } else {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curString2 = "mtrx2-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        curr2 = Number(document.getElementById(curString2).innerText);
        sum = curr1 - curr2;
        console.log(sum);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  }
  $("#displayMatrix2").replaceWith("<section class='matrixCont' id='displayMatrix2'>\n<section id='detMatrix2'></section>\n</section>");
  $("#displayMatrix1").replaceWith(string);
  $("#inverseMatrix1").replaceWith("<section id= 'inverseMatrix1'><section id='detInverse'></section></section>");
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
}

//Calculates the Product
function multiEqual(row2, col2) {
  $('.matrix2-ops').hide();
  var row1 = document.getElementById("rows").value;
  var string = "<section class='matrixCont' id='displayMatrix1'><table class='matrix' id='matrix1'>";
  var curr1;
  var curr2;
  var curString1 = "";
  var curString2 = "";
  var sum = 0;

  //Checks if it is a Square Matrix
  if (row1 == col2) {
    for (var i = 0; i < row1; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col2; j++) {
        for (var k = 0; k < row2; k++) {
          curString1 = "mtrx1-" + i + "-" + k;
          curString2 = "mtrx2-" + k + "-" + j;
          curr1 = Number(document.getElementById(curString1).innerText);
          curr2 = Number(document.getElementById(curString2).innerText);
          sum = sum + curr1 * curr2;
          console.log(sum);
        }
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
        sum = 0;
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  } else {
    for (var i = 0; i < row1; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col2; j++) {
        for (var k = 0; k < row2; k++) {
          curString1 = "mtrx1-" + i + "-" + k;
          curString2 = "mtrx2-" + k + "-" + j;
          curr1 = Number(document.getElementById(curString1).innerText);
          curr2 = Number(document.getElementById(curString2).innerText);
          sum = sum + curr1 * curr2;
          console.log(sum);
        }
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>" + sum + "</td>";
        sum = 0;
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='detMatrix1'></section>\n<section id='scalar1'></section>\n</section>";
  }
  $("#displayMatrix2").replaceWith("<section class='matrixCont' id='displayMatrix2'>\n<section id='detMatrix2'></section>\n</section>");
  $("#displayMatrix1").replaceWith(string);
  $("#inverseMatrix1").replaceWith("<section id= 'inverseMatrix1'><section id='detInverse'></section></section>");
  $("#inverseMatrix2").replaceWith("<section id= 'inverseMatrix2'><section id='detInverse2'></section></section>");
  document.getElementById("cols").value = col2;
}

//Calculates the Inverse Matrix
function inverseOfMatrix(matrix1, n, adj) {
  var sign = 1;
  var temp = new Array(n); // temp is used to store cofactors
  var det = determinantOfMatrix(matrix1, n);
  for (var i = 0; i < n; i++) {
    temp[i] = new Array(n);
  }
  if (n == 1) {
    adj[0][0] = 1;
    return;
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      getCofactor(matrix1, temp, i, j, n);
      // sign is negative if sum of row
      // and column indexes is odd.
      if ((i + j) % 2 != 0) {
        sign = -1;
      } else {
        sign = 1;
      }
      // Interchanging rows and columns to get the
      // transpose of the cofactor matrix
      adj[j][i] = (sign) * (determinantOfMatrix(temp, n - 1));
    }
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      temp[i][j] = adj[i][j] / (det);
    }
  }
  return temp;
}

//Calculates the Adjoint Matrix
function adjointMatrix(matrix1, n, adj) {
  var sign = 1;
  var temp = new Array(n); // temp is used to store cofactors
  for (var i = 0; i < n; i++) {
    temp[i] = new Array(n);
  }
  if (n == 1) {
    adj[0][0] = 1;
    return;
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      getCofactor(matrix1, temp, i, j, n);
      // sign is negative if sum of row
      // and column indexes is odd.
      if ((i + j) % 2 != 0) {
        sign = -1;
      } else {
        sign = 1;
      }
      // Interchanging rows and columns to get the
      // transpose of the cofactor matrix
      adj[j][i] = (sign) * (determinantOfMatrix(temp, n - 1));
    }
  }
  return adj;
}

//Finds the Deteerminant of Matrix
function determinantOfMatrix(matrix1, n) {
  var det = 0; // Initialize result
  // Only one element in matrix
  if (n == 1) {
    return matrix1[0][0];
  }
  //Temp array to store cofactors
  var temp = new Array(n);
  for (var i = 0; i < n; i++) {
    temp[i] = new Array(n);
  }
  var sign = 1;
  for (var f = 0; f < n; f++) {
    // Getting Cofactor of mat[0][f]
    getCofactor(matrix1, temp, 0, f, n);
    det += sign * matrix1[0][f] * determinantOfMatrix(temp, n - 1);
    // terms are to be added with alternate sign
    sign = -sign;
  }
  return det;
}

//Gets the cofactor matrix
function getCofactor(matrix1, temp, p, q, n) {
  var i = 0,
    j = 0;
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      if (row != p && col != q) {
        temp[i][j++] = matrix1[row][col];
        if (j == n - 1) {
          j = 0;
          i++;
        }
      }
    }
  }
}

//Calculates Scalar Multiplication for first Matrix
function scalMtx1() {
  var row = document.getElementById("rows").value;
  var col = document.getElementById("cols").value;
  var scal = document.getElementById("scalNum1").value;
  var string = "<section class='matrixCont' id='displayMatrix1'><table class='matrix' id='matrix1'>";
  var product;
  var curr1;
  var curString1 = "";

  //Checks if it is a Square Matrix
  if (row == col) {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        product = curr1 * scal;
        console.log(product);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + product + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id='detMatrix1'></section></section>";
  } else {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString1 = "mtrx1-" + i + "-" + j;
        curr1 = Number(document.getElementById(curString1).innerText);
        product = curr1 * scal;
        console.log(product);
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + product + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id= 'detMatrix1'></section>\n</section>";
  }
  $("#displayMatrix1").replaceWith(string);
}

//Calculates Scalar Multiplication for the Second Matrix
function scalMtx2(row, col, operation) {
  var scal = document.getElementById("scalNum2").value;
  var string = "<section class='matrixCont' id='displayMatrix2'>";
  if (operation == 2) {
    string += "<div>X</div>";
  }
  if (operation == 1) {
    string += "<div>-</div>";
  }
  if (operation == 0) {
    string += "<div>+</div>";
  }
  string += "\n<button type='submit' onclick='nextScalar2(" + row + "," + col + "," + operation + ")'>Scalar Multiplication</button><table class='matrix' id='matrix2'>";
  var product;
  var curr2;
  var curString2 = "";

  //Checks if it is a Square Matrix
  if (row == col) {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString2 = "mtrx2-" + i + "-" + j;
        curr2 = Number(document.getElementById(curString2).innerText);
        product = curr2 * scal;
        console.log(product);
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + product + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section>";
  } else {
    for (var i = 0; i < row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < col; j++) {
        curString2 = "mtrx2-" + i + "-" + j;
        curr2 = Number(document.getElementById(curString2).innerText);
        product = curr2 * scal;
        console.log(product);
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + product + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id= 'detMatrix2'></section>";
  }
  if (operation == 2) {
    string += "<button type='submit' onclick='multiEqual(" + row + "," + col + ")'>=</button></section>";
  }
  if (operation == 1) {
    string += "<button type='submit' onclick='subEqual()'>=</button></section>";
  }
  if (operation == 0) {
    string += "<button type='submit' onclick='addEqual()'>=</button></section>";
  }
  $("#displayMatrix2").replaceWith(string);
}
