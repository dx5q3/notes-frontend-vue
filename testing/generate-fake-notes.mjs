import { faker } from '@faker-js/faker';
import * as fs from 'fs';

let notes = [];

for (let i = 0; i < 20; i++) {
    let note = {
        id: i.toString(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        author: "john_doe",
        title: faker.lorem.lines(),
        text: faker.lorem.paragraphs(5)

    };
    notes.push(note);
}

fs.writeFileSync('./testing/notes.json', JSON.stringify({ notes: notes }));
