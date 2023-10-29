var cidade = document.querySelector("#cidade");
var btn = document.querySelector("#btn");
var resp = document.querySelector("#resp");
var temperatura = document.querySelector("#temperatura");
var temepraturaMax = document.querySelector("#temperaturaMax");
var temepraturaMin = document.querySelector("#temperaturaMin");
var img = document.querySelector("#img");
var nascimentoSol = document.querySelector("#nascimentoSol");
var porSol = document.querySelector("#porSol");
var descricao = document.querySelector("#descricao");
var velocidade = document.querySelector("#velocidade");
var escalaTemperatura = document.querySelector('#escalaTemperatura');
var req = new XMLHttpRequest();

cidade.addEventListener("keypress", function(event) {
    
    if (event.keyCode === 13) {
        event.preventDefault();
        consulta();
    }
});

function consulta(){
    var URL = 'https://api.openweathermap.org/data/2.5/weather?q='+ cidade.value + '&appid=3d153a186c6d625fc17f1c820c1248f2&lang=pt_br&units=' + escalaTemperatura.value;
    console.log(escalaTemperatura.value);
    
    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);

        if( resp_obj['cod'] == "404" || resp_obj['cod'] == "400"){
            alert("O nome fornecido não corresponde a nenhuma cidade!");
        }else{
            document.getElementById('widget').style.display = 'block';
            temperatura.innerHTML = resp_obj['main']['temp'];
            temepraturaMax.innerHTML = resp_obj['main']['temp_max'];
            temepraturaMin.innerHTML = resp_obj['main']['temp_min'];

            const temp = Math.trunc(resp_obj['main']['temp']);
            console.log(temp)

            tempConvert(temp,escalaTemperatura.value);


            var icon = resp_obj['weather'][0]['icon'];
            var URL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            img.src = URL;

            nascimentoSol.innerHTML = dateFormat(resp_obj['sys']['sunrise']);
            porSol.innerHTML = dateFormat(resp_obj['sys']['sunset']);

            console.log(resp_obj['weather'][0]['description'])
            descricao.innerHTML= resp_obj['weather'][0]['description'];
            
            velocidade.innerHTML = resp_obj['wind']['speed'];

        }
    }

    req.open('GET', URL);
    req.send(null);
}

function dateFormat(hora){
    var date = new Date(hora * 1000);
    var hora = date.getHours();
    var minutos = date.getMinutes();
    var tempoFormatado = hora.toString().padStart(2,'0') + ":" + minutos.toString().padStart(2,'0');
    return tempoFormatado;
}

function tempConvert(temp, escala){
    if(escala === "metric"){
        if(Math.trunc(temp) > 20){
            document.getElementById('widget').className = 'hotwidget';
            document.getElementById('body').className = 'hotbody';
        }else if(Math.trunc(temp) <= 20){
            document.getElementById('widget').className = 'widget';
            document.getElementById('body').className = 'body';
        }
    } else if(escala === "imperial"){
        if(Math.trunc(temp) > 68){
            document.getElementById('widget').className = 'hotwidget';
            document.getElementById('body').className = 'hotbody';
        }else if(Math.trunc(temp) <= 68){
            document.getElementById('widget').className = 'widget';
            document.getElementById('body').className = 'body';
        }
    }else if(escala === "standard"){
        if(Math.trunc(temp) > 293){
            document.getElementById('widget').className = 'hotwidget';
            document.getElementById('body').className = 'hotbody';
        }else if(Math.trunc(temp) <= 293){
            document.getElementById('widget').className = 'widget';
            document.getElementById('body').className = 'body';
        }
    }
    
}

