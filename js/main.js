var addItem = document.querySelector('.add');
var todoList = document.querySelector('.todoList');
var all = document.querySelector('.all');
var footer = document.querySelector('footer');
	
addItem.addEventListener('keypress', function (e) {
	if (e.keyCode === 13 && addItem.value!="") {
		var listItem = document.createElement('li');
		listItem.innerHTML = '<label><input type="checkbox" class="el">'+addItem.value+'</label><div class="icon-close"></div>';
		todoList.appendChild(listItem);
		addItem.value = "";
		all.checked=false;
		all.parentNode.style.display = 'block';
		footer.style.display = 'block';
		addItem.style.marginBottom = '0';
		todoList.style.padding = '20px';
		if(listItem.previousSibling) {
			listItem.previousSibling.style.borderBottom = '1px solid #cccccc';
		}
	}
});

todoList.addEventListener('click', function (e) {
	var bp = true;
	if (e.target.className==="icon-close"){
		todoList.removeChild(e.target.parentNode);
		if(!todoList.children.length) {
			all.checked=false;
			all.parentNode.style.display = 'none';
			footer.style.display = 'none';
		}
		else {
			for (var i=0; i<todoList.children.length; i++){
				if (!todoList.children[i].querySelector('.el').checked) {
					bp=false;
					break;
				}
			}
			if (bp) all.checked=true;
		}
	}
	else if (e.target.nodeName!="UL") {
		if(e.target.checked) {
			e.target.parentNode.style.textDecoration = 'line-through';
			for (var i=0; i<todoList.children.length; i++){
				if (!todoList.children[i].querySelector('.el').checked) {
					bp=false;
					break;
				}
			}
			if (bp) all.checked=true;
		}
		else {
			e.target.parentNode.style.textDecoration = 'none';
			all.checked=false;
		}
	}
});

function done() {
	if(all.checked) {
		for (var i=0; i<todoList.children.length; i++) {
			todoList.children[i].querySelector('.el').checked=true;
			todoList.children[i].querySelector('.el').parentNode.style.textDecoration = 'line-through';
		}
	}
	else {
		for (var i=0; i<todoList.children.length; i++) {
			todoList.children[i].querySelector('.el').checked=false;
			todoList.children[i].querySelector('.el').parentNode.style.textDecoration = 'none';
		}
	}
};

all.addEventListener('click', done);

function del() {
	for (var i=0; i<todoList.children.length; i++) {
		if (todoList.children[i].querySelector('.el').checked) {
			todoList.removeChild(todoList.children[i]);
			i--;
		}
	}
	if(!todoList.children.length) {
		all.checked=false;
		all.parentNode.style.display = 'none';
		footer.style.display = 'none';
	}
};

footer.addEventListener('click', del);

todoList.addEventListener('mouseover', function (e) {
	var a=e.target.querySelector('div') || e.target;
	if (a.className==="icon-close") a.style.display = 'block';
	if (e.target.className==="icon-close") e.target.style.color = 'black';

});

todoList.addEventListener('mouseout', function (e) {
	var a=e.target.querySelector('div') || e.target;
	if (a.className==="icon-close") a.style.display = 'none';
	if (e.target.className==="icon-close") e.target.style.color = '#cccccc';
});