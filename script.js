document.getElementById("calcular").addEventListener("click", () => {
    const faixaInicial = document.getElementById("faixa-inicial").value.toUpperCase();
    const faixaFinal = document.getElementById("faixa-final").value.toUpperCase();
    const resultados = document.getElementById("resultados");
    const faixaInicialDisplay = document.getElementById("faixa-inicial-display");
    const faixaFinalDisplay = document.getElementById("faixa-final-display");
    const totalEtiquetasDisplay = document.getElementById("total-etiquetas");

    if (!faixaInicial || !faixaFinal) {
        alert("Por favor, preencha ambas as faixas.");
        return;
    }

    const prefixo = faixaInicial.slice(0, 2);
    const sufixo = faixaInicial.slice(-2);
    const numInicial = parseInt(faixaInicial.slice(2, -2));
    const numFinal = parseInt(faixaFinal.slice(2, -2));

    if (isNaN(numInicial) || isNaN(numFinal) || prefixo !== faixaFinal.slice(0, 2) || sufixo !== faixaFinal.slice(-2)) {
        alert("As faixas devem ter o mesmo formato e prefixos/sufixos.");
        return;
    }

    const calcularDigito = (numero) => {
        const fatores = [8, 6, 4, 2, 3, 5, 9, 7];
        const numStr = numero.toString().padStart(8, '0');
        let soma = 0;

        for (let i = 0; i < fatores.length; i++) {
            soma += parseInt(numStr[i]) * fatores[i];
        }

        const resto = soma % 11;
        if (resto === 0) return 5;
        if (resto === 1) return 0;
        return 11 - resto;
    };

    const gerarEtiqueta = (numero) => {
        const digito = calcularDigito(numero);
        return `${prefixo}${numero.toString().padStart(8, '0')}<span class="highlight">${digito}</span>${sufixo}`;
    };

    let resultado = "";
    let totalEtiquetas = 0;

    for (let i = numInicial; i <= numFinal; i++) {
        const digito = calcularDigito(i);
        resultado += `${prefixo}${i.toString().padStart(8, '0')}${digito}${sufixo}\n`;
        totalEtiquetas++;
    }

    const etiquetaInicial = gerarEtiqueta(numInicial);
    const etiquetaFinal = gerarEtiqueta(numFinal);

    resultados.value = resultado;
    faixaInicialDisplay.innerHTML = etiquetaInicial;
    faixaFinalDisplay.innerHTML = etiquetaFinal;
    totalEtiquetasDisplay.textContent = totalEtiquetas;
});
