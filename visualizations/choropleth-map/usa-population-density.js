/*
The code for the constructor function Map() was written by following the Interactive Choropleth Map tutorial 
from the leaflet website "https://leafletjs.com/examples/choropleth/" and analyzing the source code for the 
leaflet map example "https://leafletjs.com/examples/choropleth/example.html". I also add the necessary 
CSS code following the leaflet instructions to display the legend and the information window. 
The code was then adapted into a constructor function by me to display the data in the data visualization 
window of the web application.     
*/

function PopulationDensityUS() {
      // Name for the visualization to appear in the menu bar.
    this.name = 'USA Population Density';

    // Each visualization must have a unique ID with no special
    // characters.
    this.id = 'mapVis'; 

    // Variables
    let map;
    let geoJson;
    let title = L.control()
    let info = L.control({ // Layer control
        position: 'bottomright'
    });    
    let legend = L.control({ // set the position of the legend
        position: 'bottomleft'
    }); 
    
    this.setup = function() {
        // Set the coordinates for the map view
        map = L.map('map').setView([37.8, -96], 4);

        /* The attribution variable is required by the OpenStreetMap Foundation 
        when using the Leaflet library. However, the absence of the information 
        contained in the URL does not affect the application's performance, 
        which is why the documentation is not included as a local file */  
        let attribution = 
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

        // API for the tiles to display the data in a world map   
        let tiles = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

        /* Replace the tiles wit a image mimicking the ocean to comply wit the 
        project external resources rule */
        // let tiles = './lib/leaflet/images/sea0.png'; 
        let maxZoom = 19;

        // Initiate the map tiles and set up the zoom level
        L.tileLayer(tiles, maxZoom, attribution).addTo(map);

        // Loads the data
        geoJson = L.geoJson(statesData).addTo(map);
    };

    this.destroy = function() {
        /* Stops the draw loop and removes any HTML elements 
        created by the sketch, including the canvas. */
        map.remove();
    };
    
    getColor = function(d) {
        // Color pallet 
        return  d > 1000 ?  '#C71585': 
                d > 500  ?  '#800080':      
                d > 200  ?  '#8A2BE2':  
                d > 100  ?  '#0000FF':
                d > 50   ?  '#4169E1':
                d > 20   ?  '#1E90FF':
                d > 10   ?  '#00BFFF':
                            '#87CEFA'
    };
    
    style = function(feature) {
        // Style the states border line
        return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: '#000000',
            dashArray: '2',
            fillOpacity: 0.7
        }; 
    };

    this.draw = function() {
        noLoop();

        // Displays the map with the style and hover effect
        geojson = L.geoJson(statesData, {
            style: style, 
            onEachFeature: 
            onEachFeature
        }).addTo(map);
        
        // Add the title to the visualization
        title.addTo(map);

        // Add the information window
        info.addTo(map);

        // Add the legend to the window
        legend.addTo(map);
    };

    highlightFeature = function(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#F5F5F5',
            dashArray: '',
            fillOpacity: 0.7
        });

        // Display the new state line over the state line style
        layer.bringToFront();

        // Update the information displayed on the information window
        info.update(layer.feature.properties);
    };

    // Reset the state line to the original state line style
    resetHighlight = function(e) {
        geojson.resetStyle(e.target);
        info.update();
    };

    // Zoom wen an specific state is clicked
    zoomToFeature = function(e) {
        map.fitBounds(e.target.getBounds());
    };

    onEachFeature = function(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature // Zoom to the selected state
        });
    };

    info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend'); // create a div with a class "info"
    this.update(); 
    return this._div;
    };  

    // Method  to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML =(props ?
            '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
    };   
    
    
    /* The code below is my original work and not part of code leaflet tutorial*/ 
    // Add the title to the visualization
    title.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'title'); // create a div with a class "title"
        this._div.innerHTML = '<h4>USA Population Density</h4>';
    return this._div;
    /* End of my original work */
        
    };   

    legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };    
}