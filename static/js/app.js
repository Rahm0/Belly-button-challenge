// Dashboard.

function dashboard() {

// Creating a constant path for the URL connected with the assignemnt data.

  const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then((data) => {
  console.log(data);

// Define dropdown Menu Elements.
  
  var dropdown = d3.select("#selDataset");
  
// Define a variables. 
 
  var data_sample = data.names;
  
// Get data samples and add to the dropdown menu.

  data_sample.forEach((sample) => {
    dropdown
      .append("option")
      .text(sample)
      .property("value", sample);
  });

// Metadata and chart. 

   metadata(data_sample [0]);
   charts(data_sample [0]);
 });
}

// Create,collect, loop and display the metadata.

function metadata(x) {
  d3.json("samples.json").then((data) => {

    var metadata = data.metadata; 
    var metadata_object = metadata.filter(meta_object => meta_object.id == x)[0];
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(metadata_object).forEach(([key, value]) => {
      sample_metadata.append("p").text(`${key}: ${value}`);
    });
  });
}

// Create bar and bubble Charts.

function charts(x) {

    d3.json("samples.json").then((data) => {
  
//  Get data and filter.

      var samples = data.samples;
      var sample_object = samples.filter(object => object.id == x)[0];
  
// Define variables.

      var ids = sample_object.otu_ids;
      var labels = sample_object.otu_labels;
      var sample_values = sample_object.sample_values;
  
// Top ten OTUs. 

      var ids_topten = ids.slice(0, 10).reverse().map(otuID => `OTU ${otuID}`);
      var labels_topten = labels.slice(0, 10).reverse();
      var sample_values_topten = sample_values.slice(0, 10).reverse();
  

  
// Create bar chart.

      var trace1 =[
        {
          x: sample_values_topten,
          y: ids_topten,
          text: labels_topten,
          type: "bar",
          marker: {
            color: "Blues"
        },
          orientation: "h"
        }
      ];
  
      var layout = {
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
      };
  
// Create bar plot.

      Plotly.newPlot("bar", trace1, layout);

  
  
// Create bubble chart.
  
      var trace2 = [ 
        {
          x: ids,
          y: sample_values,
          text: labels,
          mode: "markers",
          marker: {
            color: ids,
            colorscale: "Jet",
            size: sample_values,
            }
        }
      ];
  
      var layout = {
        xaxis: { title: "OTU ID" },
      };
  
// Create bubble chart.

      Plotly.newPlot("bubble", trace2, layout);
  
  });
  }
   
   
// Make changes to dropdown menu selection.

  function optionChanged(new_selection) {
  
// Display new data for each new selection.

    charts(new_selection);
    metadata(new_selection);
  };
    
// Dashboard.

  dashboard();