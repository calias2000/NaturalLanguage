function updateWorldRank(data, filterClicked, filteredCountriesName) {

  var obj = []

  data = data.map(function(row) {
    var rank
    if (filterClicked == 'corruption') {
      rank = row.worldCorruptionRank
    } else if (filterClicked == 'freedom') {
      rank = row.worldFreedomRank
    } else if (filterClicked == 'gdp') {
      rank = row.worldGDPRank
    } else if (filterClicked == 'happiness') {
      rank = row.worldHappinessRank
    } else if (filterClicked == 'healthcare') {
      rank = row.healthcareRank
    } else if (filterClicked == 'safeness') {
      rank = row.worldSafenessRank
    } else if (filterClicked == 'temperature') {
      rank = row.worldTemperatureRank
    }

    if (!isNaN(parseFloat(rank)) && (row.country == filteredCountriesName.leftCountry || row.country == filteredCountriesName.rightCountry)) {
      obj.push({
        country: row.country,
        rank: parseFloat(rank)
      })
    }

    if (!isNaN(parseFloat(rank))) {
      return {
        country: row.country,
        rank: parseFloat(rank)
      }
    }
  }).filter(function( element ) {
    return element !== undefined;
  })

  data.sort((a,b) => a.rank - b.rank)
  obj.sort((a,b) => a.rank - b.rank)

  if (obj.length == 2) {
    if (obj[0].rank + 2 >= obj[1].rank - 1) {
      if (obj[0].rank <= 4) {
        d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
        d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
        d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
        d3.select('#worldRankItem4').html("<div class='w3-container worldRankItemRank'><p>4.</p></div><div class='worldRankCountry'>" + data[3].country + "</div>")
        d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>5.</p></div><div class='worldRankCountry'>" + data[4].country + "</div>")
        d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>6.</p></div><div class='worldRankCountry'>" + data[5].country + "</div>")
        d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>7.</p></div><div class='worldRankCountry'>" + data[6].country + "</div>")
        d3.select('#worldRankItem8').html("<div class='w3-container worldRankItemRank'><p>8.</p></div><div class='worldRankCountry'>" + data[7].country + "</div>")
        d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>9.</p></div><div class='worldRankCountry'>" + data[8].country + "</div>")
        d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>10.</p></div><div class='worldRankCountry'>" + data[9].country + "</div>")
        d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>11.</p></div><div class='worldRankCountry'>" + data[10].country + "</div>")
      } else {
        d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
        d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
        d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
        d3.select('#worldRankItem4').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
        if (obj[1].rank == data.length) {
          d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 6) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 7].country + "</div>")
          d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 5) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 6].country + "</div>")
          d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank-4) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 5].country + "</div>")
          d3.select('#worldRankItem8').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank -3) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 4].country + "</div>")
          d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 2) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 3].country + "</div>")
          d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 2].country + "</div>")
          d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 1].country + "</div>")
        } else {
          d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 2].country + "</div>")
          d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 1].country + "</div>")
          d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank].country + "</div>")
          d3.select('#worldRankItem8').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 2) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 1].country + "</div>")
          d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 3) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 2].country + "</div>")
          d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 4) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 3].country + "</div>")
          d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 5) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 4].country + "</div>")
        }
      }
    } else if (obj[0].rank <= 4){
      if (obj[1].rank <= 9) {
        d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
        d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
        d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
        d3.select('#worldRankItem4').html("<div class='w3-container worldRankItemRank'><p>4.</p></div><div class='worldRankCountry'>" + data[3].country + "</div>")
        d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>5.</p></div><div class='worldRankCountry'>" + data[4].country + "</div>")
        d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>6.</p></div><div class='worldRankCountry'>" + data[5].country + "</div>")
        d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>7.</p></div><div class='worldRankCountry'>" + data[6].country + "</div>")
        d3.select('#worldRankItem8').html("<div class='w3-container worldRankItemRank'><p>8.</p></div><div class='worldRankCountry'>" + data[7].country + "</div>")
        d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>9.</p></div><div class='worldRankCountry'>" + data[8].country + "</div>")
        d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>10.</p></div><div class='worldRankCountry'>" + data[9].country + "</div>")
        d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>11.</p></div><div class='worldRankCountry'>" + data[10].country + "</div>")
      } else if (obj[1].rank == data.length) {
        d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
        d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
        d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
        d3.select('#worldRankItem4').html("<div class='w3-container worldRankItemRank'><p>4.</p></div><div class='worldRankCountry'>" + data[3].country + "</div>")
        d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>5.</p></div><div class='worldRankCountry'>" + data[4].country + "</div>")
        d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>6.</p></div><div class='worldRankCountry'>" + data[5].country + "</div>")
        d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>7.</p></div><div class='worldRankCountry'>" + data[6].country + "</div>")
        d3.select('#worldRankItem8').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
        d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 2) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 3].country + "</div>")
        d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 2].country + "</div>")
        d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 1].country + "</div>")
      } else {
        d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
        d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
        d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
        d3.select('#worldRankItem4').html("<div class='w3-container worldRankItemRank'><p>4.</p></div><div class='worldRankCountry'>" + data[3].country + "</div>")
        d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>5.</p></div><div class='worldRankCountry'>" + data[4].country + "</div>")
        d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>6.</p></div><div class='worldRankCountry'>" + data[5].country + "</div>")
        d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>7.</p></div><div class='worldRankCountry'>" + data[6].country + "</div>")
        d3.select('#worldRankItem8').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
        d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 2].country + "</div>")
        d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 1].country + "</div>")
        d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank].country + "</div>")
      }
    } else if (obj[1].rank == data.length) {
      d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
      d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
      d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
      d3.select('#worldRankItem4').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
      d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 2].country + "</div>")
      d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 1].country + "</div>")
      d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank].country + "</div>")
      d3.select('#worldRankItem8').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
      d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 2) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 3].country + "</div>")
      d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 2].country + "</div>")
      d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 1].country + "</div>")
    } else {
      d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
      d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
      d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
      d3.select('#worldRankItem4').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
      d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 2].country + "</div>")
      d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 1].country + "</div>")
      d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank].country + "</div>")
      d3.select('#worldRankItem8').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
      d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 2].country + "</div>")
      d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank - 1].country + "</div>")
      d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[1].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[1].rank].country + "</div>")
    }
  } else {
    d3.select('#worldRankItem1').html("<div class='w3-container worldRankItemRank'><p>1.</p></div><div class='worldRankCountry'>" + data[0].country + "</div>")
    d3.select('#worldRankItem2').html("<div class='w3-container worldRankItemRank'><p>2.</p></div><div class='worldRankCountry'>" + data[1].country + "</div>")
    d3.select('#worldRankItem3').html("<div class='w3-container worldRankItemRank'><p>3.</p></div><div class='worldRankCountry'>" + data[2].country + "</div>")
    d3.select('#worldRankItem4').html("<div class='worldRankCountry' style='width: 100%'>...</div>")
    d3.select('#worldRankItem5').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank - 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 2].country + "</div>")
    d3.select('#worldRankItem6').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank - 1].country + "</div>")
    d3.select('#worldRankItem7').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 1) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank].country + "</div>")
    d3.select('#worldRankItem8').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 2) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 1].country + "</div>")
    d3.select('#worldRankItem9').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 3) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 2].country + "</div>")
    d3.select('#worldRankItem10').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 4) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 3].country + "</div>")
    d3.select('#worldRankItem11').html("<div class='w3-container worldRankItemRank'><p>" + (obj[0].rank + 5) + ".</p></div><div class='worldRankCountry'>" + data[obj[0].rank + 4].country + "</div>")
  }

  divs = [d3.select('#worldRankItem1'), d3.select('#worldRankItem2'), d3.select('#worldRankItem3'),
    d3.select('#worldRankItem4'), d3.select('#worldRankItem5'), d3.select('#worldRankItem6'),
    d3.select('#worldRankItem7'), d3.select('#worldRankItem8'), d3.select('#worldRankItem9'),
    d3.select('#worldRankItem10'), d3.select('#worldRankItem11')]


  divs.forEach(div => {
    if (obj.length == 2 && div.select('.worldRankCountry')._groups[0][0].innerText == filteredCountriesName.rightCountry) {
      div.style('background-color', 'rgba(50, 142, 199, 0.4)')
    } else if (div.select('.worldRankCountry')._groups[0][0].innerText == filteredCountriesName.leftCountry) {
      div.style('background-color', 'rgba(95, 51, 176, 0.4)')
    } else {
      div.style('background-color', 'transparent')
    }

    div.on('click', () => {
      d3.selectAll('path.country').filter(country => country.properties.name == div.select('.worldRankCountry')._groups[0][0].innerText).dispatch('click')
    })
    .on('contextmenu', (e) => {
      e.preventDefault()
      d3.selectAll('path.country').filter(country => country.properties.name == div.select('.worldRankCountry')._groups[0][0].innerText).dispatch('contextmenu')
    })
  })

  d3.select('#worldRankFilter').text(getChartTitle(filterClicked))
}
