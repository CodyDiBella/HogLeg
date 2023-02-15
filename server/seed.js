const db = require('./db/db');
const { Campus, Student } = require('./db/models');

const campuses = [
  {
    name: 'Gryffindor',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F2pqi0nkvKuzEaa3E7Zvy3z%2Fd6be33d28c462d9e7a3ada9978ab91dc%2FGryffindor_House_Pride_Collections.svg&w=768&q=75'
  },
  {
    name: 'Slytherin',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F2hc0ybmCjDUBRqNgZIMtgU%2F8f4a5cec029262ebbf51641ff2436f19%2FSlytherin_House_Pride_Collection_V2.svg&w=768&q=75'
  },
  {
    name: 'Ravenclaw',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F4J9d6OwnbCgHYbb1SJEB3e%2Fe30f461a050996d552291f11aac100f6%2FRavenclaw_Pride_Collection_Symbol.svg&w=768&q=75'
  },
  {
    name: 'Hufflepuff',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F4osKNxztknHP1KoQbVDAoS%2F768390db4a6cddc624f0afb4c82f8641%2FHufflepuff_House_Pride_Collection_Symbol.svg&w=768&q=75'
  }
];

const students = [
  {
    firstName: 'Cody',
    lastName: 'DiBella',
    campusId: 2
  },
  {
    firstName: 'Amit',
    lastName: 'Thakkar',
    campusId: 3
  },
  {
    firstName: 'Everett',
    lastName: 'Clopton',
    campusId: 3
  },
  {
    firstName: 'Ominis',
    lastName: 'Gaunt',
    campusId: 2
  },
  {
    firstName: 'Natsai',
    lastName: 'Onai',
    campusId: 1
  },
  {
    firstName: 'Lucan',
    lastName: 'Brattleby',
    campusId: 1
  },
  {
    firstName: 'Mahendra',
    lastName: 'Pehlwaan',
    campusId: 3
  },
  {
    firstName: 'Nellie',
    lastName: 'Oggspire',
    campusId: 1
  },
  {
    firstName: 'Poppy',
    lastName: 'Sweeting',
    campusId: 4
  },
  {
    firstName: 'Sebastian',
    lastName: 'Sallow',
    campusId: 2
  },
  {
    firstName: 'Zenobia',
    lastName: 'Noke',
    campusId: 1
  },
  {
    firstName: 'Matilda',
    lastName: 'Weasley',
    campusId: 1
  },
  {
    firstName: 'Satyavati',
    lastName: 'Shah',
    campusId: 3
  },
  {
    firstName: 'Mariabel',
    lastName: 'Garlick',
    campusId: 4
  },
  {
    firstName: 'Eleazar',
    lastName: 'Fig',
    campusId: 1
  },
  {
    firstName: 'Dinah',
    lastName: 'Hecat',
    campusId: 3
  },
  {
    firstName: 'Aesop',
    lastName: 'Sharp',
    campusId: 2
  },
  {
    firstName: 'Abraham',
    lastName: 'Ronen',
    campusId: 2
  },
  {
    firstName: 'Phineas',
    lastName: 'Black',
    campusId: 2
  }
];

const seed = async () => {
  await db.sync({ force: true });

  const createdCampuses = await Campus.bulkCreate(campuses, {
    returning: true,
  });

  const createdStudents = await Student.bulkCreate(
    students,
    { returning: true }
);


  console.log(`Seeded ${createdCampuses.length} campuses and ${createdStudents.length} students.`);
};

seed()
  .then(() => {
    console.log('Seeding successful!');
    db.close();
  })
  .catch((err) => {
    console.error('Error while seeding');
    console.error(err.stack);
    db.close();
  });