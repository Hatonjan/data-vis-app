
// const backgroundColor = 34;
const backgroundColor = 15;
let gallery;
let goldman;

function preload() {
  goldman = loadFont('./assets/fonts/Goldman/Goldman-Regular.ttf');
}

function setup() {
  // Create a canvas to fill the content div from index.html.
  const c = createCanvas(1024, 576);
  c.parent('map');

  // Create a new gallery object.
  gallery = new Gallery(); 

  // Add the visualization objects here.
  gallery.addVisual(new PopulationDensityUS());
  gallery.addVisual(new EatingBehavior());
  gallery.addVisual(new AlcoholConsumptionByRace());
  gallery.addVisual(new CarPriceByFuelConsumption());
  gallery.addVisual(new EuropeDiversityGender());
  gallery.addVisual(new NutrientsTimeSeries());
  gallery.addVisual(new ClimateChange());
  
  // Set PopulationDensityUS as the default visualization
  gallery.selectVisual('mapVis');
  
}

function draw() {
  background(backgroundColor);
  gallery.selectedVisual.draw();
}
