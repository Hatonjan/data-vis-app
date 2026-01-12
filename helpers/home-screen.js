/* The code below is my original work and not 
part of code from the data-viz template */ 
function HomeScreen() {
  this.design = {
    barSizeX: 20,
    barSizeY: 60,
    lineX: 430,
    lineY: 140,
    barX: 250,
    barY: 100,
  };

 this.colors = [
        "#1E90FF", 
        "#a5126f",
        "#8A2BE2"
    ];
    
  for(let i = 0; i < 2; i++) {
    // variable to draw the 2nd bar chart
    let secondBarX = i * 400;

    // Draw the bar charts
    push()
    fill(this.colors[i]);
    rect(this.design.barX + secondBarX, 
         this.design.barY, 
         this.design.barSizeX, 
         this.design.barSizeY + 40
    ); 
    rect(this.design.barX + 30 + secondBarX, 
         this.design.barY + 20, 
         this.design.barSizeX, 
         this.design.barSizeY + 20
    ); 
    rect(this.design.barX + 60 + secondBarX, 
         this.design.barY + 40, 
         this.design.barSizeX, 
         this.design.barSizeY
    ); 
    rect(this.design.barX + 90  + secondBarX, 
         this.design.barY + 30, 
         this.design.barSizeX, 
         this.design.barSizeY + 10
    );
  }
    
    // Draw the line graph 
    noFill();
    beginShape();
    strokeWeight(5);
    stroke(this.colors[2]);
    vertex(this.design.lineX, 
           this.design.lineY
    );
    vertex(this.design.lineX + 50, 
           this.design.lineY + 30
    );
    vertex(this.design.lineX + 100, 
           this.design.lineY + 35
    );
    vertex(this.design.lineX + 150, 
           this.design.lineY + 55
    );
    endShape();
    
    // Display the text of the this.design screen 
    const message = 'Select a visualization to Explore';  
    
    fill(245);
    noStroke();
    textAlign(CENTER);
    textFont('Verdana', 50);
    text(message, width/2, height/2);
    pop();
}
// End of my work original work