/*
Filename: app.js 
Student name: Xtreme Dynamos
Date: November 11, 2021
*/

(function(){
    function Start()
    {
        console.log("App Started...");
        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        //Adding events to buttons
        for(button of deleteButtons)
            button.addEventListener('click', (event) => 
            {
                //Confirmation before deleting
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/survey-listSurvey');
                }
            });
    }
    
    window.addEventListener("load", Start);
    
    })();