function spanChart(data, filteredAttribute, averagesData, filteredCountriesName) {

  var cfg = {
    width: 520,
    height: 345
  }

  var svg = d3.select('#vi2').attr('width', cfg.width + 'px').attr('height', cfg.height + 'px')

  var g = svg.append('g')

  var tooltip = d3.select('#spanChart').append("div").attr('id', 'spanToolTip').attr("class", "tooltip")

  var yAxisDomain = yAxisDomainFunc(filteredAttribute)
  data = cleanData(data, filteredAttribute)
  averagesData = cleanAveragesData(averagesData, filteredAttribute)
  filteredCountriesData = filteredCountriesDataFunc(data, filteredCountriesName)

  var yAxisScale = d3.scaleLinear().domain([yAxisDomain.maxValue, yAxisDomain.minValue]).range([0, cfg.height - 80])
  var yAxis = d3.axisLeft(yAxisScale)

  g.append('g').attr('id', 'spanChartYAxis').style('color', '#777778').attr("transform", 'translate(60,40)').call(yAxis)

  var continents = ['Africa', 'Asia', 'Europe', 'NA', 'Oceania', 'SA']
  var xAxisScale = d3.scalePoint().domain(continents).range([0, cfg.width - 90]).padding(0.5)
  var xAxis = d3.axisBottom(xAxisScale)

  g.append('g').attr('id', 'spanChartXAxis').style('color', '#777778').attr("transform", 'translate(60,' + (cfg.height - 40) + ')').call(xAxis)

  var values = []

  continents.forEach((item) => {

    var max = d3.max(data, function(d) {
      if (d.continent == item) {
        return d.rank
      }
    })

    values.push(data.filter((row) => item == row.continent && row.rank == max)[0])
    values.push(data.filter((row) => item == row.continent && row.rank == 1)[0])
  })

  var coordinates = []

  values.forEach((d, i) => {
    if (i % 2 == 0) {
      coordinates.push([xAxisScale(d.continent), yAxisScale(d.value), xAxisScale(values[i+1].continent), yAxisScale(values[i+1].value)])
    }
  })

  g.selectAll('path.spanChartLines')
    .data(coordinates)
    .join('path')
    .attr('class', 'spanChartLines')
    .attr('d', function(d) {
      return d3.line()([[d[0], d[1]], [d[2], d[3]]])
    })
    .attr("transform", "translate(60,40)")

  g.selectAll('circle.spanChartCircle')
    .data(values)
    .join("circle")
    .attr('class', 'spanChartCircle')
    .attr('r', '5')
    .attr('cx', d => xAxisScale(d.continent))
    .attr('cy', d => yAxisScale(d.value))
    .attr("transform", "translate(60,40)")
    .on('click', function(e, d) {
      d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('click')
    })
    .on('contextmenu', function(e, d) {
      e.preventDefault()
      d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('contextmenu')
    })
    .on("mouseover", () => {

      tooltip.transition().duration(200).style("opacity", 1)

    }).on("mousemove", (e, d) => {

      tooltip
        .html('<p><b>' + d.country + '</b></p><p>' + d.value + '</p>')
        .style("left", e.pageX + 5 + "px")
        .style("top", e.pageY - 45 + "px")

    }).on("mouseleave", () => {

      tooltip.transition().duration(200).style("opacity", 0)

    })

  g.selectAll('rect.continentAverages')
    .data(averagesData)
    .join('rect')
      .attr('class', 'continentAverages')
      .attr('x', (d) => xAxisScale(d.continent) - 8)
      .attr('y', (d) => yAxisScale(d.value) + 3)
      .attr('rx', '2')
      .attr('ry', '2')
      .attr("transform", "translate(60,40)")
      .on("mouseover", () => {

        tooltip.transition().duration(200).style("opacity", 1)

      }).on("mousemove", (e, d) => {

        tooltip
          .html('<p><b>Average</b></p><p>' + d.value + '</p>')
          .style("left", e.pageX + 5 + "px")
          .style("top", e.pageY - 45 + "px")

      }).on("mouseleave", () => {

        tooltip.transition().duration(200).style("opacity", 0)

      })

  g.selectAll('circle.spanChartCircleFilteredCountry')
    .data(filteredCountriesData)
    .join("circle")
    .attr('class', 'spanChartCircleFilteredCountry')
    .attr('r', '7')
    .attr('cx', d => xAxisScale(d.continent))
    .attr('cy', d => yAxisScale(d.value))
    .attr('fill', function(d) {
      if (d.country == filteredCountriesName.leftCountry) {
        return 'rgba(95, 51, 176, 0.7)'
      } else {
        return 'rgba(50, 142, 199, 0.7)'
      }
    })
    .attr("transform", "translate(60,40)")
    .on("mouseover", () => {

      tooltip.transition().duration(200).style("opacity", 1)

    }).on("mousemove", (e, d) => {

      tooltip
        .html('<p><b>' + d.country + '</b></p><p>' + d.value + '</p>')
        .style("left", e.pageX + 5 + "px")
        .style("top", e.pageY - 45 + "px")

    }).on("mouseleave", () => {

      tooltip.transition().duration(200).style("opacity", 0)

    })

  d3.select('#spanChartFilter').text(getChartTitle(filteredAttribute))

  return true
}

function yAxisDomainFunc(filteredAttribute) {
  var yAxisDomain = { minValue: 0, maxValue: 0 }

  if (filteredAttribute == 'corruption') {
    yAxisDomain.minValue = 0
    yAxisDomain.maxValue = 100
  } else if (filteredAttribute == 'healthcare') {
    yAxisDomain.minValue = 184
    yAxisDomain.maxValue = 0
  } else if(filteredAttribute == 'freedom' || filteredAttribute == 'happiness') {
    yAxisDomain.minValue = 0
    yAxisDomain.maxValue = 10
  } else if (filteredAttribute == 'gdp') {
    yAxisDomain.minValue = 0
    yAxisDomain.maxValue = 120000
  } else if (filteredAttribute == 'safeness') {
    yAxisDomain.minValue = 4
    yAxisDomain.maxValue = 0
  } else if (filteredAttribute == 'temperature') {
    yAxisDomain.minValue = -10
    yAxisDomain.maxValue = 30
  }

  return yAxisDomain
}

function cleanData(data, filteredAttribute) {
  data = data.map(function(row) {
    var value, rank, continent
    if (filteredAttribute == 'corruption') {
      value = row.corruption
      rank = row.continentCorruptionRank
    } else if (filteredAttribute == 'freedom') {
      value = row.humanFreedom
      rank = row.continentFreedomRank
    } else if (filteredAttribute == 'gdp') {
      value = row.gdppc
      rank = row.continentGDPRank
    } else if (filteredAttribute == 'happiness') {
      value = row.happiness
      rank = row.continentHappinessRank
    } else if (filteredAttribute == 'healthcare') {
      value = row.healthcareRank
      rank = row.continentHealthcareRank
    } else if (filteredAttribute == 'safeness') {
      value = row.safeness
      rank = row.continentSafenessRank
    } else if (filteredAttribute == 'temperature') {
      value = row.averageTemperature
      rank = row.continentTemperatureRank
    }

    if (row.continent == 'North America') {
      continent = 'NA'
    } else if (row.continent == 'South America') {
      continent = 'SA'
    } else {
      continent = row.continent
    }

    if (!isNaN(parseFloat(value))) {
      return {
        country: row.country,
        continent: continent,
        value: parseFloat(value),
        rank: parseFloat(rank)
      }
    }
  }).filter(function( element ) {
   return element !== undefined;
  })

  return data
}

function cleanAveragesData(averagesData, filteredAttribute) {
  averagesData = averagesData.map(function(row) {
    var value, continent
    if (filteredAttribute == 'corruption') {
      value = row.averageCorruption
    } else if (filteredAttribute == 'freedom') {
      value = row.averageFreedom
    } else if (filteredAttribute == 'gdp') {
      value = row.averageGDP
    } else if (filteredAttribute == 'happiness') {
      value = row.averageHappiness
    } else if (filteredAttribute == 'healthcare') {
      value = row.averageHealthCare
    } else if (filteredAttribute == 'safeness') {
      value = row.averageSafeness
    } else if (filteredAttribute == 'temperature') {
      value = row.averageTemperature
    }

    if (row.continent == 'NorthAmerica') {
      continent = 'NA'
    } else if (row.continent == 'SouthAmerica') {
      continent = 'SA'
    } else {
      continent = row.continent
    }

    return {
      continent: continent,
      value: parseFloat(value)
    }
  })

  return averagesData
}

function filteredCountriesDataFunc(data, filteredCountriesName) {
  var countriesData = data.filter(row => row.country == filteredCountriesName.leftCountry || row.country == filteredCountriesName.rightCountry)
  if (countriesData[0].country != filteredCountriesName.leftCountry) {
    [countriesData[0], countriesData[1]] = [countriesData[1], countriesData[0]]
  }
  return countriesData
}

function updateSpanChart(data, filteredAttribute, averagesData, filteredCountriesName) {
  var cfg = {
    width: 520,
    height: 345
  }

  var g = d3.select('#vi2').select('g')

  var yAxisDomain = yAxisDomainFunc(filteredAttribute)
  data = cleanData(data, filteredAttribute)
  averagesData = cleanAveragesData(averagesData, filteredAttribute)
  filteredCountriesData = filteredCountriesDataFunc(data, filteredCountriesName)

  var yAxisScale = d3.scaleLinear().domain([yAxisDomain.maxValue, yAxisDomain.minValue]).range([0, cfg.height - 80])
  var yAxis = d3.axisLeft(yAxisScale)

  d3.select('#spanChartYAxis').transition().duration(1000).call(yAxis)

  var continents = ['Africa', 'Asia', 'Europe', 'NA', 'Oceania', 'SA']

  var xAxisScale = d3.scalePoint().domain(continents).range([0, cfg.width - 90]).padding(0.5)

  var values = []

  continents.forEach((item) => {

    var max = d3.max(data, function(d) {
      if (d.continent == item) {
        return d.rank
      }
    })

    values.push(data.filter((row) => item == row.continent && row.rank == max)[0])
    values.push(data.filter((row) => item == row.continent && row.rank == 1)[0])
  })

  var coordinates = []

  values.forEach((d, i) => {
    if (i % 2 == 0) {
      coordinates.push([xAxisScale(d.continent), yAxisScale(d.value), xAxisScale(values[i+1].continent), yAxisScale(values[i+1].value)])
    }
  })

  g.selectAll('path.spanChartLines')
    .data(coordinates)
    .join(
      enter => {

      },
      update => {
        update.transition().duration(1000).attr('d', function(d) {
          return d3.line()([[d[0], d[1]], [d[2], d[3]]])
        })
      },
      exit => {
        exit.remove()
      }
    )

  g.selectAll('.spanChartCircle')
    .data(values)
    .join(
      enter => {

      },
      update => {
        update.transition().duration(1000).attr('cy', d => yAxisScale(d.value))
      },
      exit => {
        exit.remove()
      }
    )

  g.selectAll('rect.continentAverages')
    .data(averagesData)
    .join(
      enter => {

      },
      update => {
        update.transition().duration(1000).attr('y', d => yAxisScale(d.value) + 2)
      },
      exit => {

      }
    )

  g.selectAll('circle.spanChartCircleFilteredCountry')
    .data(filteredCountriesData)
    .join(
      enter => {
      },
      update => {
        update.transition().duration(1000).attr('cy', function(d){
          if (d == undefined) {
            return yAxisScale(0)
          } else {
            return yAxisScale(d.value)
          }
        })
        .attr('cx', function(d){
          if (d == undefined) {
            return yAxisScale(0)
          } else {
            return xAxisScale(d.continent)
          }
        })
        .attr('visibility', function(d) {
          if (d == undefined) {
            return 'hidden'
          } else {
            return 'visible'
          }
        })
      },
      exit => {
      }
    )

  d3.select('#spanChartFilter').text(getChartTitle(filteredAttribute))
}

function getChartTitle(filteredAttribute) {
  if (filteredAttribute == 'corruption') {
    return 'Corruption'
  } else if (filteredAttribute == 'freedom') {
    return 'Freedom'
  } else if (filteredAttribute == 'gdp') {
    return 'GDPPC'
  } else if (filteredAttribute == 'happiness') {
    return 'Happiness'
  } else if (filteredAttribute == 'healthcare') {
    return 'Healthcare'
  } else if (filteredAttribute == 'safeness') {
    return 'Safeness'
  } else if (filteredAttribute == 'temperature') {
    return 'Temperature'
  }
}
