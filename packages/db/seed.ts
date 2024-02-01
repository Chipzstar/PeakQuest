import { v4 as uuidv4 } from "uuid";
import { db } from "./src/index"
import { prompt, character } from "./src/schema/quest";
import { prompts } from "./src/seed-data"



async function seed() {


    const insertedPrompts: any = await db
        .insert(prompt)
        .values(prompts)
        .returning()
        .all();

    console.log("Inserted ", insertedPrompts.length, " prompts!");




    process.exit(0);
}

seed();