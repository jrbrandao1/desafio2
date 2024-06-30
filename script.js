async function obterEndereco(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
}

async function obterPrevisao(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
    const data = await response.json();
    return data;
}

async function buscar() {
    await buscarCep()
    await buscarTemperatura()
};


async function buscarCep() {
    const cep = document.getElementById('cep').value;
    const resultado = await obterEndereco(cep);
    const tr = document.getElementById('endereco');
    tr.innerHTML = `
    <td>${resultado.logradouro}</td>
    <td>${resultado.bairro}</td> 
    <td>${resultado.uf}</td>
    `;

}


async function buscarTemperatura() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const resultado = await obterPrevisao(latitude, longitude);
    const temperatura = resultado.hourly.temperature_2m[0]
    const span = document.getElementById('temperatura')
    span.innerHTML = temperatura;
}


