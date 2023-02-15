const db = require('./db/db');
const { Campus, Student } = require('./db/models');

const campuses = [
  {
    name: 'Gryffindor',
    imageUrl: 'https://1000logos.net/wp-content/uploads/2021/11/Gryffindor-Logo.png'
  },
  {
    name: 'Slytherin',
    imageUrl: 'https://www.pngitem.com/pimgs/m/48-488426_harry-potter-logo-slytherin-hd-png-download.png'
  },
  {
    name: 'Ravenclaw',
    imageUrl: 'https://w7.pngwing.com/pngs/563/589/png-transparent-ravenclaw-logo-ravenclaw-house-fictional-universe-of-harry-potter-common-room-hogwarts-gryffindor-harry-potter-ravenclaw-logo-helga-hufflepuff-slytherin-house.png'
  },
  {
    name: 'Hufflepuff',
    imageUrl: 'https://toppng.com/uploads/preview/hogwarts-hufflepuff-crest-transparent-harry-potter-hufflepuff-crest-11563370957vnvzb1qcnf.png'
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