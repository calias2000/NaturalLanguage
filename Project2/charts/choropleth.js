function createMap(id) {

  svg = d3.select(id);
  svg.attr("width", '100%');
  svg.attr("height", '100%');

  const g = svg.append('g')

  svg.call(d3.zoom().scaleExtent([1, 3])
  .translateExtent([[0, 0], [svg.node().getBoundingClientRect().width, svg.node().getBoundingClientRect().height]])
  .on('zoom', function(event) {
    g.attr('transform', event.transform)
  }))

  projection = d3.geoMercator().center([95, -25]).scale(100)

  d3.json("./data/mapData.json").then(function (loadData) {

    topo = loadData

    g.selectAll("path.country")
      .data(topojson.feature(topo, topo.objects.countries).features)
      .join("path")
      .attr("d", d3.geoPath(projection))
      .attr('id', (d) => 'C' + d.id)
      .attr('class', 'country')

  })

}
