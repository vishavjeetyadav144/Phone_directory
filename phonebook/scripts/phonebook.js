window.onload = function(){
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	var addphoneDiv = document.querySelector('.phonebook');

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addphoneDiv.addEventListener("click", removeEntry);

	var phoneBook = [];
	function jsonStructure(fullname,phone,email){
		this.fullname = fullname;
		this.phone = phone;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && email.value!='';
		if(isNull){
			var obj = new jsonStructure(fullname.value,phone.value,email.value);
			phoneBook.push(obj);
			localStorage['addbook'] = JSON.stringify(phoneBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showphoneBook();
		}
	}

	function removeEntry(e){
		
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			phoneBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(phoneBook);
			showphoneBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showphoneBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			phoneBook = JSON.parse(localStorage['addbook']);
			addphoneDiv.innerHTML = '';
			for(var n in phoneBook){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + phoneBook[n].fullname + '</p></div>';
					str += '<div class="email"><p>' + phoneBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + phoneBook[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addphoneDiv.innerHTML += str;
			}
		}
	}

	showphoneBook();

}