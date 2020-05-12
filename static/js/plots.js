// Pull values from data file for default chart
d3.json("/samples.json").then(function(data) {
  var values = data.samples[0].sample_values;
  var labels = data.samples[0].otu_ids;
  var hovertext = data.samples[0].otu_labels;
  //console.log(`Sample values: ${values}`);
  //console.log(`OTU IDs: ${labels}`);
  //console.log(`OTU labels: ${hovertext}`);

  // Slice values to get first 10 for chart
  var x = values.slice(0,10);
  var y = labels.slice(0,10);
  var t = hovertext.slice(0,10);
  console.log(x);
  
  // Create default bar chart
  var trace1 = {
    x: x,
    y: y,
    text: t,
    name: "Bar Chart",
    type: "bar"
  };

  var layout = {
    title: "Bar Chart",
    xaxis: {
      showgrid: true
    },
    plot_bgcolor: "#c7c7c7"
  };

  // Clear any existing data
  d3.select("#bar").node().value = "";
  
  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", trace1, layout);

});


//init();

// Dropdown Code
d3.selectAll("#selDataset").on("change", changeData);

// Function called by DOM changes
function changeData() {
  // Select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Get the value of the dropdown menu
  var selection = dropdownMenu.property("value");

  // Get values for dropdown menu
  d3.json("samples.json").then(function(data) {
    var selections = data.names;
    console.log(`Dropdown selections: ${selections}`);
  
  // Set dropdown values to html
  selections.forEach((sample) => {
    dropdownMenu.append(sample).text(sample).property("value",sample);
  })
});
}