/* This code was written following the instructions from the 
video lecture from week 11 adapted to a constructor function */
function EatingBehavior() {
    // Name for the visualization to appear in the menu bar.
    this.name = 'Eating Behavior';

    // Each visualization must have a unique ID with no special
    // characters.
    this.id = 'eating-behavior';

    //  variables   
    let data;
    let waffles = [];
    let waffle;

    this.preload = function() {
        // Loads the data 
        data = loadTable(
            "./data/food-consumption-data/eating-behavior.csv", 
            "csv", 
            "header");
    };

    this.setup = function() {
        // Arrays
        const days = [
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday",
            "Sunday"
        ];

        const values = [
            'Take-away', 
            'Cooked from fresh',  
            'Ready meal', 
            'Ate out',
            'Left overs',
            'Skipped meal' 
            
        ];

        // Object instantiation
        for(let i = 0; i < days.length; i++) {
            if(i< 4) {
                waffles.push(new Waffle(
                    20 + (i * 230), 100,     // Coordinates 
                    200, 200,                // waffle size
                    11, 11,                  // Number of boxes per axel
                    data, days[i], values)); // Data
            } else {
                waffles.push(new Waffle(
                    20 + ((i  -4) * 230), 350, // Coordinates
                    200, 200,                  // waffle size 
                    11, 11,                    // Number of boxes per axel 
                    data, days[i], values));   // Data
            }
        }
    };

    this.draw = function() {
        background(backgroundColor);
        // loop to draw the waffle charts  	
        for(let i = 0; i < waffles.length; i ++) {
            waffles[i].draw();
        }

        // Loop to display data when the mouse pointer is over 
        for(let i = 0; i < waffles.length; i++) {
            waffles[i].checkMouse(mouseX, mouseY);
        }
    };
}