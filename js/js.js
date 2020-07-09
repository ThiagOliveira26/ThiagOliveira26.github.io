//expandir imagem ao passar o mouse.
function Expandir(elemento){
    var aux = document.getElementById("imgEscolha");
    switch (elemento.id){
            case "img1":
                aux.setAttribute('style','grid-template-columns: 2fr 1fr 1fr;');
                break;
            case "img2":
                aux.setAttribute('style','grid-template-columns: 1fr 2fr 1fr;');
                break;
            case "img3":
                    aux.setAttribute('style','grid-template-columns: 1fr 1fr 2fr;');
    }
}

//recuar imagem ao sair o mouse.
function Recuar (){
    var aux = document.getElementById("imgEscolha");
    aux.setAttribute('style','grid-template-columns: 1fr 1fr 1fr;');
}
