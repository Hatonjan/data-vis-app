function CarPriceByFuelConsumption() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'Car Price by Gasoline Consumption';

  // Each visualization must have a unique ID with no special
  // characters.
  this.id = 'car-price-by-gasoline-consumption';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  this.dotSizeMin = 15;
  this.dotSizeMax = 40;
  this.pad = 100;

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
  const self = this;
  this.data = loadTable(
    './data/auto-data/auto-final-data.csv', 'csv', 'header',
    // Callback function to set the value
    // this.loaded to true. 
    function(table) {
      self.loaded = true;
    });

  };

  this.setup = function() {
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the axes.
    this.addAxes();

    // Get data from the table object.
    const price = this.data.getColumn('price');
    const horsepower = this.data.getColumn('L/100km-mean');
    const make = this.data.getColumn('make');

    // Set ranges for axes.
    // Use full 100% for x-axis (proportion of women in roles).     
    const priceMin = 10198;
    const priceMax = 45400;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    const kmPerLiterMin = 6.53;
    const kmPerLiterMax = 15.95;
    
    for (i = 0; i < this.data.getRowCount(); i++) {
          const dotSize =  15;
          let xPos = map(price[i], priceMin, priceMax, this.pad+dotSize/2, width - (this.pad + dotSize)); 
          let yPos = map(horsepower[i], kmPerLiterMin, kmPerLiterMax, height - this.pad, this.pad);
          let b = map(price[i], priceMin, priceMax, 123, 255);
          
          const sColor = 120 // Set the stroke color of the data points 

      // Draw an ellipse for each point.
      push();
      stroke(sColor, sColor, sColor, sColor);
      fill(23, 64, b, 150); 
      ellipse(xPos, yPos, dotSize);

      /* Draw a line to following the upward trend 
      to help guide users in interpreting the data */
      strokeWeight(3);
      stroke("#800080");
      line(100, 425, 920, 102);
      pop();

      // Add a title to the canvas
      this.drawTitle();

    // Creates the mouse hover effect and display the data
    this.checkMouse(xPos, yPos, dotSize, make, i);
    }

    // Display text to let the user know that is an interactive plot
		if(mouseX < this.pad || mouseY < this.pad || mouseY > height) {
			// Draw the information box
			fill(34,34,60, 150);
			rect(width - this.pad*2.8, height- this.pad*1.6, 180, 50, 5);	
				
			// Display text 
			fill(245);
			noStroke();
			textSize(20);
			text('Hover over a dot', 
        width - this.pad*2.8, 
        height- this.pad*1.4, 
        180
      );
		}
  };

  this.addAxes = function () {
    // Variables for x and y values
    const xGrid = (width - this.pad) / 10;
    const yGrid = (height - this.pad-20) / 10;
        
    // Draw horizontal and vertical grid lines 
    // to help with data interpretation 
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        stroke(50);

        //  Add vertical grid lines.
        line(
          this.pad + (xGrid * i), this.pad, 
          this.pad + (xGrid * i), height - 65 
        );

        // Add horizontal grid lines.
        line(
          this.pad, this.pad + (yGrid * j), 
          width - 93, this.pad + (yGrid * j)
        );

        // Car price 
        const carPrice = floor(45400 - (3911.1 * j));

        // Display the Car price
        fill(200);
        textFont(goldman);
        textSize(15);
        textAlign(RIGHT, BOTTOM);
        text(carPrice, this.pad - 10, this.pad + (yGrid * j));

        // Display the data type for the car price
        textAlign(CENTER,CENTER);
        text("$", this.pad/5, height/2);
        text("USD", this.pad/5, height/2 + 15);

        // Calculate the percentage gap
        const literPerKilometer = (6.50 + (1.2777 * i)).toFixed(2);
        // Display the percentage gap
        fill(200);
        textSize(15);
        textAlign(LEFT, TOP);
        text(literPerKilometer, this.pad + (xGrid * i), height - 60);

        // Display the data type for the gasoline consumption
        text('L/100km', width/2, height - 25);
      }
    }
  };

  this.checkMouse = function(xPos, yPos, dotSize, make) {
    // Data Display 
    const mouseOver = dist(xPos, yPos, mouseX, mouseY) < dotSize - 10;
    const message = make[i];
    
    if(mouseOver) {
      push();
      // Draw the background of the data display 
      noStroke(); 
      fill(34,34,60, 150);   
      rect(width - this.pad*2.8, height- this.pad*1.6, 185, 40, 5);	

      // Display the car make wen mouse is over the data point
      fill(245);
      textSize(20);
      textAlign(LEFT ,TOP);
      // text(message, width - this.pad*2.7, height- this.pad);
      text(message, 
        width - this.pad*2.7, 
        height- this.pad*1.5
      );

      // Creates a hover effect wen the mouse is over the data point
      fill(128,0,128); 
      stroke(23,65,123);
      strokeWeight(4);
      ellipse(xPos, yPos, dotSize+10);
      pop();
    } 
  };

  this.drawTitle = function () {
    const title = 'Car Price By Gasoline Consumption Comparison'
      fill(245);
      stroke(50);
      textSize(25);
      textAlign(CENTER, CENTER);
      text(title, width/2, this.pad/3);
  }
  // End of my original work
}
