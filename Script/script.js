const baseUrl = 'http://data.fixer.io/api/latest?access_key=ce59eccb86605d53b0394fd1a6a6b196&symbols=';
const ratesUrl = 'http://data.fixer.io/api/symbols?access_key=ce59eccb86605d53b0394fd1a6a6b196';
allRates();

const btn = document.getElementById('calc');
const from = document.getElementById('from');
const to = document.getElementById('to');
const sum = document.getElementById('sum');
const p = document.getElementById('p');
const curFrom = from.value;
const curTo = to.value;

function allRates() {
    fetch(`${ratesUrl}`)
        .then(response =>{
            if (response.ok){
                return response.json();
            }else{
                throw new Error('' + response.status);
            }
        })
        .then(value => {
            for (let s in value.symbols){
                const optFrom = document.createElement('option');
                const optTo = document.createElement('option');
                optFrom.append(document.createTextNode(s));
                optTo.append(document.createTextNode(s));
                from.append(optFrom);
                to.append(optTo);
            }
        });
}

btn.onclick = function () {
    while(p.firstChild){
        p.removeChild(p.firstChild);
    }
    const curFrom = from.value.trim().toUpperCase();
    const curTo = to.value.trim().toUpperCase();
    fetch(`${baseUrl}${curFrom},${curTo}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error('' + response.status);
            }
        })
        .then(rate => {
            const rateIn = rate.rates[curFrom];
            const rateOut = rate.rates[curTo];
            const amount = sum.value;
            const res = new Intl.NumberFormat().format((amount/rateIn) * rateOut);
            p.append(document.createTextNode(`${amount} ${curFrom} = ${res} ${curTo}`));
        })
        .catch(e => alert(e.message));
}
