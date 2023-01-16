function init() {
  createMap("#vi1")
  initializeData()
}

filterClicked = ''
filteredCountriesID = []
filteredCountriesName = {
  leftCountry: '',
  rightCountry: ''
}
firstComparison = true
comparison = []
initializeSpan = false
firstTimeLegend = true
var colorScale = null
currentMap = new Map()

function initializeData() {
  d3.csv("./data/big0.csv").then(function (data) {
    d3.csv("./data/averages.csv").then(function (averagesData) {
      mapFilters(data, averagesData)
      countryComparison(data, averagesData)
      d3.select('#C620').dispatch('click')
      d3.select('#C076').dispatch('contextmenu')
      d3.select('#sortByCorruption').dispatch('click')
      // RadarChart(comparison)
      parallelChart(data)
      firstComparison = false
      initializeSpan = spanChart(data, filterClicked, averagesData, filteredCountriesName)
      scatteredDotChart(data)
      d3.select('#selectXAxis').property('value', 'freedom')
      d3.select('#selectYAxis').property('value', 'corruption')
      d3.select('#selectYAxis').dispatch('change')
      d3.select('#selectXAxis').dispatch('change')
    })
  })
}

function mapFilters(data, averagesData) {

  var auxArray = [d3.select('#sortByCorruption'), d3.select('#sortByFreedom'), d3.select('#sortByGDP'),
    d3.select('#sortByHappiness'), d3.select('#sortByHealthcare'), d3.select('#sortBySafeness'), d3.select('#sortByTemperature')]

  d3.select('#sortByCorruption').on('click', function() {
    filterClicked = 'corruption'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.corruption))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortByFreedom').on('click', function() {
    filterClicked = 'freedom'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.humanFreedom))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortByGDP').on('click', function() {
    filterClicked = 'gdp'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.gdppc))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortByHappiness').on('click', function() {
    filterClicked = 'happiness'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.happiness))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortByHealthcare').on('click', function() {
    filterClicked = 'healthcare'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.healthcareRank))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortBySafeness').on('click', function() {
    filterClicked = 'safeness'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.safeness))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })

  d3.select('#sortByTemperature').on('click', function() {
    filterClicked = 'temperature'

    map = new Map();
    data.forEach((d) => {
      map.set(d.country, parseFloat(d.averageTemperature))
    })

    changeMap(map, auxArray)

    d3.select(this).style('background-color', '#c78348').style('color', '#D2D2D2').style('border-color', '#8f3a10')

    if (initializeSpan) {
      updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
    }

    updateWorldRank(data, filterClicked, filteredCountriesName)

  })
}

function countryComparison(data, averagesData) {

  // create a tooltip
  var tooltip = d3.select("#map")
    .append("div")
    .attr("class", "tooltip")

  d3.selectAll("path.country").on('click', (e, d) => {
    if (d.properties.name != filteredCountriesName.leftCountry && d.properties.name != filteredCountriesName.rightCountry) {
      data.forEach((row) => {
        if (d.properties.name == row.country) {

          var aux = {
            corruption: row.corruption,
            humanFreedom: row.humanFreedom,
            gdppc: row.gdppc,
            happiness: row.happiness,
            healthcareRank: row.healthcareRank,
            safeness: row.safeness,
            averageTemperature: row.averageTemperature
          }

          comparison[0] = aux
          filteredCountriesName.leftCountry = row.country
          mergeScatteredData()
        }
      })

      modifyMapColor()

      if (comparison.length == 2) {
        if (!firstComparison) {
          updateParallelChart()
        }
        if (initializeSpan) {
          updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
          updateWorldRank(data, filterClicked, filteredCountriesName)
        }
      }
    }
  }).on("contextmenu", function (e, d) {

    e.preventDefault()

    if (d.properties.name != filteredCountriesName.leftCountry && d.properties.name != filteredCountriesName.rightCountry) {
      data.forEach((row) => {
        if (d.properties.name == row.country) {

          var aux = {
            corruption: row.corruption,
            humanFreedom: row.humanFreedom,
            gdppc: row.gdppc,
            happiness: row.happiness,
            healthcareRank: row.healthcareRank,
            safeness: row.safeness,
            averageTemperature: row.averageTemperature
          }

          comparison[1] = aux
          filteredCountriesName.rightCountry = row.country
          mergeScatteredData()
        }
      })

      modifyMapColor()

      if (comparison.length == 2) {
        if (!firstComparison) {
          updateParallelChart()
        }
        if (initializeSpan) {
          updateSpanChart(data, filterClicked, averagesData, filteredCountriesName)
          updateWorldRank(data, filterClicked, filteredCountriesName)
        }
      }
    }
  })
  .on("mouseover", function(e, d) {

    tooltip.style("opacity", 1)
    d3.selectAll("path.country").attr('opacity', function(country) {
      if (d.properties.name != country.properties.name) {
        return '0.6'
      }
    })

    d3.select(this).style('stroke-width', '2px').style('stroke', 'white')

  }).on("mousemove", (e, d) => {

    text = ''

    data.forEach((row) => {
      if (d.properties.name == row.country) {
        if (filterClicked == 'corruption') {
          text = row.corruption
        } else if (filterClicked == 'freedom') {
          text = row.humanFreedom
        } else if (filterClicked == 'gdp') {
          text = row.gdppc
        } else if (filterClicked == 'happiness') {
          text = row.happiness
        } else if (filterClicked == 'healthcare') {
          text = row.healthcareRank
        } else if (filterClicked == 'safeness') {
          text = row.safeness
        } else if (filterClicked == 'temperature') {
          text = row.averageTemperature
        }
      }
    })

    tooltip
      .html('<p><b>' + d.properties.name + '</b></p><p>' + parseFloat(text) + '</p>')
      .style("left", e.pageX + 5 + "px")
      .style("top", e.pageY - 45 + "px")

  }).on("mouseleave", function(e, d) {

    tooltip.style("opacity", 0)

    d3.selectAll("path.country").attr('opacity', '1')

    if (d.properties.name != filteredCountriesName.leftCountry && d.properties.name != filteredCountriesName.rightCountry) {
      d3.select(this).style('stroke-width', '0.3px').style('stroke', '#999')
    }

  })
}

function changeMap(map, auxArray) {

  var title = ''
  currentMap = map

  if (filterClicked == 'corruption') {
    title = 'Corruption Index (higher is better)'
  } else if (filterClicked == 'freedom') {
    title = 'Freedom'
  } else if (filterClicked == 'gdp') {
    title = 'GDPPC (€)'
  } else if (filterClicked == 'happiness') {
    title = 'Happiness'
  } else if (filterClicked == 'healthcare') {
    title = 'Healthcare Rank'
  } else if (filterClicked == 'safeness') {
    title = 'Peace Index (lower is better)'
  } else if (filterClicked == 'temperature') {
    title = 'Temperature (ºC)'
  }

  if (filterClicked == 'healthcare' || filterClicked == 'safeness' || filterClicked == 'temperature' || filterClicked == 'gdp' || filterClicked == 'happiness') {
    colorScale = d3.scaleSequential([d3.min(map, (d) => d[1]), d3.max(map, (d) => d[1])], d3.interpolateHcl("#f0d318", '#821414'))
    var legend = Legend(d3.scaleSequential([d3.min(map, (d) => d[1]), d3.max(map, (d) => d[1])], d3.interpolateHcl("#f0d318", '#821414')), {
      title: title,
      tickSize: 0
    })
  } else {
    colorScale = d3.scaleSequential([d3.min(map, (d) => d[1]), d3.max(map, (d) => d[1])], d3.interpolateHcl('#821414', "#f0d318"))
    var legend = Legend(d3.scaleSequential([d3.min(map, (d) => d[1]), d3.max(map, (d) => d[1])], d3.interpolateHcl('#821414', "#f0d318")), {
      title: title,
      tickSize: 0
    })
  }

  d3.select('#mapLegend').remove()

  var g1 = d3.select('#vi1').append('g')
  g1.node().append(legend)
  g1.attr('transform', 'translate(5, 300)')

  modifyMapColor()

  auxArray.forEach((button) => {
    button.style('background-color', '#D2D2D2').style('color', 'black').style('border-color', '#777778')
  })
}

function modifyMapColor() {
  d3.selectAll("path.country").transition().duration(1000).attr("fill", function (d) {
    if (d.properties.name == filteredCountriesName.rightCountry) {
      return '#328ec7'
    } else if (d.properties.name == filteredCountriesName.leftCountry) {
      return '#5f33b0'
    }
    else if (colorScale != null) {
      return colorScale(currentMap.get(d.properties.name))
    }
  })
  .style('stroke', function(d) {
    if (d.properties.name == filteredCountriesName.rightCountry || d.properties.name == filteredCountriesName.leftCountry) {
      return '#ffffff'
    } else {
      return '#999'
    }
  })
  .style('stroke-width', function(d) {
    if (d.properties.name == filteredCountriesName.rightCountry || d.properties.name == filteredCountriesName.leftCountry) {
      return '2px'
    } else {
      return '0.3px'
    }
  })
}

function getOrdinal(rank) {

  if (rank == 180) {
    return 'NaN'
  }
  var ordinal
  var lastDigit = rank.charAt(rank.length - 3)

  if (lastDigit == '1') {
    ordinal = 'st'
  } else if (lastDigit == '2') {
    ordinal = 'nd'
  } else if (lastDigit == '3') {
    ordinal = 'rd'
  } else {
    ordinal = 'th'
  }

  return '' + parseFloat(rank) + ordinal
}
