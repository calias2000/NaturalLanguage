selectedFilters = []
firstTime = true

function scatteredDotChart(data) {
  var auxSactteredArray = [d3.select('#scatteredCorruption'), d3.select('#scatteredFreedom'), d3.select('#scatteredGDP'),
    d3.select('#scatteredHappiness'), d3.select('#scatteredHealthcare'),
    d3.select('#scatteredSafeness'), d3.select('#scatteredTemperature')]

  d3.select('#selectYAxis').on('change', function() {
    var value = d3.select(this).property('value')
    selectedFilters[0] = [value, filterScatteredPlot(data, value)]
    mergeScatteredData()
  })

  d3.select('#selectXAxis').on('change', function() {
    var value = d3.select(this).property('value')
    selectedFilters[1] = [value, filterScatteredPlot(data, value)]
    mergeScatteredData()
  })
}

function drawScatteredPlot(data) {

  var cfg = {
    height: 320,
    width: 690
  }

  var svg = d3.select('#vi3').attr('width', cfg.width + 'px').attr('height', cfg.height + 'px')

  var g = svg.append('g')

  var tooltip = d3.select('#scatteredDotChart').append("div").attr('id', 'scatteredToolTip').attr("class", "tooltip")

  var yAxisDomain = axisDomain(selectedFilters[0][0])
  var yAxisScale = d3.scaleLinear().domain([yAxisDomain[1], yAxisDomain[0]]).range([0, cfg.height - 35])
  var yAxis = d3.axisLeft(yAxisScale)
  g.append('g').attr('id', 'scatteredChartYAxis').attr("transform", 'translate(55,10)')
    .style('color', '#777778')
    .call(yAxis)

  var xAxisDomain = axisDomain(selectedFilters[1][0])
  var xAxisScale = d3.scaleLinear().domain([xAxisDomain[0], xAxisDomain[1]]).range([0, cfg.width - 80])
  var xAxis = d3.axisBottom(xAxisScale)

  g.append('g').attr('id', 'scatteredChartXAxis').attr("transform", 'translate(55,' + (cfg.height - 25) + ')')
    .style('color', '#777778')
    .call(xAxis)

  var color = d3.scaleSequential([0, d3.max(data, d => d.leftValue) * d3.max(data, d => d.bottomValue)], d3.interpolateHcl("#f0d318", '#821414'))

  g.selectAll('circle.scatteredChartCircle')
    .data(data)
    .join("circle")
    .attr('class', 'scatteredChartCircle')
    .attr('r', function(d) {
      if (d.country == filteredCountriesName.leftCountry || d.country == filteredCountriesName.rightCountry) {
        return '8'
      }
      return '5'
    })
    .attr('cx', d => xAxisScale(d.bottomValue))
    .attr('cy', d => yAxisScale(d.leftValue))
    .attr("fill", function(d) {
      if (d.country == filteredCountriesName.leftCountry) {
        return 'rgba(95, 51, 176, 0.7)'
      } else if (d.country == filteredCountriesName.rightCountry) {
        return 'rgba(50, 142, 199, 0.7)'
      }
      return color(d.leftValue * d.bottomValue)
    })
    .attr("transform", "translate(55,10)")
    .on('click', function(e, d) {
      d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('click')
    })
    .on('contextmenu', function(e, d) {
      e.preventDefault()
      d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('contextmenu')
    })
    .on("mouseover", function() {

      tooltip.style("opacity", 1)
      d3.select(this).style('stroke', 'white').style('stroke-width', '2px')

    }).on("mousemove", (e, d) => {

      tooltip
        .html('<p><b>' + d.country + '</b></p><p><b>x: </b>' + d.bottomValue + '</p><p><b>y: </b>' + d.leftValue + '</p>')
        .style("left", e.pageX + 10 + "px")
        .style("top", e.pageY - 50 + "px")

    }).on("mouseleave", function() {

      tooltip.style("opacity", 0)
      d3.select(this).style('stroke', '#c78348').style('stroke-width', '0.4px')

    })
    .style('stroke', '#c78348').style('stroke-width', '0.4px')
}

function updateScatteredPlot(data) {
  var cfg = {
    height: 320,
    width: 690
  }

  var g = d3.select('#vi3').select('g')

  var tooltip = d3.select('#scatteredToolTip')

  var yAxisDomain = axisDomain(selectedFilters[0][0])
  var yAxisScale = d3.scaleLinear().domain([yAxisDomain[1], yAxisDomain[0]]).range([0, cfg.height - 35])
  var yAxis = d3.axisLeft(yAxisScale)
  d3.select('#scatteredChartYAxis').transition().duration(1000).call(yAxis)

  var xAxisDomain = axisDomain(selectedFilters[1][0])
  var xAxisScale = d3.scaleLinear().domain([xAxisDomain[0], xAxisDomain[1]]).range([0, cfg.width - 80])
  var xAxis = d3.axisBottom(xAxisScale)
  d3.select('#scatteredChartXAxis').transition().duration(1000).call(xAxis)

  var color = d3.scaleSequential([0, d3.max(data, d => d.leftValue) * d3.max(data, d => d.bottomValue)], d3.interpolateHcl("#f0d318", '#821414'))

  g.selectAll('circle.scatteredChartCircle')
    .data(data)
    .join(
      enter => {
        enter.append('circle').attr('class', 'scatteredChartCircle')
        .on('click', function(e, d) {
          d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('click')
        })
        .on('contextmenu', function(e, d) {
          e.preventDefault()
          d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('contextmenu')
        })
        .on("mouseover", function() {

          tooltip.style("opacity", 1)
          d3.select(this).style('stroke', 'white').style('stroke-width', '2px')

        }).on("mousemove", (e, d) => {

          tooltip
            .html('<p><b>' + d.country + '</b></p>')
            .style("left", e.pageX + 5 + "px")
            .style("top", e.pageY - 25 + "px")

        }).on("mouseleave", function() {

          tooltip.style("opacity", 0)
          d3.select(this).style('stroke', '#c78348').style('stroke-width', '0.4px')

        }).transition().duration(1000)
        .attr('r', function(d) {
          if (d.country == filteredCountriesName.leftCountry || d.country == filteredCountriesName.rightCountry) {
            return '8'
          }
          return '5'
        })
        .attr('cx', d => xAxisScale(d.bottomValue))
        .attr('cy', d => yAxisScale(d.leftValue))
        .attr("fill", function(d) {
          if (d.country == filteredCountriesName.leftCountry) {
            d3.select(this).raise()
            return 'rgba(95, 51, 176, 0.7)'
          } else if (d.country == filteredCountriesName.rightCountry) {
            d3.select(this).raise()
            return 'rgba(50, 142, 199, 0.7)'
          }
          return color(d.leftValue * d.bottomValue)
        })
        .attr("transform", "translate(55,10)")
        .style('stroke', '#c78348').style('stroke-width', '0.4px')
      },
      update => {
        update
          .transition().duration(1000)
          .attr('r', function(d) {
            if (d.country == filteredCountriesName.leftCountry || d.country == filteredCountriesName.rightCountry) {
              return '8'
            }
            return '5'
          })
          .attr('cx', d => xAxisScale(d.bottomValue))
          .attr('cy', d => yAxisScale(d.leftValue))
          .attr("fill", function(d) {
            if (d.country == filteredCountriesName.leftCountry) {
              return 'rgba(95, 51, 176, 0.7)'
            } else if (d.country == filteredCountriesName.rightCountry) {
              return 'rgba(50, 142, 199, 0.7)'
            }
            return color(d.leftValue * d.bottomValue)
          })
      },
      exit => {
        exit.remove()
      }
    )
}

function axisDomain(filter) {
  var domain = []

  if (filter == 'corruption') {
    domain[0] = 0
    domain[1] = 100
  } else if (filter == 'healthcare') {
    domain[0] = 184
    domain[1] = 0
  } else if(filter == 'freedom' || filter == 'happiness') {
    domain[0] = 0
    domain[1] = 10
  } else if (filter == 'gdp') {
    domain[0] = 0
    domain[1] = 120000
  } else if (filter == 'safeness') {
    domain[0] = 4
    domain[1] = 0
  } else if (filter == 'temperature') {
    domain[0] = -10
    domain[1] = 30
  }

  return domain

}

function mergeScatteredData() {
  if (selectedFilters.length == 2) {
    var finalArray = []
    selectedFilters[0][1].forEach(left => {
      selectedFilters[1][1].some(function(bottom) {
        if (left.country == bottom.country) {
          finalArray.push({
            country: left.country,
            leftValue: left.value,
            bottomValue: bottom.value
          })
        }
        return left.country == bottom.country
      })
    })
    spearmanCorrelation(finalArray)
    if (firstTime) {
      drawScatteredPlot(finalArray)
      firstTime = false
    } else {
      updateScatteredPlot(finalArray)
    }
  }
}

function checkIfCanSelect(filter) {
  var bool = true
  selectedFilters.forEach(item => {
    if (item[0] == filter) {
      bool = false
    }
  })
  return bool
}


function filterScatteredPlot(data, filter) {
  return data.map(row => {
    var value
    if (filter == 'corruption' && !isNaN(parseFloat(row.corruption))) {
      return {
        country: row.country,
        value: parseFloat(row.corruption)
      }
    } else if (filter == 'freedom' && !isNaN(parseFloat(row.humanFreedom))) {
      return {
        country: row.country,
        value: parseFloat(row.humanFreedom)
      }
    } else if (filter == 'gdp' && !isNaN(parseFloat(row.gdppc))) {
      return {
        country: row.country,
        value: parseFloat(row.gdppc)
      }
    } else if (filter == 'happiness' && !isNaN(parseFloat(row.happiness))) {
      return {
        country: row.country,
        value: parseFloat(row.happiness)
      }
    } else if (filter == 'healthcare' && !isNaN(parseFloat(row.healthcareRank))) {
      return {
        country: row.country,
        value: parseFloat(row.healthcareRank)
      }
    } else if (filter == 'safeness' && !isNaN(parseFloat(row.safeness))) {
      return {
        country: row.country,
        value: parseFloat(row.safeness)
      }
    } else if (filter == 'temperature' && !isNaN(parseFloat(row.averageTemperature))) {
      return {
        country: row.country,
        value: parseFloat(row.averageTemperature)
      }
    }
  }).filter(function( element ) {
    return element !== undefined
  })
}

function spearmanCorrelation(data) {
  var X = []
  var Y = []
  data.forEach(row => {
    X.push(row.bottomValue)
    Y.push(row.leftValue)
  })

  X = rankify(X)
  Y = rankify(Y)

  let n = X.length
  let sum_X = 0, sum_Y = 0, sum_XY = 0
  let squareSum_X = 0, squareSum_Y = 0

  for (var i = 0; i < n; i++)
  {
      sum_X = sum_X + X[i]
      sum_Y = sum_Y + Y[i]
      sum_XY = sum_XY + X[i] * Y[i]
      squareSum_X = squareSum_X + X[i] * X[i]
      squareSum_Y = squareSum_Y + Y[i] * Y[i]
  }

  var value = Math.abs((n * sum_XY - sum_X * sum_Y) / Math.sqrt((n * squareSum_X - sum_X * sum_X) *(n * squareSum_Y - sum_Y * sum_Y)))

  // Pearson Correlation
  // let sumX = 0,
  //   sumY = 0,
  //   sumXY = 0,
  //   sumX2 = 0,
  //   sumY2 = 0
  // const minLength = x.length = y.length = Math.min(x.length, y.length),
  //   reduce = (xi, idx) => {
  //     const yi = y[idx]
  //     sumX += xi
  //     sumY += yi
  //     sumXY += xi * yi
  //     sumX2 += xi * xi
  //     sumY2 += yi * yi
  //   }
  // x.forEach(reduce)
  // var value = Math.abs((minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY)))

  if (value < 0.55) {
    d3.select('#correlationBox').html('<p><b>Low Correlation</b></p>').transition().duration(1000).style('background-color', 'rgba(178, 43, 39, 0.4)').attr('opacity', 0.7)
  } else if (value >= 0.55 && value < 0.7) {
    d3.select('#correlationBox').html('<p><b>Medium Correlation</b></p>').transition().duration(1000).style('background-color', 'rgba(239, 208, 51, 0.4)')
  } else {
    d3.select('#correlationBox').html('<p><b>High Correlation</b></p>').transition().duration(1000).style('background-color', 'rgba(147, 175, 135, 0.4)')
  }
}

function rankify(X) {

    let N = X.length
    let Rank_X = new Array(N)

    for(var i = 0; i < N; i++)
    {
        var r = 1, s = 1
        for(var j = 0; j < i; j++) {
            if (X[j] < X[i] ) r++
            if (X[j] == X[i] ) s++
        }
        for (var j = i+1; j < N; j++) {
            if (X[j] < X[i] ) r++
            if (X[j] == X[i] ) s++
        }
        Rank_X[i] = r + (s-1) * 0.5;
    }
    return Rank_X
}
