/* This code was written following the instructions from the 
video lecture from week 11 adapted to a constructor function*/
function Box(x, y, width, height, category) {
    // Variables
    var x = x;
    var y = y;
    var width;
    var height;
    this.category = category;

    this.mouseOver = function() {
        // If the mouse over this box
        if(mouseX > x && mouseX < x + width && 
            mouseY > y && mouseY < y + height) {
            
            // Hover effect
            drawBox();
 
            // Display the data 
            return this.category.name;
        }
        return false;
    };

    this.draw = function() {
        drawBox(7);
    };

    /* The code below is my original work and not 
       part of code from the video lecture */
    function drawBox(sw) {
        push();
        // Draw the waffle squares
        fill(category.color);
        strokeWeight(sw);
        stroke(backgroundColor);
        rect(x, y, width, height, 6);
        pop();
    }
    /* End of my original work */
}