//Authors: Nyran Bonilla & Asim Shariff




//Initialize variables for global reference 

var matrix1Row;
var matrix1Col;
var matrix2Row;
var matrix2Col;

//Reads in the first matrix from the file as it is uploaded and sends it to the display function
$(document).on('change', '#upload1', function (event) {
  var files = document.getElementById("upload1").files;
  var reader = new FileReader();
  reader.onload = function (event) {
    displayMatrix1(event);
  }
  reader.readAsText(event.target.files[0]);
});

//Reads in the second matrix from the file as it is uploaded and sends it to the display function
$(document).on('change', '#upload2', function (event) {
  var files = document.getElementById("upload2").files;
  var reader = new FileReader();
  reader.onload = function (event) {
    displayMatrix2(event);
  }
  reader.readAsText(event.target.files[0]);
});

//Receives data from the first file and displays the matrix to the screen
function displayMatrix1(data) {
  $('.btn-operations').show();
  var string = "";
  const jsonObj = JSON.parse(data.target.result);
  
  //Assign values to global variables
  matrix1Row = Object.keys(jsonObj.matrix.data).length;
  matrix1Col = jsonObj.matrix.data[0].length;
  $('#rows').val(matrix1Row);
  $('#cols').val(matrix1Col);
  if (matrix1Row != matrix1Col) {
    $('.sq-ops').hide();
  } else {
    $('.sq-ops').show();
  }
  string = "<section class='matrixCont' id='displayMatrix1'>\n<table class='matrix' id='matrix1'>\n"
  
  //Checks to make sure all entries are valid numbers
  if (matricCheck(data)) {
    alert("Invalid matrix. Please verify all matrix values are numbers");
    return;
  }
  if (matrix1Row == matrix1Col) {
    for (var i = 0; i < matrix1Row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < matrix1Col; j++) {
        curString = "data-" + i + "-" + j;
        curr = jsonObj.matrix.data[i][j];
        string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id='detMatrix1'></section></section>";
  } else {
    for (var i = 0; i < matrix1Row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < matrix1Col; j++) {
        curString = "data-" + i + "-" + j;
        curr = jsonObj.matrix.data[i][j];
        console.log(curr);
        if (isNaN(curr)) {
          alert("Invalid matrix. Please verify all matrix values are numbers");
          break;
        } else
          string += "\n<td id='mtrx1-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar1'></section><section id='detMatrix1'></section></section>";
  }
  $("#results").html(string);
};


//Receives data from the second file and displays the matrix to the screen
function displayMatrix2(data) {
  var string = "";
  const jsonObj = JSON.parse(data.target.result);
  
  //Assign values to global variables
  matrix2Row = Object.keys(jsonObj.matrix.data).length;
  matrix2Col = jsonObj.matrix.data[0].length;

  string = "<section class='matrixCont' id='displayMatrix2'>\n<table class='matrix' id='matrix2'>";
  
  //Checks to make sure all entries are valid numbers 
  if (matricCheck(data)) {
    alert("Invalid matrix. Please verify all matrix values are numbers");
    return;
  }
  if (matrix2Row == matrix1Col) {
    for (var i = 0; i < matrix2Row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < matrix1Col; j++) {
        curString = "data-" + i + "-" + j;
        curr = jsonObj.matrix.data[i][j];
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n</section>";
  } else {
    for (var i = 0; i < matrix2Row; i++) {
      string += "\n<tr>";
      for (var j = 0; j < matrix2Col; j++) {
        curString = "data-" + i + "-" + j;
        curr = jsonObj.matrix.data[i][j];
        string += "\n<td id='mtrx2-" + i + "-" + j + "'>\n" + curr + "</td>";
      }
      string += "\n</tr>";
    }
    string += "\n</table>\n<section id='scalar2'></section><section id='detMatrix2'></section></section>";
    $('.matrix2-ops').html("<button type='submit' id='mtrx2det' onclick='findDetMtrx2()'>Second Matrix Determinant</button>"
    + "\n<button type='submit' id='mtrx2Inverse' onclick='findInverseMtrx2("+row+ "," +col+", 0)'>Second Matrix Inverse</button>");
  }
  $("#matrix2").html(string);

};

//Calls addEqual() for uploaded matrices 
function addUpload() {
  //Checks to make sure a second matrix is uploaded
  try {
    addEqual();
  } catch (err) {
    alert('Please upload a second matrix');
  }
  $('#dlArea').show();
};

//Calls subEqual() for uploaded matrices 
function subUpload() {
    //Checks to make sure a second matrix is uploaded
  try {
    subEqual();
  } catch (err) {
    alert('Please upload a second matrix');
  }
  $('#dlArea').show();
};

//Checks for errors and makes sure both matrices are compatible
//then calls multiEqual() for both matrices 
function multUpload() {
    //Checks to make sure a second matrix is uploaded
  if (matrix2Col == null || matrix2Row == null) {
    alert('Please upload a second matrix')
  } else if (matrix1Col == matrix2Row) {
    multiEqual(matrix1Row, matrix2Col);
    $('#dlArea').show();
  } else {
    alert("The first maxtrix must have the same number of columns as the number of rows in the second matrix");
  }


}

//Gathers result matrix entries for download back into JSON file 
$(document).on('click', '#downloadbtn', function () {
  var rows = matrix1Row;
  var cols = matrix2Col;
  var rowtemp = [];
  
  //Prepares object structure 
  var data = {
    "matrix": {
      "data": []
    }
  };
  for (let i = 0; i < rows; i++) {
    rowtemp = [];
    for (let j = 0; j < cols; j++) {
      var temp = document.getElementById("mtrx1-" + i + "-" + j + '').innerHTML;
      rowtemp.push(temp);
    }
    data.matrix.data.push(rowtemp);

  }
  data = JSON.stringify(data);
  var blob = new Blob([data], {
    type: "application/json;charset=utf-8"
  });
  saveAs(blob, "result.json");
});

//Function to check all entries and make sure they are valid numbers
function matricCheck(data) {
  const jsonObj = JSON.parse(data.target.result);
  var rowCheck = Object.keys(jsonObj.matrix.data).length;
  var colCheck = jsonObj.matrix.data[0].length;
  for (let i = 0; i < rowCheck; i++) {
    for (let j = 0; j < colCheck; j++) {
      var curr = jsonObj.matrix.data[i][j];
      if (isNaN(curr)) {
        return true;
      } else continue;
    }
  }
  return false;
}