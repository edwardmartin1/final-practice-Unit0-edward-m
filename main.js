/*
to do:

need to add pseudocode 
need to reformat so bracket and braces are on same line as code

*/




/* Pseudocode

BUILD volunteer_opportunities data set from saved opportunities
BUILD volunteer_schedule data set from saved schedule

START
    DISPLAY "Welcome to Community Kitchen. What is your name:"
    GET user_name
    DISPLAY "Hello" + user_name + "!" + "Are you a volunteer or an admin:""
    GET user_role

    IF user_role = Admin THEN
        LOOP until successful
            DISPLAY "Enter your password:"
            GET user_password
            VALIDATE user_password
        END LOOP

        LOOP until EXIT
            DISPLAY "Current Needs:"

            LOOP through volunteer_opportunities
                DISPLAY counter + date + description + "Spots Left:" + quantity + start_time + end_time
            END LOOP

            DISPLAY "Select Add or Delete:"
            GET add_or_delete

            IF add_or_delete = add THEN
                DISPLAY "Enter Event Date:"
                GET event_date
                DISPLAY "Enter Event Start Time:"
                GET event_start_time
                DISPLAY "Enter Event End Time:"
                GET event_end_time
                DISPLAY "Enter Event Description"
                GET event_description
                DISPLAY "Enter Number of Volunteers:"
                GET number_volunteers
                ADD volunteer_opportunities record
                DISPLAY "Add Successful"
            ELSE IF add_or_delete = delete THEN
                DISPLAY "Which row would you like to delete:"
                GET row_number
                DELETE volunteer_opportunities record
                DISPLAY "Delete Successful"

            DISPLAY "Are you finished:"
            GET user_status

            IF user_status = finished THEN
                EXIT
            END IF
        END LOOP
    ELSE IF user_role = volunteer THEN
        LOOP until EXIT
            LOOP through volunteer_schedule
                IF volunteer_schedule_name = name THEN
                    DISPLAY counter + date + start_time + end_time + "to" + end_time + description
                END IF
            END LOOP

            DISPLAY "Select Add or Delete"
            GET add_or_delete

            IF add_or_delete = add THEN
                DISPLAY "Current Needs:"

                LOOP through volunteer_opportunities
                    DISPLAY counter + date + description + "Spots Left:" + quantity + start_time + end_time
                END LOOP

                DISPLAY "Which row would you like to add:"
                GET row_number
                ADD volunteer_schedule record
                DISPLAY "Add Successful"
            ELSE IF add_or_delete = delete THEN
                DISPLAY "Which row would you like to delete:"
                GET row_number
                DELETE volunteer_schedule record
                DISPLAY "Delete Successful"

            DISPLAY "Are you finished:"
            GET user_status

            IF user_status = finished THEN
                EXIT
            END IF
        END LOOP

    DISPLAY "Thank you for visiting Community Kitchen"
END
*/



const input = require("readline-sync");

/* Skill from the module: Values, Data Types, and Operations - Following the rules for naming 
   variables including beginning with a letter, underscore, or a dollar sign, as well as 
   avoiding the use of keywords to name variables. 
*/
let isFinished;
let operationType;
let inputRowNum;

/* Skill from the module: Building Arrays - Multi-dimensional arrays allow arrays 
   to store other arrays as elements, this allows the ability to handle hierarchical 
   or relational data; my application can utilize this data structure to store 
   volunteer opportunities.   
*/

/* Elements: Date, Start Time, End Time, Description, Number of Volunteers */
let volunteersNeeded = 
[
    ["8/4/2025", "6:00 PM", "7:00 PM", "Prep Main Dish", 2],
    ["8/4/2025", "6:00 PM", "7:00 PM", "Prep Salad", 1],
    ["8/4/2025", "6:00 PM", "7:00 PM", "Prep Dessert", 1],
    ["8/11/2025", "6:00 PM", "7:00 PM", "Prep Main Dish", 2],
    ["8/11/2025", "6:00 PM", "7:00 PM", "Prep Salad", 1],
    ["8/11/2025", "6:00 PM", "7:00 PM", "Prep Dessert", 1]
];

/* Elements: Date, Start Time, End Time, Description, Name of Volunteer */
let volunteersScheduled =
[
    ["8/4/2025", "6:00 PM", "7:00 PM", "Prep Main Dish", "Edward Martin"],
    ["8/11/2025", "6:00 PM", "7:00 PM", "Prep Salad", "Mary Smith"],
    ["8/11/2025", "6:00 PM", "7:00 PM", "Prep Dessert", "Edward Martin"]        
];

let name = input.question("Welcome to Community Kitchen.  What is your name: ");
let role = input.question(`Hello ${name}!  Are you a volunteer or an admin: `);

/* Skill from the module: Control Structures and Logic - Conditional statements enable 
   us to use selection control flow to do things like control access to features; this 
   can be used to separate features of the application that are intended to be used 
   by the administrator from the features of the application that are 
   intended to be used by the volunteers. 
*/
if (role.toUpperCase() === "ADMIN")
{   
    let password;
    let encryptedPassword;    
    let inputDate;
    let inputStartTime;
    let inputEndTime;
    let inputDescription;
    let inputNumVolunteers;    
    let newEventArray;
 
    do
    {
        password = input.question("Enter your password: ");
        encryptedPassword = password.split('').reverse().join('');
    } while (encryptedPassword !== "drowssap");

    while (true)
    {        
        console.log("Current Needs:");

        for (let i = 0; i < volunteersNeeded.length; i++)
        {    
            /* Skill from the module: Stringing Characters Together - Template literals allow us to 
            create strings that incorporate variables and expressions and create multiline strings 
            for better readability. 
            */
            console.log(`${i + 1} - ${volunteersNeeded[i][0]} - ${volunteersNeeded[i][3]} - Spots Left: ${volunteersNeeded[i][4]}
    ${volunteersNeeded[i][1]} to ${volunteersNeeded[i][2]}`);
        }

        operationType = input.question("Select Add or Delete: ");
        
        if (operationType.toUpperCase() === "ADD")
        {
            newEventArray = [];
            inputDate = input.question("Enter Event Date: ");
            inputStartTime = input.question("Enter Event Start Time: ") 
            inputEndTime = input.question("Enter Event End Time: ");
            inputDescription = input.question("Enter Event Description: ");
            inputNumVolunteers = input.question("Enter Number of Volunteers: ");

            /* add logic to add row */
            newEventArray = 
            [
                inputDate, 
                inputStartTime,
                inputEndTime,
                inputDescription,
                parseInt(inputNumVolunteers)
            ];
            /* Skill from the module: Using Arrays - Array methods allow you to modify arrays, 
               access elements, and transform data; the push() method 
               can be utilized in my application to add new volunteer 
               opportunities to the end of the array that stores these values.
            */

            volunteersNeeded.push(newEventArray);

            console.log("Add Successful");
        }
        else if (operationType.toUpperCase() === "DELETE")
        {
            inputRowNum = input.question("Which row would you like to delete: ");

            /* add logic to delete row */

            console.log("Delete Successful");
        }       
        
        isFinished = input.question("Are you finished: ");

        if (isFinished === "yes")
        {
            break;
        }
    }    
}
else if (role.toUpperCase() === "VOLUNTEER")
{
    let rowCount = 0;

    /* Skill from the module: Working With Loops - Applications often require repeating 
    certain actions, like a volunteer that wants to sign up to volunteer 
    on multiple dates; this repetition is achieved using loops which allows 
    your code to cycle through a block of instructions repeatedly.
    */
    while (true)
    {
       console.log("Your are currently signed up for:");

        for (let i = 0; i < volunteersScheduled.length; i++)
        {
            if (volunteersScheduled[i][4] === name)
            {    
                rowCount += 1;

                console.log("   "
                            + rowCount 
                            + " - " 
                            + volunteersScheduled[i][0]
                            + " - "  
                            + volunteersScheduled[i][1]
                            + " to "
                            + volunteersScheduled[i][2]
                            + " - "
                            + volunteersNeeded[i][3]);
            }
        }

        operationType = input.question("Select Add or Delete: ");
        
        if (operationType.toUpperCase() === "ADD")
        {
            console.log("Current Needs:");
            for (let i = 0; i < volunteersNeeded.length; i++)
            {    
                console.log(`${i + 1} - ${volunteersNeeded[i][0]} - ${volunteersNeeded[i][3]} - Spots Left: ${volunteersNeeded[i][4]}
    ${volunteersNeeded[i][1]} to ${volunteersNeeded[i][2]}
`);    
            }   
            
            inputRowNum = input.question("Which row would you like to add: ");

            /* add logic to add row */

            console.log("Add Successful");
        }
        else if (operationType.toUpperCase() === "DELETE")
        {
            inputRowNum = input.question("Which row would you like to delete: ");

            /* add logic to delete row */
            
            console.log("Delete Successful");
        }        
        
        isFinished = input.question("Are you finished: ");
        rowCount = 0;

        if (isFinished === "yes")
        {
            break;
        }
    }    

}

console.log("Thank you for visiting Community Kitchen!");
