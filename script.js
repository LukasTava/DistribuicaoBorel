// Função para calcular a PMF da Distribuição de Borel
function borelPMF(k, lambda) {
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    return ((lambda * k) ** (k - 1) * Math.exp(-lambda * k)) / factorial(k);
}

// Função para calcular a CDF (soma cumulativa da PMF)
function borelCDF(pmfArray) {
    let cdf = [];
    let sum = 0;
    for (let i = 0; i < pmfArray.length; i++) {
        sum += pmfArray[i];
        cdf.push(sum);
    }
    return cdf;
}

// Função para atualizar os gráficos
function updateChart(chart, data, labels) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Função para calcular e exibir os gráficos
function calculateBorel() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const maxK = parseInt(document.getElementById('maxK').value);

    let kValues = [];
    let pmfValues = [];

    // Calcula os valores da PMF
    for (let k = 1; k <= maxK; k++) {
        kValues.push(k);
        pmfValues.push(borelPMF(k, lambda));
    }

    // Calcula os valores da CDF
    let cdfValues = borelCDF(pmfValues);

    // Atualiza os gráficos
    updateChart(pmfChart, pmfValues, kValues);
    updateChart(cdfChart, cdfValues, kValues);
}

const pmfCtx = document.getElementById('pmfChart').getContext('2d');
const cdfCtx = document.getElementById('cdfChart').getContext('2d');

const pmfChart = new Chart(pmfCtx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'PMF (P(X = k))',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Número de tentativas (k)' }},
            y: { title: { display: true, text: 'P(X = k)' }}
        }
    }
});

const cdfChart = new Chart(cdfCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CDF (P(X ≤ k))',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Número de tentativas (k)' }},
            y: { title: { display: true, text: 'P(X ≤ k)' }}
        }
    }
});
