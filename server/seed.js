const db = require('./db/db');
const { Campus, Student } = require('./db/models');

const campuses = [
  {
    name: 'Gryffindor',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F2pqi0nkvKuzEaa3E7Zvy3z%2Fd6be33d28c462d9e7a3ada9978ab91dc%2FGryffindor_House_Pride_Collections.svg&w=768&q=75',
    address: 'South Wing of the castle on the east side',
    description: 'Courage. Bravery. Nerve. Chivalry'
  },
  {
    name: 'Slytherin',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F2hc0ybmCjDUBRqNgZIMtgU%2F8f4a5cec029262ebbf51641ff2436f19%2FSlytherin_House_Pride_Collection_V2.svg&w=768&q=75',
    address: 'Behind a bare stretch of stone wall in the dungeons',
    description: 'Ambition. Resourcefulness. Determination. Cleverness'
  },
  {
    name: 'Ravenclaw',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F4J9d6OwnbCgHYbb1SJEB3e%2Fe30f461a050996d552291f11aac100f6%2FRavenclaw_Pride_Collection_Symbol.svg&w=768&q=75',
    address: 'Top of a spiral staircase that started on the fifth floor',
    description: 'Cleverness. Wisdom. Wit. Intellectual Ability. Creativity'
  },
  {
    name: 'Hufflepuff',
    imageUrl: 'https://www.wizardingworld.com/_next/image?url=https%3A%2F%2F%2F%2Fimages.ctfassets.net%2Fusf1vwtuqyxm%2F4osKNxztknHP1KoQbVDAoS%2F768390db4a6cddc624f0afb4c82f8641%2FHufflepuff_House_Pride_Collection_Symbol.svg&w=768&q=75',
    address: 'In a nook on the right hand side of the kitchen corridor, concealed behind a stack of barrels',
    description: 'Justice. Loyalty. Patience. Hard Work'
  }
];

const students = [
  {
    firstName: 'Cody',
    lastName: 'DiBella',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2023/02/hogwarts-legacy-mods-facial-hair.jpg',
    campusId: 2
  },
  {
    firstName: 'Amit',
    lastName: 'Thakkar',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-amit-thakkar-550x309.jpg',
    campusId: 3
  },
  {
    firstName: 'Everett',
    lastName: 'Clopton',
    imageUrl: 'https://static.wikia.nocookie.net/harrypotter/images/f/fe/Everett_Clopton_HL.png/revision/latest?cb=20230111200634',
    campusId: 3
  },
  {
    firstName: 'Ominis',
    lastName: 'Gaunt',
    imageUrl: 'https://editors.dexerto.es/wp-content/uploads/sites/3/2023/02/13/ominis-gaunt-hogwarts-legacy-voldemort.jpg',
    campusId: 2
  },
  {
    firstName: 'Natsai',
    lastName: 'Onai',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-natsai-onai-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Lucan',
    lastName: 'Brattleby',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-lucan-brattleby-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Mahendra',
    lastName: 'Pehlwaan',
    imageUrl: 'https://static.wikia.nocookie.net/harrypotter/images/2/26/Mahendra_Pehlwaan_HL.png/revision/latest?cb=20230111191709',
    campusId: 3
  },
  {
    firstName: 'Nellie',
    lastName: 'Oggspire',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-nellie-oggspire-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Poppy',
    lastName: 'Sweeting',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-poppy-sweeting-550x309.jpg',
    campusId: 4
  },
  {
    firstName: 'Sebastian',
    lastName: 'Sallow',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/12/hogwarts-legacy-characters-sebastian-sallow-550x309.jpg',
    campusId: 2
  },
  {
    firstName: 'Zenobia',
    lastName: 'Noke',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-zenobia-noke-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Matilda',
    lastName: 'Weasley',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-Professor-Weasley-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Satyavati',
    lastName: 'Shah',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-shah-550x309.jpg',
    campusId: 3
  },
  {
    firstName: 'Mirabel',
    lastName: 'Garlick',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-garlick-550x309.jpg',
    campusId: 4
  },
  {
    firstName: 'Eleazar',
    lastName: 'Fig',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-fig-550x309.jpg',
    campusId: 1
  },
  {
    firstName: 'Dinah',
    lastName: 'Hecat',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-hecat-550x309.jpg',
    campusId: 3
  },
  {
    firstName: 'Aesop',
    lastName: 'Sharp',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-sharp-550x309.jpg',
    campusId: 2
  },
  {
    firstName: 'Abraham',
    lastName: 'Ronen',
    imageUrl: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/01/hogwarts-legacy-characters-professor-ronen-550x309.jpg',
    campusId: 2
  },
  {
    firstName: 'Phineas',
    lastName: 'Black',
    imageUrl: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA16eol8.img?m=6&q=80',
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