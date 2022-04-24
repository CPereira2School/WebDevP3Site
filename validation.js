/******w*************
    
    Project 3 Javascript
    Name: Cedric Pereira
    Date: April 20, 2022
    Description: Javascript for the Project 3 contact form.

********************/
document.addEventListener("DOMContentLoaded", load);

function load(){
	document.getElementById("submit").addEventListener("click", validate);
	document.getElementById("reset").addEventListener("click", reset);
	hideAllErrors()
}

function validate(e){
	
	hideAllErrors();

	//	Determine if the form has errors
	if(formHasErrors()){
		// 	Prevents the form from submitting
		e.preventDefault();
		// 	Returning false prevents the form from submitting
		return false;
	}
	return true;
}

/*	
	formHasErrors function
	returns a true if errors are discovered
	returns a false if there are no errors
*/
function formHasErrors(){
	let errorFlag = false;
	let phoneNumberRegExp = new RegExp(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/);
	let emailRegExp = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
	let regularExpressions = [phoneNumberRegExp, emailRegExp];
	let requiredFormatFields = ["tel", "email"];
	let requiredFields = ["fullname", "tel", "email", "bodytext"];

	// Checks for null values
	for (let i = 0; i < requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);
		if (textField.value == null || textField.value.trim() == "")
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
			if (!errorFlag)
			{
				textField.focus();
			}

			errorFlag = true;
		}
	}

	// Checks for formatting errors.
	for (let i = 0; i < requiredFormatFields.length; i++)
	{
		let textField = document.getElementById(requiredFormatFields[i]);
		if (!regularExpressions[i].test(textField.value))
		{
			document.getElementById(requiredFormatFields[i] + "format_error").style.display = "block";
			document.getElementById(requiredFormatFields[i] + "format_error").style.visibility = "visible";
			errorFlag = true;
		}
	}
	//	Code above here!
	return errorFlag;
}

function hideAllErrors()
{
	//	Get an array of the error fields
	var errorFields = document.getElementsByClassName("error");

	//	Loop through each error field
	for(var i = 0;i < errorFields.length; i++){
		//	Hide the error field
		errorFields[i].style.display = "none";
	}
}

function reset(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Reset Form?') ){
		// Ensure all error fields are hidden
		hideAllErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}