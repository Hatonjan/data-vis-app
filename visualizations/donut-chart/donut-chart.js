/* This code is part of the data-viz template file with some 
modification to adjust the visual appearance of the visualization */
function DonutChart(x, y, diameter) {
  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.labelSpace = 30;

  this.getRadians = function(data) {
    let total = sum(data);
    let radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function(data, labels, colors, title) {
    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colors].every((array) => {
      return array.length == data.length;
    })) {
      alert (
        `Data (length: ${data.length})
        Labels (length: ${labels.length})
        colors (length: ${colors.length})
        Arrays must be the same length!`
      );
    }

    // https://p5js.org/examples/form-pie-chart.html

    let angles = this.getRadians(data);
    let lastAngle = 0;
    let color;

    for (let i = 0; i < data.length; i++) {
      if (colors) {
        color = colors[i];
      } else {
        color = map(i, 0, data.length, 0, 255);
      }

      fill(color);
      stroke('245');
      strokeWeight(0.2);
      arc(this.x, this.y,
          this.diameter, this.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!
        
      if (labels) {
        this.makeLegendItem(labels[i], i, color, angles[i]);
      }

      lastAngle += angles[i];

      // console.log(lastAngle)
    }

    if (title) {
      noStroke();
      textSize(25);
      textAlign('center', 'center');
      text(title, this.x, this.y - this.diameter * 0.6);
    }
  };

  this.makeLegendItem = function(label, i, color, angles) {
    const y = this.y + (this.labelSpace * i) - this.diameter / 3;
    const x = this.x + 50 + this.diameter / 2;
    const boxHeight = this.labelSpace / 1.5;
    const boxWidth = this.labelSpace / 1.5;

    fill(color);
    rect(x, y + boxHeight*4, boxWidth, boxHeight,4);

    noStroke();
    fill('220');
    textSize(25);
    textAlign('left', 'center');
    text(label, x + boxWidth + 10, y + boxHeight*4.5 );

    /* The code below is my original work and not 
       part of code from the data-viz template */   
    // Display the Percentage per label 
    const percentage = (angles * 100 / TWO_PI).toFixed(2) + '%'
    text(percentage, x + boxWidth*7, y + boxHeight*4.5);
    // End of my work original work
  };
}
