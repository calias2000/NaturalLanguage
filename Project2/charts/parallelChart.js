function parallelChart(data) {
  var margin = {top: 30, right: 30, bottom: 15, left: 30},
    width = 700 - margin.left - margin.right,
    height = 330 - margin.top - margin.bottom;

  var x = d3.scalePoint()
      .range([0, width])

  var y = {}

  var tooltip = d3.select("#comparisonCard").append("div").attr('id', 'parallelToolTip').attr("class", "tooltip")

  var line = d3.line()
    // .curve(d3.curveNatural)
  var axis = d3.axisLeft()
  var background
  var foreground
  var dimensions = null

  var svg = d3.select("#comparisonCard").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


  data = data.map(function(row) {
    var health = 0, safe = 0
    if (row.healthcareRank.length == 0) {
      health = 180
    }  else {
      health = row.healthcareRank
    }

    if (row.safeness == 0) {
      safe = 4
    } else {
      safe = row.safeness
    }
    return {
      country: row.country,
      corruption: row.corruption,
      humanFreedom: row.humanFreedom,
      gdppc: row.gdppc,
      happiness: row.happiness,
      healthcareRank: health,
      safeness: safe,
      averageTemperature: row.averageTemperature
    }
  })

  x.domain(dimensions = Object.keys(data[0]).filter(function(d) {
    if (d != 'country') {
      if (d == 'corruption') {
        y[d] = d3.scaleLinear()
          .domain([0, 100])
          .range([height, 0])
      } else if (d == 'humanFreedom') {
        y[d] = d3.scaleLinear()
          .domain([0, 10])
          .range([height, 0])
      } else if (d == "gdppc") {
        y[d] = d3.scaleLinear()
          .domain([0, 120000])
          .range([height, 0])
      } else if (d == "happiness") {
        y[d] = d3.scaleLinear()
          .domain([0, 10])
          .range([height, 0])
      } else if (d == "healthcareRank") {
        y[d] = d3.scaleLinear()
          .domain([0, 180])
          .range([0, height])
      } else if (d == "safeness") {
        y[d] = d3.scaleLinear()
          .domain([0, 4])
          .range([0, height])
      } else if (d == "averageTemperature") {
        y[d] = d3.scaleLinear()
          .domain([-10, 30])
          .range([height, 0])
      }
      return true
    }
  }))

  // background = svg.append("g")
  //     .attr("class", "background")
  //   .selectAll("path")
  //     .data(data)
  //   .enter().append("path")
  //     .attr("d", path);

  foreground = svg.append("g")
      .attr("class", "foreground")
      .attr('id', 'foreground')
    .selectAll("path")
      .data(data)
    .enter().append("path")
      .attr("d", path)
      .on('mouseover', function(e, d) {
        tooltip.style("opacity", 1)
        d3.select(this).style('stroke-width', '5px').style('stroke', '#8A101E').style('opacity', '0.7')
        var value
        if (parseFloat(d.safeness) == 4) {
          value = 'NaN'
        } else {
          value = parseFloat(d.safeness)
        }
        d3.select('#parallelCorruption').html('<p><b>' + parseFloat(d.corruption) + '</b></p>')
        d3.select('#parallelFreedom').html('<p><b>' + parseFloat(d.humanFreedom) + '</b></p>')
        d3.select('#parallelGDP').html('<p><b>' + parseFloat(d.gdppc) + '€</b></p>')
        d3.select('#parallelHappiness').html('<p><b>' + parseFloat(d.happiness) + '</b></p>')
        d3.select('#parallelHealthcare').html('<p><b>' + getOrdinal(d.healthcareRank) + '</b></p>')
        d3.select('#parallelSafeness').html('<p><b>' + value + '</b></p>')
        d3.select('#parallelTemperature').html('<p><b>' + parseFloat(d.averageTemperature) + 'ºC</b></p>')
      })
      .on("mousemove", (e, d) => {

        tooltip
          .html('<p><b>' + d.country + '</b></p>')
          .style("left", e.pageX + 5 + "px")
          .style("top", e.pageY - 25 + "px")

      })
      .on('mouseleave', function(e, d) {
        tooltip.style("opacity", 0)
        if (d.country == filteredCountriesName.leftCountry) {
          d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').style('stroke', 'rgb(95, 51, 176)')
        } else if (d.country == filteredCountriesName.rightCountry) {
          d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').style('stroke', 'rgb(50, 142, 199)')
        } else {
          d3.select(this).style('stroke-width', '1.5px').style('stroke', '#F4AB6A').style('opacity', '0.1')
        }

        d3.select('#parallelCorruption').html('<p><b></b></p>')
        d3.select('#parallelFreedom').html('<p><b></b></p>')
        d3.select('#parallelGDP').html('<p><b></b></p>')
        d3.select('#parallelHappiness').html('<p><b></b></p>')
        d3.select('#parallelHealthcare').html('<p><b></b></p>')
        d3.select('#parallelSafeness').html('<p><b></b></p>')
        d3.select('#parallelTemperature').html('<p><b></b></p>')

      })
      .on('click', function(e, d) {
        d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('click')
      })
      .on('contextmenu', function(e, d) {
        e.preventDefault()
        d3.selectAll('path.country').filter(country => country.properties.name == d.country).dispatch('contextmenu')
      })
      .style('stroke', function(d) {
        if (d.country == filteredCountriesName.leftCountry) {
          d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').raise()
          return 'rgb(95, 51, 176)'
        } else if (d.country == filteredCountriesName.rightCountry) {
          d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').raise()
          return 'rgb(50, 142, 199)'
        } else {
          d3.select(this).style('stroke-width', '2px').style('opacity', '0.1')
          return '#F4AB6A'
        }
      })

  var g = svg.selectAll(".dimension")
    .data(dimensions).enter()
    .append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) {return "translate("+x(d)+")"; })


  g.append("g")
    .attr("class", "axis")
    .each(function(d) { d3.select(this).call(axis.scale(y[d]))})
  .append("text")
    .style("text-anchor", "middle")
    .attr("y", -15)
    .text(function(d) {
      if (d == 'corruption') {
        return 'Corruption'
      } else if (d == 'humanFreedom') {
        return 'Freedom'
      } else if (d == 'gdppc') {
        return 'GDPPC'
      } else if (d == 'happiness') {
        return 'Happiness'
      } else if (d == 'healthcareRank') {
        return 'HealthcareRank'
      } else if (d == 'safeness') {
        return 'Safeness'
      } else if (d == 'averageTemperature') {
        return 'Temperature'
      }
    })

  g.append("g")
    .attr("class", "brush")
    .each(function(d) {
        d3.select(this).call(y[d].brush = d3.brushY()
          .extent([[-10,0], [10,height]])
          .on("brush", brush)
          .on("end", brush)
          )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  function path(d) {
    return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  }

  function brush() {
    var actives = []
    svg.selectAll(".brush")
      .filter(function(d) {
        y[d].brushSelectionValue = d3.brushSelection(this)
        return d3.brushSelection(this)
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3.brushSelection(this).map(y[d].invert)
        })
      })

    var selected = []
    foreground.style("display", function(d) {
      let isActive = actives.every(function(active) {
        let result = (active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0]) ||
          (active.extent[1] >= d[active.dimension] && d[active.dimension] >= active.extent[0])
        return result
      })

      isActive = (actives.length ===0 ) ? true : isActive

      if(isActive) selected.push(d)
      return (isActive) ? null : "none"
    })
  }
}

function updateParallelChart() {
  var svg = d3.select("#foreground")

  svg.selectAll('path').transition().duration(500).style('stroke', function(d) {
    if (d.country == filteredCountriesName.leftCountry) {
      d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').raise()
      return 'rgb(95, 51, 176)'
    } else if (d.country == filteredCountriesName.rightCountry) {
      d3.select(this).style('stroke-width', '5px').style('opacity', '0.7').raise()
      return 'rgb(50, 142, 199)'
    } else {
      d3.select(this).style('stroke-width', '2px').style('opacity', '0.1')
      return '#F4AB6A'
    }
  })
}
