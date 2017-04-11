// Wait for DOM to finish loading

$(function() {

    // read the data from the provided file
    Plotly.d3.csv('./data/antibiotics-data.csv', function(err, rows){

        // unpack the csv file into the two provided columnts
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        // variables for the data
        var bacteria = unpack(rows, 'Bacteria'),
            penicilin = unpack(rows, 'Penicilin'),
            streptomycin = unpack(rows, 'Streptomycin'),
            neomycin = unpack(rows, 'Neomycin'),
            gram_staining = unpack(rows, 'Gram.Staining'),
            MIC_TO_PX_SIZE = 1000;

        
        // initialize the data
        var bar_trace1 = {
            x: bacteria,
            y: penicilin,
            name: 'Penicilin',
            type: 'bar'
        };

        var bar_trace2 = {
            x: bacteria,
            y: streptomycin,
            name: 'Streptomycin',
            type: 'bar'
        };

        var bar_trace3 = {
            x: bacteria,
            y: neomycin,
            name: 'Neomycin',
            type: 'bar'
        };

        var bar_trace4 = {
            x: bacteria,
            y: gram_staining,
            name: 'Gram Staining',
            type: 'bar'
        }

        var bar_data = [bar_trace1, bar_trace2, bar_trace3];

        var bar_layout = {
            barmode: 'group',
            margin: {
                b:120
            },
            yaxis: {
                type: 'log',
                autorange: true
            },
            title: 'Bar Chart of the MIC of Penicilin, Streptomycin, and Neomycin',
        };

        Plotly.newPlot('plot1', bar_data, bar_layout, {staticPlot: true});






        var a = []

        for (var i = 0; i < bacteria.length; i++) {
            var curr = [];
            curr.push(penicilin[i]);
            curr.push(streptomycin[i]);
            curr.push(neomycin[i]);
            curr.push(gram_staining[i]);
            curr.push(bacteria[i]);
            a.push(curr);
        };


        a.sort(function(a,b) {
            return a[0]-b[0]
        });

        var sorted_pen = [];
        var sorted_strep = [];
        var sorted_neo = [];
        var sorted_gram = [];
        var sorted_bac = [];
        for (var i = 0; i < a.length; i++) {
            sorted_pen.push(a[i][0]);
            sorted_strep.push(a[i][1]);
            sorted_neo.push(a[i][2]);
            sorted_gram.push(a[i][3]);
            sorted_bac.push(a[i][4]);
        };

        var line_trace1 = {
            x: sorted_bac,
            y: sorted_pen,
            name: 'Penicilin',
            type: 'scatter'
        };

        var line_trace2 = {
            x: sorted_bac,
            y: sorted_strep,
            name: 'Streptomycin',
            type: 'scatter'
        };

        var line_trace3 = {
            x: sorted_bac,
            y: sorted_neo,
            name: 'Neomycin',
            type: 'scatter',
        };

        var line_data = [line_trace1, line_trace2, line_trace3];

        var line_layout = {
            margin: {
                b:120
            },
            yaxis: {
                type: 'log',
                autorange: true
            },
            title: 'Line Graph of the MIC of Penicilin, Streptomycin, and Neomycin',
        };


        Plotly.newPlot('plot2', line_data, line_layout, {staticPlot: true});




        

        var box_trace1 = {
          y: penicilin,
          name: 'Penicilin',
          type: 'box'
        };

        var box_trace2 = {
          y: streptomycin,
          name: 'Streptomycin',
          type: 'box'
        };

        var box_trace3 = {
            y: neomycin,
            name: 'Neomycin',
            type: 'box'
        }

        var box_layout = {
            yaxis: {
                type: 'log'
            },
            height: 700,
            title: 'Boxplot of the MIC of Penicilin, Streptomycin, and Neomycin',
        }

        var box_data = [box_trace1, box_trace2, box_trace3];

        Plotly.newPlot('plot3', box_data, box_layout, {staticPlot: true});






        var stain_color = []
        for (var i = 0; i < bacteria.length; i++) {
            if (gram_staining[i] == 'negative') {
                stain_color.push('red');
            } else {
                stain_color.push('green');
            }
        };

        var scatter_trace1 = {
            x: penicilin,
            y: neomycin,
            name: bacteria,
            text: bacteria,
            type: 'scatter',
            mode: 'markers',
            marker: {
                sizemode: 'area',
                size: streptomycin,
                sizeref: .005,
                color: stain_color
            }
        };


        var scatter_data = [scatter_trace1];

        var scatter_layout = {
            xaxis: {
                title: 'Penicilin', 
                type: 'log'
            },
            yaxis: {
                title: 'Neomycin',
                type: 'log'
            },
            title: 'Triple Scatterplot of the MIC of Penicilin, Neomycin, and Streptomycin',
        }

        Plotly.plot('plot4', scatter_data, scatter_layout, {staticPlot: true});

    });

});

