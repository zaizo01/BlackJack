(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"],r=document.querySelector("#btnPed"),a=document.querySelector("#btnDet"),o=document.querySelector("#btnNue");let s=0,c=0;const l=document.querySelector("#cartas-jugador"),d=document.querySelector("#cartas-computadora"),i=document.querySelectorAll("small"),u=()=>{e=[];for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);for(let r of t)for(let t of n)e.push(t+r);return _.shuffle(e)};u();const m=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},p=e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},f=e=>{do{const e=m();c+=p(e),i[1].innerHTML=c;const t=document.createElement("img");t.src=`assets/cartas/${e}.png`,t.classList.add("w-32"),d.append(t)}while(c<e&&e<=21);setTimeout(()=>{c===e?alert("Nadie gana"):e>21?alert("Computadora Gana!!"):c>21?alert("Jugador Gana!!"):alert("Computadora Gana!!")},100)},g=()=>{r.disabled=!0,a.disabled=!0};r.addEventListener("click",()=>{const e=m();s+=p(e),i[0].innerHTML=s;const t=document.createElement("img");t.src=`assets/cartas/${e}.png`,t.classList.add("w-32"),l.append(t),s>21?(console.warn("Perdiste"),g(),f(s)):21===s&&(console.warn("21, Genial"),g(),f(s))}),a.addEventListener("click",()=>{g(),f(s)}),o.addEventListener("click",()=>{console.clear(),e=[],e=u(),s=0,c=0,i[0].innerText=0,i[1].innerText=0,d.innerHTML="",l.innerHTML="",r.disabled=!1,a.disabled=!1})})();