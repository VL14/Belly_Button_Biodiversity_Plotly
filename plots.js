// Pull data from json file via Flask website
var url = "/samples/<sample>";
d3.json(url).then(function(data) {
    var values = data.sample_values.slice(0,10);
    var labels = data.otu_ids.slice(0, 10);
    var hovertext = data.otu_labels.slice(0, 10);

    console.log("Values: ",values);
});

// Show default bar chart
function init() {
  var trace1 = {
      x: labels,
      y: values,
      text: hovertext,
      name: "Bar Chart",
      type: "bar"
    };

  // Render the plot to the div tag with id "barchart"
  Plotly.newPlot("barchart", trace1);
}

// Dropdown Code
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];

  if (dataset == 'us') {
      data = us;
  }
  else if (dataset == 'uk') {
      data = uk;
  }
  else if (dataset == 'canada') {
      data = canada;
  }
  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();