 $(document).ready(function () {
 	$.ajax({
 		type: 'GET',
 		url: "https://api.myjson.com/bins/1h3vb3",
 		success: function (json) {
 			data = json;
 			var bookArray = data.books;
 			console.log("books", bookArray);
 			createBooks(bookArray);
			filterBooks();
 		},

 		error: function (json) {
 			alert("Book not found. Please check entry is spelt correctly.");
 		}
 	});
 });

 function createBooks(bookArray) {
 	console.log(bookArray);
 	console.log(bookArray.length);
 	for (i = 0; i < bookArray.length; i++) {
		
		var bookContainer = document.getElementById("container-12");
 		var bookTitle = bookArray[i].titulo;
 		var bookDesc = bookArray[i].descripcion;
 		var bookBack = bookArray[i].detalle;
 		var bookFront = bookArray[i].portada;

 		var flipCDiv = document.createElement("div");
 		flipCDiv.setAttribute("class", "element-item flip-container col-md-4");
 		flipCDiv.setAttribute("ontouchstart", "this.classList.toggle('hover');");
 		flipCDiv.setAttribute("id", "flip-container");

 		var flipperDiv = document.createElement("div");
 		flipperDiv.setAttribute("class", "flipper");
 		flipperDiv.setAttribute("id", "flipper");

 		var frontDiv = document.createElement("div");
 		frontDiv.setAttribute("class", "front");
 		frontDiv.setAttribute("id", "front");

 		var imgDiv = document.createElement("div");
 		imgDiv.setAttribute("class", "imgDiv");
 		imgDiv.setAttribute("id", "imgDiv");

 		var img = document.createElement("img");
 		img.setAttribute("src", bookFront);
 		img.setAttribute("class", "bookFront");

 		var backDiv = document.createElement("div");
 		backDiv.setAttribute("class", "back");
 		backDiv.setAttribute("id", "back");

 		var titleDiv = document.createElement("div");
 		titleDiv.setAttribute("class", "book-title");
 		titleDiv.setAttribute("id", "book-title");

 		var descDiv = document.createElement("div");
 		descDiv.setAttribute("class", "book-description");
 		descDiv.setAttribute("id", "book-description");
		
		var button = document.createElement("button");
		button.setAttribute("type", "submit");
		button.setAttribute("class", "moreInfoButton");

 		var hLink = document.createElement("a");
 		hLink.setAttribute("href", bookBack);
 		hLink.setAttribute("data-fancybox", "images");
 		hLink.setAttribute("data-caption", bookDesc);
 		hLink.innerHTML = "More Info";

 		//	document.getElementById("button").innerHTML = "More Info";

 		bookContainer.append(flipCDiv);
 		flipCDiv.append(flipperDiv);
 		flipperDiv.append(frontDiv);
 		frontDiv.append(imgDiv);
 		imgDiv.append(img);
 		flipperDiv.append(backDiv);
 		backDiv.append(titleDiv);
 		backDiv.append(descDiv);
 		backDiv.append(button);
		button.append(hLink);

 		titleDiv.innerHTML = bookTitle;
 		descDiv.innerHTML = bookDesc;

 	}
 }

 $('[data-fancybox]').fancybox({
 	buttons: [
  'zoom',
  'close'
]
 });



function filterBooks() {
 // quick search regex
 var qsRegex;

 // init Isotope
 var $grid = $('.grid').isotope({
 	itemSelector: '.element-item',
 	layoutMode: 'fitRows',
 	filter: function () {
 		return qsRegex ? $(this).text().match(qsRegex) : true;
 	}
 });

 // use value of search field to filter
 var $quicksearch = $('.quicksearch').keyup(debounce(function () {
 	qsRegex = new RegExp($quicksearch.val(), 'gi');
 	$grid.isotope();
 }, 200));

 // debounce so filtering doesn't happen every millisecond
 function debounce(fn, threshold) {
 	var timeout;
 	return function debounced() {
 		if (timeout) {
 			clearTimeout(timeout);
 		}

 		function delayed() {
 			fn();
 			timeout = null;
 		}
 		timeout = setTimeout(delayed, threshold || 100);
 	}
 }
}