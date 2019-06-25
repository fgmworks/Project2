Plotly.d3.csv('data.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allYears = unpack(rows, 'year'),
        allTobaccoTypes = unpack(rows, 'topicdesc'),
        allTotalUsers = unpack(rows, 'TotalUsers'),
        allTotalSize = unpack(rows, 'TotalSize'),
        allPercent = unpack(rows, 'PercentUsers'),
        allEveryday = unpack(rows, 'Every Day'),
        allSomeday = unpack(rows, 'Some Days'),
        listofYears = [],
        currentTotalUsers = [],
        currentTotalSize = [],
        currentPercent = [],
        currentType = [];

    for (var i = 0; i < allYears.length; i++ ){
        if (listofYears.indexOf(allYears[i]) === -1 ){
            listofYears.push(allYears[i]);
        }
    }

    function getYearData(chosenYear) {
        currentTotalUsers = [];
        currentTotalSize = [];
        currentType = [];
        currentPercent = [];
        currentEveryday = [];
        currentSomeday = [];
        // currentAges = [],
        // currentAgePercent = [];
        // currentTotalAgeUsers = [];
        // currentTotalAgeSize = [];
        for (var i = 0 ; i < allYears.length ; i++){
            if ( allYears[i] === chosenYear ) {
                currentTotalUsers.push(allTotalUsers[i]);
                currentType.push(allTobaccoTypes[i]);
                currentTotalSize.push(allTotalSize[i]);
                currentPercent.push(allPercent[i]);
                currentEveryday.push(allEveryday[i]);
                currentSomeday.push(allSomeday[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('2011');

    function setBubblePlot(chosenYear) {
        getYearData(chosenYear);
// Eli's data viz rendering script
// Trace 1 is grabbing Types placing on Y axis with PercentUsers as value
var trace1 = {
    x: currentPercent,
    y: currentType,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'bar',
    marker: {
      color: 'rgba(50,171,96,0.6)',
      line: {
        color: 'rgba(50,171,96,1.0)',
        width: 1
      }
    },
    name: 'Tobacco % Usage by Type',
    orientation: 'h'
  };
//   Trace 2 is basically grabbing Types placing it on Y axis, with TotalUsers as value
  var trace2 = {
    x: currentTotalUsers,
    y: currentType,
    xaxis: 'x2',
    yaxis: 'y1',
    mode: 'lines+markers',
    line: {
      color: 'rgb(128,0,128)'
    },
    name: 'Total # of Sampled Users by Type'
  };
  
  var data = [trace1, trace2];
  
  var layout = {
    title: 'Tobacco % Use by Type & Total # of Sampled Users by Type',
    xaxis1: {
      range: [0, 30,],
      domain: [0, 0.5],
      zeroline: false,
      showline: false,
      showticklabels: true,
      showgrid: true
    },
    xaxis2: {
      range: [0, 120000],
      domain: [0.5, 1],
      zeroline: false,
      showline: false,
      showticklabels: true,
      showgrid: true,
      side: 'top',
      dtick: 10000
    },
    legend: {
      x: 0.309,
      y: 1.598,
      font: {
        size: 10
      }
    },
    margin: {
      l: 200,
      r: 20,
      t: 200,b: 70
    },
    height: 400,
    paper_bgcolor: 'rgb(248,248,255)',
    plot_bgcolor: 'rgb(248,248,255)',
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: 0.2,
        y: -0.409,
        text: 'CDC Behavioral Risk Factor Data: Tobbaco Use ' + '(2011-2017), Tobacco Use by Type, ' + 'Tobacco Total Users by Type' + '(Accessed on 19 June 2019)',
        showarrow: false,
        font:{
          family: 'Arial',
          size: 10,
          color: 'rgb(150,150,150)'
        }
      }
    ]
  };
  
  for ( var i = 0 ; i < allPercent.length ; i++ ) {
    var result = {
      xref: 'x1',
      yref: 'y1',
      x: currentPercent[i],
      y: currentType[i],
      text: currentPercent[i] + '%',
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(50, 171, 96)'
      },
       showarrow: false
    };
    var result2 = {
      xref: 'x2',
      yref: 'y1',
      x: currentTotalUsers[i],
      y: currentType[i],
      text: currentTotalUsers[i],
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(128, 0, 128)'
      },
       showarrow: false
    };
    
    layout.annotations.push(result, result2);
  }
  
  Plotly.newPlot('eliDiv', data, layout);
// Forest's Viz
var trace1 = {
    x: currentType,
    y: currentEveryday,
    name: 'Every Day',
    type: 'bar'
}
var trace2 = {
    x: currentType,
    y: currentSomeday,
    name: 'Some Days',
    type: 'bar'
};

var data = [trace1, trace2];

var layout = {
    title:'Total # Users by Frequency of Use',
    barmode: 'stack',
    height: 400,
    width: 480
};

Plotly.newPlot('plotdiv', data, layout);
    }

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        yearSelector = innerContainer.querySelector('.yeardata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofYears, yearSelector);

    function updateYear(){
        setBubblePlot(yearSelector.value);
    }

    yearSelector.addEventListener('change', updateYear, false);
});