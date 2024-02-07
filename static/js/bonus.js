function createGauge(sample) {
    d3.json(url).then(function(data) {
        let metadata = data.metadata;
        let result = metadata.filter(i=>i.id==sample)[0];
        //return wfreq to number only
        let wfreq = parseFloat(result.wfreq);
        let gaugeData = [{
            domain: {x:[0,1],y:[0,1]},
            value: wfreq,
            title: {text: "Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,9],tickwidth:1},
                steps:[
                    {range:[0,1],color:"Azure"},
                    {range:[1,2],color:"AliceBlue"},
                    {range:[2,3],color:"LightYellow"},
                    {range:[3,4],color:"Khaki"},
                    {range:[4,5],color:"GreenYellow"},
                    {range:[5,6],color:"LightGreen"},
                    {range:[6,7],color:"MediumSpringGreen"},
                    {range:[7,8],color:"MediumSeaGreen"},
                    {range:[8,9],color:"Green"}
                ],
            }
        }];

        let gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

        Plotly.newPlot('gauge',gaugeData,gaugeLayout)
    });
};