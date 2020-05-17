// FUNCTION TO CREATE CHARTS
function makeCharts(index) {
  d3.json("samples.json").then(function(data) {
    let sample_values = data.samples[index].sample_values;
    let otu_ids_raw = data.samples[index].otu_ids;
    let otu_labels = data.samples[index].otu_labels;

    // BAR CHART
    // Set prefix for otu_id values
    var otu_ids = otu_ids_raw.map(id => 'OTU ' + id);

    // Slice values to get first 10 for chart
    var x = sample_values.slice(0,10);
    var y = otu_ids.slice(0,10);
    var t = otu_labels.slice(0,10);
    
    // Create default bar chart
    var trace1 = [{
      x: x,
      y: y,
      text: t,
      type: "bar",
      orientation: "h"
    }];

    var layout = {
      title: "Bar Chart",
      height: "400px",
      width: "200px",
      xaxis: {
        showgrid: true
      },
      plot_bgcolor: "#fafafa"
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", trace1, layout);

    // BUBBLE CHART SETUP
    var trace2 = [{
      x: otu_ids_raw,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: sample_values
      }
    }];

    var layout = {
      title: 'Bubble Chart',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', trace2, layout);

    // DEMOGRAPHICS TABLE SETUP
    var meta_table = d3.select("#sample-metadata");

    // Clear existing data
    meta_table.html("");

    // Pull data from JSON
    let metadata1 = data.metadata[index];
    console.log(metadata1);

    // Loop through metadata array and print key/index values to html
    Object.entries(metadata1).forEach(([key, value]) => 
      meta_table.append("h6").text(`${key}: ${value}`));

    // Prevent the page from refreshing
    // d3.event.preventDefault();
  });
}

// Call function to create default bar chart
let defaultIndex = 0;
makeCharts(defaultIndex);

// DROPDOWN MENU SETUP
// Select the dropdown menu
var dropdownMenu = d3.select("#selDataset");

 // Get values for dropdown menu
 d3.json("samples.json").then(function(data) {
  var selections = data.names;
  //console.log(`Dropdown selections: ${selections}`);

  // Set dropdown values to html
  selections.map((sample) => {
    var s = dropdownMenu.append("option");
    s.text(sample);
})
});

// CHART UPDATE CODE
function chartUpdate() {
  // Get the value of the dropdown menu
  var idSelection = dropdownMenu.property("value");
  console.log(idSelection);

  d3.json("samples.json").then(function(data) {
    var selections = data.names;

    // Create function to get key for selected value
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    var newIndex = getKeyByValue(selections, idSelection);
    
    console.log(newIndex);

    makeCharts(newIndex);
  });
}

// Set event listener for dropdown
d3.selectAll("#selDataset").on("change", chartUpdate);