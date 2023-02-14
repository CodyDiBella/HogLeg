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
    lastName: 'DiBella'
  },
  {
    firstName: 'Amit',
    lastName: 'Thakkar'
  },
  {
    firstName: 'Everett',
    lastName: 'Clopton'
  },
  {
    firstName: 'Ominis',
    lastName: 'Gaunt'
  },
  {
    firstName: 'Natsai',
    lastName: 'Onai'
  },
  {
    firstName: 'Lucan',
    lastName: 'Brattleby'
  },
  {
    firstName: 'Mahendra',
    lastName: 'Pehlwaan'
  },
  {
    firstName: 'Nellie',
    lastName: 'Oggspire'
  },
  {
    firstName: 'Poppy',
    lastName: 'Sweeting'
  },
  {
    firstName: 'Sebastian',
    lastName: 'Sallow'
  },
  {
    firstName: 'Zenobia',
    lastName: 'Noke'
  },
  {
    firstName: 'Matilda',
    lastName: 'Weasley'
  },
  {
    firstName: 'Satyavati',
    lastName: 'Shah'
  },
  {
    firstName: 'Mariabel',
    lastName: 'Garlick'
  },
  {
    firstName: 'Eleazar',
    lastName: 'Fig'
  },
  {
    firstName: 'Dinah',
    lastName: 'Hecat'
  },
  {
    firstName: 'Aesop',
    lastName: 'Sharp'
  },
  {
    firstName: 'Abraham',
    lastName: 'Ronen'
  },
  {
    firstName: 'Phineas',
    lastName: 'Black'
  }
];

const seed = async () => {
  await db.sync({ force: true });

  const createdCampuses = await Campus.bulkCreate(campuses, {
    returning: true,
  });

  const createdStudents = await Student.bulkCreate(
    students.map((student) => ({
      ...student,
      campusId: createdCampuses[Math.floor(Math.random() * createdCampuses.length)].id,
    })),
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