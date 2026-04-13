function NutrientsTimeSeries() {
  // Name for the visualization to appear in the menu bar.
  this.name = 'Nutrients: 1974-2016';

  // Each visualization must have a unique ID with no special
  // characters.
  this.id = 'nutrients-1974-2016';

  // Title to display above the plot.
  this.title = 'Comparison Of The Consumption Of Nutrients In The UK 1974 - 2016';

    // Names for each axis.f
  this.xAxisLabel = 'year';
  this.yAxisLabel = '%';
  this.colors = [
    '#C71585',
    '#800080',
    '#8A2BE2',
    '#0000FF',
    '#4169E1',
    '#1E90FF',
    '#00BFFF',
    '#87CEFA',
    '#C9C9F0'
  ];

  const marginSize = 35;

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Margin positions around the plot. Left and bottom have double
    // margin size to make space for axis and tick labels on the canvas.
    bottomMargin: height - marginSize * 2,
    rightMargin: width - marginSize,
    leftMargin: marginSize * 2,
    topMargin: marginSize*2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualization is added.
  this.preload = function() {
    const self = this;
    this.data = loadTable(
      './data/food-consumption-data/nutrients-1974-2016.csv', 
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

    // Set min and max years: assumes data is sorted by date.
    this.startYear = Number(this.data.columns[1]);
    this.endYear = Number(this.data.columns[this.data.columns.length - 1]);

    // Find min and max pay gap for mapping to canvas height.
    this.minPercentage = 90;         // Pay equality (zero pay gap).
    this.maxPercentage = 340;
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    };

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minPercentage,
                        this.maxPercentage,
                        this.layout,
                        this.mapPayGapToHeight.bind(this),
                        0);

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    push();
    textSize(22)
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);
    pop();

    // Plot all pay gaps between startYear and endYear using the width
    // of the canvas minus margins.
    const numYears = this.endYear - this.startYear;

    // Loop over all rows and draw a line from the previous value to
    // the current.
    for (let i = 0; i < this.data.getRowCount(); i++) {
      let row = this.data.getRow(i);
      let previous = null;
      
      for(let j = 1; j < numYears; j++) {
        // Create an object to store data for the current year.
        let current = {
        // Convert strings to numbers.
        'year': this.startYear + j - 1,
        'percentage': row.getNum(j) 
        };

          if (previous != null) {
          // Draw line segment connecting previous year 
          // to current year pay gap.
          push();
          strokeWeight(3);
          stroke(this.colors[i]);
          line(
            this.mapYearToWidth(previous.year), 
            this.mapPayGapToHeight(previous.percentage),
            this.mapYearToWidth(current.year), 
            this.mapPayGapToHeight(current.percentage)
          );
          pop();

          // The number of x-axis labels to skip so that only
          // numXTickLabels are drawn.
          const xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

          // Draw the tick label marking the start of the previous year.
          if (j % xLabelSkip == 0) {
            drawXAxisTickLabel(previous.year, this.layout,
                              this.mapYearToWidth.bind(this));
          }
        } 
        
        // Display the legend 
        this.dataLegend();

        // Assign current year to previous year so that it is available
        // during the next iteration of this loop to give us the start
        // position of the next line segment.
        previous = current;
      }
    }
  }; // End of the draw function

  this.drawTitle = function() {
    push();
    fill(245);
    noStroke();
    textSize(25);
    textAlign('center', 'center');
    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin/2);
    pop();
  };

  this.mapYearToWidth = function(value) { // Draw left-to-right from margin.
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   
               this.layout.rightMargin);
  };

  this.mapPayGapToHeight = function(value) { // Draw bottom-to-top from margin.
       return map(value,
               this.minPercentage,
               this.maxPercentage,
               this.layout.bottomMargin,   
               this.layout.topMargin);
  };

  /* The code below is my original work and not 
       part of code from the data-viz template */
  this.dataLegend = function() {
    // Draws the rectangle for the legend
    const legendX = width / 1.7;
    const legendY = marginSize * 2;
    const legendSize = marginSize * 8;

    // Draw the legend box
    fill(34, 34, 60);
    rect(legendX+20, legendY, legendSize, legendSize / 1.5, 5);

    // Iterates trough the data to get the nutrient values
    for(let i = 0; i < this.data.getRowCount(); i ++) {
      const legend = this.data.getRow(i).getString(0); 
      const boxSize = 15;

      // Draw the list of the nutrient values 
      fill(245);
      textSize(15);
      textFont(goldman);
      textAlign(LEFT, TOP);
      text(legend, legendX + marginSize * 2, (legendY + 5) + i * 20);

      // Draw the different color boxes 
      fill(this.colors[i])
      rect(legendX + marginSize, (legendY + 5) + i * 20, boxSize, boxSize, 2);
    }
  };
  // End of my original work
}
