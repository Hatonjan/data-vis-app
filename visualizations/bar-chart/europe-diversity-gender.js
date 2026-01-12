/* This code is part of the data-viz template file with some 
modification to adjust the visual appearance of the visualization */

function EuropeDiversityGender() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'European Union Diversity: Gender';

  // Each visualization must have a unique ID with no special
  // characters.
  this.id = 'europe-diversity-gender';   

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    rightMargin: width - 130,
    bottomMargin: height,
    leftMargin: 130,
    topMargin: 80,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Middle of the plot: for 50% line.
  this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

  // Default visualization colors.
  this.femaleColor = color(30,144,255);
  this.maleColor = color(25, 64, 123);

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
    const self = this;
    this.data = loadTable(
      './data/european-union-diversity/gender-2014.csv', 
      'csv', 
      'header',
      
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
    // Font defaults.
    textSize(16);
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw Female/Male labels at the top of the plot.
    this.drawCategoryLabels();

    const lineHeight = (height - this.layout.topMargin) /
                      this.data.getRowCount();

    // Loop over every row in the data.
    for (let i = 0; i < this.data.getRowCount(); i++) {

      // Calculate the y position for each company.
      let lineY = (lineHeight * i) + this.layout.topMargin;

      // Create an object that stores data from the current row.
      const country = {
        // Convert strings to numbers.
        'name'  : this.data.getString(i, 'Country Name'),
        'male'  : this.data.getNum(i, 'Male'), 
        'female': this.data.getNum(i, 'Female')
      };

      // Draw the company name in the left margin.
      fill(200);
      noStroke();
      textAlign('right', 'top');
      text(country.name,
           this.layout.leftMargin - this.layout.pad,
           lineY);

      // Draw female employees rectangle.
      fill(this.maleColor);
      rect(this.layout.leftMargin,
           lineY,
           this.mapPercentToWidth(country.male),
           lineHeight - this.layout.pad);

      // Draw male employees rectangle.
      fill(this.femaleColor);
      rect(this.layout.rightMargin,
           lineY,
           this.mapPercentToWidth(-country.female),
           lineHeight - this.layout.pad);  
    }

    // Draw 50% line
    stroke(155,226,255);
    strokeWeight(1);
    line(this.midX,
         this.layout.topMargin,
         this.midX,
         this.layout.bottomMargin);

    // Draw the title
    this.drawTitle();  

  };

  this.drawCategoryLabels = function() {
    fill(200);
    noStroke();
    textAlign('left', 'bottom');
    text('Male ',
         this.layout.leftMargin,
         this.layout.topMargin);
    textAlign('center', 'bottom');
    text('50%',
         this.midX,
         this.layout.topMargin);
    textAlign('right', 'bottom');
    text('Female',
         this.layout.rightMargin,
         this.layout.topMargin);
  };

  this.mapPercentToWidth = function(percent) {
    return map(percent,
               0,
               100,
               0,
               this.layout.plotWidth());
  };

  /* The code below is my original work and not 
      part of code from the data-viz template */ 
  this.drawTitle = function() {
    const title = 'European Union Labor Diversity: Gender';
    
    push();
    fill(245)
    noStroke();
    textSize(25);
    textAlign(CENTER, CENTER);
    text(title, width/2, this.layout.topMargin/2);
    pop();
  };
  // End of my original work
}
