export const jokes = [
'¿Por qué el libro de matemáticas está triste? Porque tiene demasiados problemas.',
'¿Por qué fue el queso al hospital? Para ser un queso curado.',
'¿Qué le dice una impresora a otra? Esa hoja es tuya o es una impresion mia.',
'¿Cómo se llama un boomerang que no vuelve? Palo.',
'¿Qué le dice un techo a otro? Techo de menos.',
'¿Por qué la escoba llega tarde al trabajo? Porque se quedo barriendo.',
'¿Cual es el colmo de Aladin? Tener mal genio.',
'¿Qué hace una abeja en el gimnasio? Zum-ba.',
'¿Cómo se despiden los quimicos? Ácido un placer.',
'¿Qué hace un pez? Nada.',
'¿Qué le dijo una pared a la otra? Nos vemos en la esquina.',
'¿Cual es el animal mas antiguo? La cebra, porque esta en blanco y negro.',
'¿Por qué las focas miran siempre hacia arriba? Porque ahi estan los focos.',
'¿Qué le dice un techo a otro? Techo de menos.',
'¿Qué hace un perro con un taladro? Taladrando.',
'¿Qué le dice un semáforo a otro? No me mires que me estoy cambiando.',
'¿Qué hace una vaca cuando sale el sol? Sombra.',
'¿Cómo se llama un boomerang que no vuelve? Palo.',
'¿Qué le dice un gusano a otro? Voy a dar una vuelta a la manzana.',
'¿Qué hace un tomate en una carretera? Ketchup.',
'¿Cuál es el colmo de un jardinero? Que siempre lo dejen plantado.',
'¿Por qué el pollo cruzó la carretera? Para llegar al otro lado.',
'¿Qué hace un burro leyendo? Mejorando.',
'¿Qué hace una serpiente en una biblioteca? Sisea.',
'¿Por qué la luna va al gimnasio? Para cambiar de fase.',
'¿Qué hace una escoba corriendo? Barrer récords.',
'¿Qué hace una galleta en el hospital? Está hecha polvo.',
'¿Qué hace un pez con una calculadora? Nada, porque no sabe sumar.',
'¿Qué hace un mosquito con una guitarra? Música ligera.',
'¿Qué hace un tiburón con un megáfono? Da miedo amplificado.',
'¿Qué hace un murciélago con un móvil? Llamadas nocturnas.',
'¿Por qué el reloj se fue a terapia? Porque tenía tiempo de sobra.',
'¿Qué hace el fuego en una fiesta? Enciende el ambiente.',
'¿Qué hace una botella triste? Se siente vacía.',
'¿Por qué la foto fue a la cárcel? Por revelarse.',
'¿Qué hace una tortuga corriendo? Lo intenta.',
'¿Por qué el aire no discute? Porque pasa.',
'¿Qué hace una piedra aburrida? Nada.',
'¿Qué hace un mecánico limpio? Raro.',
'¿Cuál es el último animal que subió al Arca de Noé? El del-fin.',
'¿Qué hace un perro con un taladro? Taladrando.',
'¿Qué hace una vaca mirando las estrellas? ¡La Vía Láctea!',
'¿Qué le dice un huevo a una sartén? ¡Me tienes frito!',
'¿Qué le dice un pato a otro? Estamos empatados.',
'¿Cuál es el café más peligroso? El expreso',
'¿Qué le dice un cero a un ocho? ¡Qué cinturón más chulo!',
];

export function getRandomJoke(exclude?: string): string {
  const candidates = exclude ? jokes.filter((joke) => joke !== exclude) : jokes;
  if (candidates.length === 0) {
    return jokes[0];
  }
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getJokesSequence(count: number): string[] {
  if (count <= 0) return [];

  let deck = shuffle(jokes);
  const sequence: string[] = [];

  while (sequence.length < count) {
    if (deck.length === 0) {
      deck = shuffle(jokes);
    }

    const next = deck.shift()!;

    if (sequence.length > 0 && next === sequence[sequence.length - 1]) {
      // Avoid repeating the same joke back-to-back when decks wrap.
      deck.push(next);
      continue;
    }

    sequence.push(next);
  }

  return sequence;
}
