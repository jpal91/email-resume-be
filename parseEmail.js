import { simpleParser } from "mailparser";
import { promises as fs } from "fs";
import path from "path";

const emailPath = path.join(process.cwd(), 'dev-assets', 'emailMime2')
const dest = path.join(process.cwd(), 'dev-assets', 'email3.json')

const readFile = await fs.readFile(emailPath).then((res) => res)
const parse = await simpleParser(readFile)
const json = JSON.stringify(parse)
await fs.writeFile(dest, json)
// console.log(parse)