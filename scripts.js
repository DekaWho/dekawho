
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

  await typeWriter(t1, "[experimento_1498]", 120);
  await typeWriter(p1, "Hay 5 monos encerrados en una jaula. Una escalera en el centro con unos plátanos arriba. En cuanto un mono intenta subir la escalera los investigadores lanzan un manguerazo de agua fría a todos los monos. Si otro mono lo intenta, lo mismo. Manguerazo para todos. Al poco ya ningún mono se acerca a la escalera.", 70);
  await typeWriter(p2, "Ahora los investigadores sacan de la jaula a un mono, y meten a otro nuevo. El nuevo intenta subir la escalera pero el resto de monos lo frena a golpes. Ya no hace falta ni el agua. Cambian todos los monos de 1 en 1. Ya ninguno sufrió el manguerazo. Cuando entra otro nuevo le dan una paliza igualmente si se acerca a la escalera. \"Así es como lo hemos hecho siempre\".", 60);
  await typeWriter(p3, "¿Y si nosotros somos los monos? No hablo de conspiraciones. No hay un grupo de señores gordos y forrados en una sala oscura decidiendo qué va a ser de tu vida. Pero puede ser peor que eso...", 50);
  await typeWriter(p4, "¿Crees que un título universitario te hace más válido?<br><br>¿Crees que la estabilidad te da libertad?<br><br>¿Crees que está mal querer más de lo que tienes?<br><br>¿Crees que todos los ricos son malas personas?<br><br>No juzgo tus respuestas. Es más, no creas nada de lo que digo. Construye tus propias conclusiones.", 50);
  await typeWriter(p6, "Yo solo busco las mejores preguntas. Toda la vida, desde que fui un niño preguntón dando la turra. El problema hoy en día es que la dopamina rápida y el scroll infinito son peor que un manguerazo de agua fría. Por eso esto no encaja en ningún feed.", 50); 
  await typeWriter(p7, "Si prefieres preguntas incómodas a respuestas fáciles, este es tu sitio. Mis vídeos en redes agrietan el muro pero mis emails lo derriban. Gratis en tu bandeja de entrada.", 70);


  await new Promise(resolve => setTimeout(resolve, 1000)); // Delay de 1s

  document.getElementById("form").style.display = "block"; //mostrar el form

  // Si quieres que el cursor desaparezca al final:
  // cursor.style.display = "none";
}

//el DOM ya está cargado cuando se ejecuta este script por el defer
startTypewriter();

