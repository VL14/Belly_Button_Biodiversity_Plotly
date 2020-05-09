// Show default bar chart
// Pull data from json file via Flask website
function init() {
  d3.json("/samples.json").then(function(data) {
    var values = data.samples[0].sample_values;
    var labels = data.samples[0].otu_ids;
    var hovertext = data.samples[0].otu_labels;
  

  var trace1 = {
      x: values[0][0],
      y: labels[0][0],
      text: hovertext[0][0],
      name: "Bar Chart",
      type: "bar"
    };

  var layout = {
    title: "Bar Chart"
    };

  console.log(values);

  // Render the plot to the div tag with id "barchart"
  Plotly.newPlot("bar", trace1, layout);
  });
}

init();

// Dropdown Code
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", changeData);

// Function called by DOM changes
function changeData() {
  // Select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Prevent the page from refreshing
  //d3.event.preventDefault();

  // Get the value of the dropdown menu
  var selection = dropdownMenu.property("value");

  // Get values for dropdown menu
  d3.json("samples.json").then(function(data) {
    var selections = data.names;
    console.log(selections);
  

  // Set dropdown values to html
  selections.forEach((sample) => {
    dropdownMenu.append(sample).text(sample).property("value",sample);
  })
});
}

changeData();

  // Set new bar chart values

  // Set new Sample Data values

  // Call function to update the chart
  //updatePlotly(data);


// Update the restyled plot's values
//function updatePlotly(newdata) {
//  Plotly.restyle("barchart", "values", "labels", "text", //[newdata]);
//}