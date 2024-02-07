let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    //assign dropdownMenu for id of selDataset
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then(function(data) {
        //console log the current data
        console.log(data);

        let names = data.names;

        for (let i = 0; i < names.length; i++) {
            dropdownMenu
                .append("option")
                .property("value",`${names[i]}`)
                .text(`${names[i]}`)
        };
        let sample1 = names[0];

        createMetaData(sample1);
        createCharts(sample1);
        createGauge(sample1)
    });
};

//call out the initial function
init()

//define optionChanged under selDataset in html
function optionChanged(newsample) {
    createMetaData(newsample);
    createCharts(newsample);
    createGauge(newsample)
};

//Create Demographic info
function createMetaData(sample) {
    d3.json(url).then(function(data) {
        let metadata = data.metadata;
        let result = metadata.filter(i=>i.id==sample)[0];
        //test result
        console.log(result);

        let htmlMetaData = d3.select("#sample-metadata");

        //clean previous data when new sample data is inputted
        htmlMetaData.html("");

        //convert dictionary to [key, value] and append data to panelBody
        for (let [key, value] of Object.entries(result)) {
            //console.log(`Key: ${key}, Value: ${value}`)
            htmlMetaData.append("h6").text(`${key}: ${value}`);
        };
    });
};

//create bar and bubble charts
function createCharts(sample) {
    d3.json(url).then(function(data) {
        let samples = data.samples;

        let result = samples.filter(i=>i.id==sample)[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //assign x and y data for chart later
        let xData = sample_values.slice(0,10);
        let yData = otu_ids.slice(0,10).map(item => `OTU ${item}`);

        //define bar chart data
        let barData = [{
            x: xData.reverse(),
            y: yData.reverse(),
            text: otu_labels,
            type: 'bar',
            orientation: 'h'
        }];

        //define bar chart layout
        let barLayout = {
            title: "Top 10 OTU",
        };
        //create bar chart
        Plotly.newPlot("bar",barData, barLayout);

        //define bubble chart data
        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }];

        //define bubble layout
        let bubbleLayout = {
            title: "OTU Bubbles Visualization",
            
        };

        //plot bubble chart
        Plotly.newPlot("bubble",bubbleData, bubbleLayout);
    });
};