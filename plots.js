var url = `/samples/${sample}`;
d3.json(url).then(function(data) {
    var values = data.sample_values.slice(0,10);
    var labels = data.otu_ids.slice(0, 10);
    var hovertext = data.otu_labels.slice(0, 10);

    console.log("Values: ",values);
});

// Trace1 for bar chart
var trace1 = {
    x: labels,
    y: values,
    text: hovertext,
    name: "Bar Chart",
    type: "bar"
  };

// Set trace for plot
var data = [trace1, trace2];

// Render the plot to the div tag with id "barchart"
Plotly.newPlot("barchart", data);
