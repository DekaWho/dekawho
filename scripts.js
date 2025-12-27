
const cursor = document.getElementById("cursor");

/* Versión simple sin aceptar salto de línea*/
/* function typeWriter(element, text, speed = 50) {
  return new Promise(resolve => {
    if (!element) {
      resolve();
      return;
    }
    // Vaciar el elemento y preparar un nodo de texto
    element.textContent = "";
    const textNode = document.createTextNode("");
    element.appendChild(textNode);
    // Mover el cursor dentro del elemento, justo después del texto
    element.appendChild(cursor);
    let i = 0;
    function write() {
      if (i < text.length) {
        // Añadimos texto al nodo de texto, el cursor se mantiene detrás
        textNode.data += text.charAt(i);
        // Autoscroll
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
        i++;
        setTimeout(write, speed);
      } else {
        resolve();
      }
    }
    write();
  });
} */

function typeWriter(element, text, speed = 50) {
  return new Promise(resolve => {
    if (!element) {
      resolve();
      return;
    }
    element.innerHTML = "";
    element.appendChild(cursor);
    let content = "";
    let i = 0;

    function write() {
      if (i < text.length) {
        if (text.charAt(i) === '<') {
          const closeIndex = text.indexOf('>', i);
          if (closeIndex !== -1) {
            content += text.substring(i, closeIndex + 1);
            i = closeIndex + 1;
          }
        } else {
          content += text.charAt(i);
          i++;
        }
        element.innerHTML = content;
        element.appendChild(cursor);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
        setTimeout(write, speed);
      } else {
        resolve();
      }
    }

    write();
  });
}


async function startTypewriter() {
  const t1 = document.querySelector(".t1");
  const p1 = document.querySelector(".p1");
  const p2 = document.querySelector(".p2");
  const p3 = document.querySelector(".p3");
  const p4 = document.querySelector(".p4");
  const p5 = document.querySelector(".p5");
  const p6 = document.querySelector(".p6");
  const p7 = document.querySelector(".p7");
  const p8 = document.querySelector(".p8");
  const p9 = document.querySelector(".p9");

  await typeWriter(t1, "[experimento_1498]", 120);
  await typeWriter(p1, "Hay 5 monos en una jaula y una escalera con plátanos arriba. En cuanto un mono intenta subir les dan a todos un manguerazo de agua fría. Tras unos intentos ninguno se acerca a la escalera.", 70);
  await typeWriter(p2, "Ahora los investigadores sacan a un mono y meten otro nuevo. Este va hacia la escalera pero el resto lo frena a golpes. Van cambiando todos los monos. Ya ninguno ha sufrido el manguerazo pero siguen dando palizas al que se acerca a la escalera. Es como siempre lo han hecho.", 50);
  await typeWriter(p3, "¿Y si nosotros somos los monos?", 50);
  await typeWriter(p4, "No hablo de conspiraciones. No hay un grupo de señores gordos y forrados en una sala oscura decidiendo sobre tu vida. Pero puede ser peor que eso...", 50);
  await typeWriter(p5, "¿Crees que un título universitario te hace más válido?<br><br>¿Está mal querer más de lo que tienes?<br><br>¿Todos los ricos son malas personas?<br><br>No juzgo tus respuestas. Ni yo sé si tengo razón. Es más, no creas nada de lo que digo.", 50);
  await typeWriter(p6, "Yo solo busco las mejores preguntas. Toda la vida, desde que fui un niño preguntón. El problema es que la dopamina rápida y el scroll infinito son peor que un manguerazo de agua fría. Por eso esto no encaja en ningún feed.", 50);


  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const continueText = hasTouch ? "Toca la pantalla para verlo" : "Pulsa cualquier tecla para verlo"; //frases sin punto para que se quede el cursor esperando

  await typeWriter(p7, `La mayoría no llega hasta aquí. Tú sí, aunque te falta el último paso. ${continueText}`, 70);

  await new Promise(resolve => {
    const handler = () => {
      document.removeEventListener("keydown", handler);
      document.removeEventListener("touchstart", handler);
      resolve();
    };
    document.addEventListener("keydown", handler);
    document.addEventListener("touchstart", handler);
  });

  p7.querySelector('.cursor')?.remove(); //sin esto se quedan dos cursores en pantalla
  p7.innerHTML += ".";

  await typeWriter(p8, ". . . . . . . . ", 290);
  p8.querySelector('.cursor')?.remove();
  p9.innerHTML = "Esto sigue gratis en la intimidad de tu bandeja de entrada. Sin que un algoritmo decida por ti";
  p9.appendChild(cursor);

  document.getElementById("form").style.display = "block";
  document.getElementById("form").scrollIntoView({ behavior: "smooth", block: "center" }); //centrar la ventana

  // Si quieres que el cursor desaparezca al final:
  // cursor.style.display = "none";
}

//el DOM ya está cargado cuando se ejecuta este script por el defer
startTypewriter();

