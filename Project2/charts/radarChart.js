var id = '#pentagono'

function RadarChart(data) {

  var cfg = {
    w: 280,
    h: 280,
    margin: {top: 20, right: 45, bottom: 20, left: 45},
    opacityArea: 0.35,
    dotRadius: 4,
    opacityCircles: 0.1,
    strokeWidth: 1,
    color: d3.scaleOrdinal().range(['#5f33b0', '#328ec7']),
    fields: false
  }

  var eachScale = [88, 10, 120000, 10, 160, 4, 30]
  var labelScale = []
  cfg.fields = Object.keys(data[0]);

  var total = cfg.fields.length,
    radius = Math.min(cfg.w/2, cfg.h/2),
    angleSlice = Math.PI * 2 / total

  var autos;
  autos = autoScalesAxes(data, radius, eachScale, labelScale)
  var scales = cfg.fields.map(function(k){ return autos[k].scale })

  data = data.map(function(row){
    var newRow = cfg.fields.map(function(key) {
        return {"axis": key, "value": row[key]};
    });
    return newRow;
  })

  d3.select(id).select("svg").remove()

  var svg = d3.select(id).append("svg")
    .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)

  var g = svg.append("g")
    .attr('id', 'radarChartG')
    .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	let filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

  let axisGrid = g.append("g").attr("class", "axisWrapper");

	axisGrid.selectAll(".levels")
    .data(d3.range(1,(cfg.fields.length+1)).reverse())
    .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", d => radius / cfg.fields.length * d)
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", 0.05)
		.style("filter" , "url(#glow)")

  const sin = Math.sin;
  const cos = Math.cos;
  const HALF_PI = Math.PI / 2;

	var axis = axisGrid.selectAll(".axis")
		.data(cfg.fields)
		.enter()
		.append("g")
		.attr("class", "axis");

	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => scales[i](eachScale[i]) * cos(angleSlice * i - HALF_PI))
		.attr("y2", (d, i) => scales[i](eachScale[i]) * sin(angleSlice * i - HALF_PI))
		.attr("class", "line")
		.style("stroke", "#CDCDCD")
		.style("stroke-width", "2px")

	axis.append("text")
		.style("font-size", "9px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d,i) => scales[i](labelScale[i]) * cos(angleSlice * i - HALF_PI))
		.attr("y", (d,i) => scales[i](labelScale[i]) * sin(angleSlice * i - HALF_PI))
		.text((d) => {
      if (d == 'averageTemperature') {
        return 'Temperature'
      } else if (d == 'corruption') {
        return 'Corruption'
      } else if (d == 'healthcareRank') {
        return 'HealthcareRank'
      } else if (d == 'happiness') {
        return 'Happiness'
      } else if (d == 'gdppc') {
        return 'GDP'
      } else if (d == 'humanFreedom') {
        return 'Freedom'
      } else if (d == 'safeness') {
        return 'Safeness'
      }
    })

  var radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
    .radius(function(d, i) { return scales[i](d.value) })
    .angle(function(d,i) {  return i*angleSlice; })

  var tooltip = d3.select(id).append("div").attr('id', 'radarToolTip').attr("class", "tooltip")

  var blobWrapper = g.selectAll(".radarWrapper")
    .data(data)
    .enter().append("g")
    .attr("class", "radarWrapper");

  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function(d,i) { return radarLine(d) })
    .style("fill", function(d,i) {
      return cfg.color(i)
    })
    .style("fill-opacity", cfg.opacityArea)
    .on('mouseover', function (d,i){
      //Dim all blobs
      d3.selectAll(".radarArea")
        .transition().duration(200)
        .style("fill-opacity", 0.1)
      //Bring back the hovered over blob
      d3.select(this)
        .transition().duration(200)
        .style("fill-opacity", 0.7)
    })
    .on('mouseout', function(){
      d3.selectAll(".radarArea")
        .transition().duration(200)
        .style("fill-opacity", cfg.opacityArea)
    });

  blobWrapper.append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d,i) { return radarLine(d); })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function(d,i) { return cfg.color(i); })
    .style("fill", "none")
    .style('filter', 'url(#glow)')

  blobWrapper.selectAll(".radarCircle")
    .data(function(d,i) { return d })
    .enter().append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
    .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
    .style("fill", function(d,i,j) {
      return cfg.color(j)
    })
    .style("fill-opacity", 0.8)

  var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
    .data(data)
    .enter().append("g")
    .attr("class", "radarCircleWrapper");

  blobCircleWrapper.selectAll(".radarInvisibleCircle")
    .data(function(d,i) { return d; })
    .enter().append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius*1.5)
    .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
    .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", () => {

      tooltip.transition().duration(200).style("opacity", 1)

    })
    .on("mousemove", function(e,d) {

      tooltip
        .html('<p><b>' + parseFloat(d.value) + '</b></p>')
        .style("left", e.pageX + 5 + "px")
        .style("top", e.pageY - 25 + "px")
    })
    .on("mouseout", function(){
      tooltip.transition().duration(200)
        .style("opacity", 0);
    })
}

function updateRadarChart(data) {

  var cfg = {
    w: 280,
    h: 280,
    margin: {top: 20, right: 45, bottom: 20, left: 45},
    opacityArea: 0.35,
    dotRadius: 4,
    opacityCircles: 0.1,
    strokeWidth: 1,
    color: d3.scaleOrdinal().range(['#5f33b0', '#328ec7']),
    fields: false
  }

  var eachScale = [88, 10, 120000, 10, 160, 4, 30]
  var labelScale = []
  cfg.fields = Object.keys(data[0]);

  var total = cfg.fields.length,
    radius = Math.min(cfg.w/2, cfg.h/2),
    angleSlice = Math.PI * 2 / total

  var autos
  autos = autoScalesAxes(data, radius, eachScale, labelScale)
  var scales = cfg.fields.map(function(k){ return autos[k].scale })

  data = data.map(function(row){
    var newRow = cfg.fields.map(function(key) {
        return {"axis": key, "value": row[key]};
    });
    return newRow;
  })

  var g = d3.select('#radarChartG')

  var radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
    .radius(function(d, i) { return scales[i](d.value) })
    .angle(function(d,i) {  return i*angleSlice; })

  var blobWrapper = g.selectAll(".radarWrapper").data(data).join(
    enter => {

    },
    update => {
      update.select('.radarArea').transition().duration(1000).attr('d', function(d,i) { return radarLine(d) })
      update.select('.radarStroke').transition().duration(1000).attr('d', function(d,i) { return radarLine(d) })
      update.selectAll('.radarCircle').data(function(d,i) { return d }).transition().duration(1000)
        .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
        .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
    },
    exit => {

    }
  )

  var blobCircleWrapper = g.selectAll(".radarCircleWrapper").data(data).join(
    enter => {

    },
    update => {
      update.selectAll(".radarInvisibleCircle")
        .data(function(d,i) { return d })
        .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
        .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
    },
    exit => {

    }
  )
}

function autoScalesAxes(data, radius, eachScale, labelScale){

  var ret = {};
  var fieldNames = Object.keys(data[0]);

  var counter = 0

  fieldNames.map(function(i){

    var axisData = data.map(function(row){
      return row[i];
    });

    var scale;
    var minValue

    if (i == 'averageTemperature') {
      minValue = -10
    } else {
      minValue = 0
    }

    if (i == 'corruption' || i == 'healthcareRank' || i == 'safeness') {
      scale = d3.scaleLinear()
        .range([0, radius])
        .domain([eachScale[counter], minValue])

      if (i == 'corruption') {
        labelScale[counter] = eachScale[counter] - eachScale[counter] * 1.1
      } else if (i == 'safeness') {
        labelScale[counter] = eachScale[counter] - eachScale[counter] * 1.2
      } else {
        labelScale[counter] = eachScale[counter] - eachScale[counter] * 1.15
      }

      eachScale[counter] = minValue

    } else {
      scale = d3.scaleLinear()
        .range([0, radius])
        .domain([minValue, eachScale[counter]])

      if (i == 'averageTemperature') {
        labelScale[counter] = eachScale[counter] * 1.25
      } else {
        labelScale[counter] = eachScale[counter] * 1.15
      }
    }

    ret[i] = {};
    ret[i].scale = scale;

    counter++

  });

  return ret;

}
