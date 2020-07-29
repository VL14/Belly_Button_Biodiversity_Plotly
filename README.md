## Belly Button Biodiversity Interactive Dashboard
Interactive dashboard using the Belly Button biodiversity dataset (http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that can be found in human belly buttons.

The dataset reveals that a small handful of microbial species (also called Operational Taxonomic Units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

# Dashboard Summary

Using the JSON file provided, Javascript, D3, and Plotly, the following were created:

1. A dropdown menu with a list of test subject ID numbers to choose from. These numbers were populated from the JSON file using D3 and Javascript.

2. A horizontal bar chart to display the top 10 OTUs found in the chosen individual.

3. A bubble chart that displays the OTUs for each individual. Bubble sizes are linked to counts, while bubble colors are linked to OTU IDs.

4. A table with the individual's demographic information.

The charts and table are updated each time a new ID is selected from the dropdown menu.

# Link To Dashboard

Direct link to Github site: https://vl14.github.io/biodiversity/
