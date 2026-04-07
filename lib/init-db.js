const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fairy-tales.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fairy_tales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);

  // Insert some sample fairy tales
  const tales = [
    {
      title: 'Cinderella',
      content: `Once upon a time, there was a kind girl named Cinderella. She lived with her cruel stepmother and stepsisters who made her do all the chores.

One day, the prince invited all the young ladies to a ball. Cinderella wanted to go, but her stepmother wouldn't let her.

A fairy godmother appeared and gave Cinderella a beautiful dress, glass slippers, and a carriage made from a pumpkin. She warned Cinderella to be home by midnight.

At the ball, Cinderella danced with the prince. When the clock struck midnight, she ran away, leaving one glass slipper.

The prince searched for the owner of the slipper. When he found Cinderella, they married and lived happily ever after.`
    },
    {
      title: 'Snow White',
      content: `Snow White was a beautiful princess with skin as white as snow. Her stepmother, the queen, was jealous and ordered a huntsman to kill her.

The huntsman let Snow White escape into the forest. She found a cottage where seven dwarfs lived and they took her in.

The queen discovered Snow White was alive and tried to poison her with an apple. Snow White ate the apple and fell into a deep sleep.

A prince found her and kissed her. She woke up, and they married. The queen was punished for her wickedness.`
    },
    {
      title: 'Little Red Riding Hood',
      content: `Little Red Riding Hood was sent by her mother to take food to her sick grandmother.

On the way, she met a wolf who tricked her into telling him where her grandmother lived.

The wolf went to the grandmother's house, ate her, and disguised himself as the grandmother.

When Little Red arrived, the wolf ate her too. But a woodsman heard the noise, killed the wolf, and rescued them.

Little Red learned to be more careful and never talk to strangers.`
    }
  ];

  const stmt = db.prepare('INSERT OR IGNORE INTO fairy_tales (title, content) VALUES (?, ?)');

  tales.forEach(tale => {
    stmt.run(tale.title, tale.content);
  });

  stmt.finalize();
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database initialized successfully.');
  }
});