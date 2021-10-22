generateGraph = (listOfComparisons, group1, group2, negate) => {
    const graph = {
        x: listOfComparisons.map((c) => c.phenotype),
        y: listOfComparisons.map((c) => c.coeff*negate),
        text: listOfComparisons.map((c) => `p=${c.pval}`),
        error_y: {
            type: 'data',
            array: listOfComparisons.map((c) => c.cint),
            visible: true
        },
        mode: 'markers',
        type: 'scatter',
        marker: {
            color: 'rgb(199, 206, 234)',
            size: 8
        },
        line: {
            color: 'rgb(199, 206, 234)',
            width: 1
        }
    };
    const layout = {
        title: {
            text: `${group1} vs ${group2}`,
            font: {
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
          title: {
                text: 'ICD code',
                font: {
                    size: 18,
                    color: '#7f7f7f'
                }
            },
        },
        yaxis: {
            range: [-2, 2],
            title: {
                text: 'Coefficient',
                font: {
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }
    };
    Plotly.newPlot('comparison', [graph], layout);
};

generateSelection = (value) => {
  let el = document.createElement("option");
  el.textContent = value;
  el.value = value;
  return el;
};

updateGraph = () => {
  const group1 = document.getElementById('firstGroup').value;
  const group2 = document.getElementById('secondGroup').value;
  let curData;
  let negate = 1;
  if (data.hasOwnProperty(group1) && data[group1].hasOwnProperty(group2)) {
    curData = data[group1][group2];
  }
  else if (data.hasOwnProperty(group2) && data[group2].hasOwnProperty(group1)) {
    curData = data[group2][group1];
    negate = -1;
  }
  else {
    alert('Invalid Selection');
    return;
  }
  console.log(curData);

  generateGraph(curData, group1, group2, negate);
};

window.onload = () => {
    console.log(options);
    const first = document.getElementById('firstGroup');
    const second = document.getElementById('secondGroup');
    options.forEach(option=>{
      first.appendChild(generateSelection(option));
      second.appendChild(generateSelection(option));
    })
    second.appendChild(generateSelection('All'));
};
