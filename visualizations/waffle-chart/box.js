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

    function drawBox(sw) {
        push();
        // Draw the waffle squares
        fill(category.color);
        strokeWeight(sw);
        stroke(backgroundColor);
        rect(x, y, width, height, 2);
        pop();
    }
    /* End of my original work */
}