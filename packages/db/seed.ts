import { v4 as uuidv4 } from "uuid";
import { db } from "./src/index"
import { prompt, character } from "./src/schema/quest";
import { prompts, characters } from "./src/seed-data"



async function seed() {

    for (let index = 0; index < prompts.length; index++) {
        const element = prompts[index];

        await db
            .insert(prompt)
            .values(element)
            .onConflictDoUpdate({ target: prompt.id, set: { ...element } })

    }

    console.log(`Inserted: ${prompts.length} prompts!`);



    for (let index = 0; index < characters.length; index++) {
        const element = characters[index];

        await db
            .insert(character)
            .values(element)
            .onConflictDoUpdate({ target: character.id, set: { ...element } })

    }

    console.log(`Inserted: ${characters.length} characters!`);

    process.exit(0);
}

seed();