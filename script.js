document.getElementById("USD").addEventListener("click", function(){
    fetchData("USD");
    getLastDays("USD", 30);
    document.getElementById("30days").checked = true;
    document.getElementById("texto-dias").innerHTML = '30';
});
document.getElementById("EUR").addEventListener("click", function(){
    fetchData("EUR");
    getLastDays("EUR", 30);
    document.getElementById("30days").checked = true;
    document.getElementById("texto-dias").innerHTML = '30';
});
document.getElementById("GBP").addEventListener("click", function(){
    fetchData("GBP");
    getLastDays("GBP", 30);
    document.getElementById("30days").checked = true;
    document.getElementById("texto-dias").innerHTML = '30';
});

function getCurrency(){
    var currency = document.getElementById('moedaEscolhida').innerHTML;
    if(currency == 'Dólar'){
        return 'USD'
    } else if(currency == 'Euro'){
        return 'EUR'
    } else if(currency == 'Libra'){
        return 'GBP'
    }
}


document.getElementById("30").addEventListener("click", function(){
    currency = getCurrency();
    getLastDays(currency, 30);
    document.getElementById("texto-dias").innerHTML = '30';
})
document.getElementById("60").addEventListener("click", function(){
    currency = getCurrency();
    getLastDays(currency, 60);
        document.getElementById("texto-dias").innerHTML = '60';
})
document.getElementById("90").addEventListener("click", function(){
    currency = getCurrency();
    getLastDays(currency, 90);
    document.getElementById("texto-dias").innerHTML = '90';
})



fetchData('USD');
getLastDays("USD", 30);
// var currency = getCurrency();

async function fetchData(currencyToConvert) {
    const res=await fetch ("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL");
    var data = await res.json();

    if(res.status == 200){
        if(currencyToConvert == 'EUR'){
            document.getElementById('venda').innerHTML = data['EURBRL']['ask'];
            document.getElementById('compra').innerHTML = data['EURBRL']['bid'];
            document.getElementById('porcentagem-variacao').innerHTML = data['EURBRL']['pctChange'];
            document.getElementById('variação').innerHTML = data['EURBRL']['varBid'];
            document.getElementById('moedaEscolhida').innerHTML = 'Euro';
        } else if(currencyToConvert == 'USD'){
            document.getElementById('venda').innerHTML = data['USDBRL']['ask'];
            document.getElementById('compra').innerHTML = data['USDBRL']['bid'];
            document.getElementById('porcentagem-variacao').innerHTML = data['USDBRL']['pctChange'];    
            document.getElementById('variação').innerHTML = data['USDBRL']['varBid'];
            document.getElementById('moedaEscolhida').innerHTML = 'Dólar';
        } else if(currencyToConvert = 'GBP'){ 
            document.getElementById('porcentagem-variacao').innerHTML = data['GBPBRL']['pctChange'];
            document.getElementById('venda').innerHTML = data['GBPBRL']['ask'];
            document.getElementById('compra').innerHTML = data['GBPBRL']['bid'];
            document.getElementById('variação').innerHTML = data['GBPBRL']['varBid'];
            document.getElementById('moedaEscolhida').innerHTML = 'Libra';
        }
    } else{
        return Error;
    }
}

async function getLastDays(currency, days){
    console.log(currency, days);
    ultimosValoresCompra = [];
    const res= await fetch (`https://economia.awesomeapi.com.br/json/daily/${currency}-BRL/${days-1}`);
    var data = await res.json();
    
    let valoresCompra = Object.values(data);
    valoresCompra.forEach((chave) => {
        ultimosValoresCompra.push(chave['bid']);
    });

    ultimosValoresCompra.push(document.getElementById('compra').innerHTML);
    ultimosValoresCompra.sort();
    ultimosValoresCompra.indexOf(document.getElementById('compra').innerHTML);
    document.getElementById('ranking').innerHTML = ultimosValoresCompra.indexOf(document.getElementById('compra').innerHTML)+1;
}



