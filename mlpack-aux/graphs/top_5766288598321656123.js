
$(document).ready(function() {
  var options = {
    chart: {
        renderTo: '5766288598321656123',
        type: 'area'
    },
    title: {
        text: 'Overall Timing'
    },
    subtitle: {
        text: 'Hide data series by clicking the legend item.'
    },
    xAxis: {
        labels:
        {
          enabled: true,
          rotation: 0
        },
        categories: []
    },
    yAxis: {
        title: {
            text: 'Time [s]'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.4f} s</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        series: {
            cursor: 'pointer'
        }
    },

    series: []
  };

  $.get('graphs/top_5766288598321656123.csv', function(data) {
    var lines = data.split('\n');
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if (lineNo == 0) {
          $.each(items, function(itemNo, item) {
            if (itemNo > 0) options.xAxis.categories.push(item);
          });
        }
        else {
          var series = {
            data: []
          };
          $.each(items, function(itemNo, item) {
            if (itemNo == 0) {
              series.name = item;
            } else {
              series.data.push(parseFloat(item));
            }
          });
          options.series.push(series);
        }
    });
    var chart = new Highcharts.Chart(options);
  });
});
