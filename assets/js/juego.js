
(() => {
    'use strict'

    let deck       = [];
    const tipos    = ['C','D','H','S'],
          specials = ['A','J','Q','K'];

    // Referencias del HTML
    const btnPedir      = document.querySelector('#btnPed'),
          btnDetener    = document.querySelector('#btnDet'),
          btnNuevo      = document.querySelector('#btnNue');

    let pointsUser     = 0,
        pointsComputer = 0;

    const divCartasJugador     = document.querySelector('#cartas-jugador'),
          divCartasComputadora = document.querySelector('#cartas-computadora'),
          puntosHTML           = document.querySelectorAll('small');

    // Esta funcion me permite crear cartas
    const crearDeck = () => {

        deck = [];
        for(let i =2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo );
            }
        }

        for(let tipo of tipos) {
            for(let special of specials){
                deck.push( special + tipo );
            }
        } 
        return _.shuffle( deck );
    }

    crearDeck();

    // Esta funcion me permite tomar una carta
    const pedirDeck = () => {
        
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        
        return deck.pop();;
    }

    // Esta funcion toma el valor de la carta
    const valueDeck = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10 
                : valor * 1;
    }

    // Turno de la computadora
    const turnoComputer = ( pointsMin ) => {

        do{
            const carta     = pedirDeck();
            pointsComputer  = pointsComputer + valueDeck( carta );
            puntosHTML[1].innerHTML = pointsComputer; 
        
            const imgDeck   = document.createElement('img');
            imgDeck.src     =  `assets/cartas/${ carta }.png`;
            imgDeck.classList.add('w-32');
            divCartasComputadora.append( imgDeck );

        } while( (pointsComputer < pointsMin) && (pointsMin <= 21) ); 
    
        setTimeout(() => {
            if(pointsComputer === pointsMin){
                alert('Nadie gana');
            }
            else if(pointsMin > 21){
                alert('Computadora Gana!!');
            }
            else if(pointsComputer > 21){
                alert('Jugador Gana!!');
            }
            else{
                alert('Computadora Gana!!');
            }

        }, 100);

    }

    // Esta funcion desactiva los botones
    const botonesDesactivados = () => {
        btnPedir.disabled     = true;
        btnDetener.disabled   = true;
    }

      // Esta funcion activa los botones
    const botonesActivados  = () => {
        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

    //  Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirDeck();
        pointsUser  = pointsUser + valueDeck( carta );
        puntosHTML[0].innerHTML = pointsUser; 

        const imgDeck   = document.createElement('img');
        imgDeck.src     =  `assets/cartas/${ carta }.png`;
        imgDeck.classList.add('w-32');
        divCartasJugador.append( imgDeck );

        if( pointsUser > 21 ){
            console.warn('Perdiste');
            botonesDesactivados();
            turnoComputer( pointsUser );
        } 
        else if( pointsUser === 21){
            console.warn('21, Genial');
            botonesDesactivados();
            turnoComputer( pointsUser );
        }

    });

    btnDetener.addEventListener('click', () => {
        botonesDesactivados();
        turnoComputer( pointsUser );
    });

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        pointsUser     = 0;
        pointsComputer = 0;
        
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML     = '';
        botonesActivados();

    });

}) ();





