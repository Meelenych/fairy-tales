const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fairy-tales.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fairy_tales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    country TEXT,
    year INTEGER,
    clicks INTEGER DEFAULT 0,
    hidden BOOLEAN DEFAULT 0
  )`);

  // Insert some sample fairy tales
  const tales = [
    {
      title: 'Cinderella',
      author: 'Charles Perrault',
      country: 'France',
      year: 1697,
      clicks: 0,
      hidden: 0,
      content: `Once upon a time, there was a kind girl named Cinderella. She lived with her cruel stepmother and stepsisters who made her do all the chores.

One day, the prince invited all the young ladies to a ball. Cinderella wanted to go, but her stepmother wouldn't let her.

A fairy godmother appeared and gave Cinderella a beautiful dress, glass slippers, and a carriage made from a pumpkin. She warned Cinderella to be home by midnight.

At the ball, Cinderella danced with the prince. When the clock struck midnight, she ran away, leaving one glass slipper.

The prince searched for the owner of the slipper. When he found Cinderella, they married and lived happily ever after.`
    },
    {
      title: 'Snow White',
      author: 'Brothers Grimm',
      country: 'Germany',
      year: 1812,
      clicks: 0,
      hidden: 0,
      content: `Snow White was a beautiful princess with skin as white as snow. Her stepmother, the queen, was jealous and ordered a huntsman to kill her.

The huntsman let Snow White escape into the forest. She found a cottage where seven dwarfs lived and they took her in.

The queen discovered Snow White was alive and tried to poison her with an apple. Snow White ate the apple and fell into a deep sleep.

A prince found her and kissed her. She woke up, and they married. The queen was punished for her wickedness.`
    },
    {
      title: 'Little Red Riding Hood',
      author: 'Charles Perrault',
      country: 'France',
      year: 1697,
      clicks: 0,
      hidden: 0,
      content: `Little Red Riding Hood was sent by her mother to take food to her sick grandmother.

On the way, she met a wolf who tricked her into telling him where her grandmother lived.

The wolf went to the grandmother's house, ate her, and disguised himself as the grandmother.

When Little Red arrived, the wolf ate her too. But a woodsman heard the noise, killed the wolf, and rescued them.

Little Red learned to be more careful and never talk to strangers.`
    },
    {
      title: 'The Frog Princess',
      author: 'Traditional',
      country: 'Ukraine',
      year: null,
      clicks: 0,
      hidden: 0,
      content: `Once upon a time, there was a king with three sons. He wanted them to marry, so he shot three arrows in different directions. Each arrow would point to the bride for each son.

The youngest son's arrow landed in a swamp where a frog caught it. The frog told the prince that she was his destined bride.

The prince took the frog home, and his brothers laughed at him. But the frog proved herself by completing impossible tasks.

First, she wove a beautiful carpet in one night. Then she baked bread that could feed an army. Finally, she danced at the ball in a magnificent gown.

When the frog danced, she transformed into a beautiful princess. The evil witch had cursed her, and only true love could break the spell.

The youngest prince married the princess, and they lived happily ever after.`
    }
  ];

  const stmt = db.prepare('INSERT OR IGNORE INTO fairy_tales (title, author, country, year, clicks, hidden, content) VALUES (?, ?, ?, ?, ?, ?, ?)');

  tales.forEach(tale => {
    stmt.run(tale.title, tale.author, tale.country, tale.year, tale.clicks, tale.hidden, tale.content);
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