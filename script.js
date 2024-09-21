let pmfChart, cdfChart; // Variáveis para armazenar os gráficos e destruí-los depois

// Função para calcular a função de massa de probabilidade (PMF)
function borelPMF(lambda, n) {
  const factorial = (x) => (x <= 1 ? 1 : x * factorial(x - 1));
  const eLambdaN = Math.exp(-lambda * n);
  const lambdaNPower = Math.pow(lambda * n, n - 1);
  const denominator = factorial(n);

  return (eLambdaN * lambdaNPower) / denominator;
}

// Função para calcular a função de distribuição acumulada (CDF)
function borelCDF(lambda, nMax) {
  let cumulative = 0;
  const cdfArray = [];

  for (let n = 1; n <= nMax; n++) {
    cumulative += borelPMF(lambda, n);
    cdfArray.push(cumulative);
  }
  return cdfArray;
}

// Função para destruir os gráficos existentes
function destroyCharts() {
  if (pmfChart) {
    pmfChart.destroy();
  }
  if (cdfChart) {
    cdfChart.destroy();
  }
}

// Função principal para calcular e plotar os gráficos
function calculateBorel() {
  const lambda = parseFloat(document.getElementById('lambda').value);
  const nMax = parseInt(document.getElementById('nMax').value);

  // Calcula a PMF e CDF
  const pmfData = [];
  const cdfData = borelCDF(lambda, nMax);

  for (let n = 1; n <= nMax; n++) {
    pmfData.push(borelPMF(lambda, n));
  }

  // Destruir os gráficos existentes antes de criar novos
  destroyCharts();

  // Plotar PMF
  const pmfChartCtx = document.getElementById('pmfChart').getContext('2d');
  pmfChart = new Chart(pmfChartCtx, {
    type: 'bar',
    data: {
      labels: Array.from({ length: nMax }, (_, i) => i + 1),
      datasets: [
        {
          label: 'PMF (Função de Massa de Probabilidade)',
          data: pmfData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true },
        x: { title: { display: true, text: 'Número de eventos (n)' } }
      }
    }
  });

  // Plotar CDF
  const cdfChartCtx = document.getElementById('cdfChart').getContext('2d');
  cdfChart = new Chart(cdfChartCtx, {
    type: 'line',
    data: {
      labels: Array.from({ length: nMax }, (_, i) => i + 1),
      datasets: [
        {
          label: 'CDF (Função de Distribuição Acumulada)',
          data: cdfData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true
        }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true },
        x: { title: { display: true, text: 'Número de eventos (n)' } }
      }
    }
  });
}
