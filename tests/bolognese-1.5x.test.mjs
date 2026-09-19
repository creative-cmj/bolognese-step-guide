import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  '16 servings',
  '4 lb total meat',
  '2 lb','80/20 ground beef',
  '2 lb','Italian sausage',
  "['4 medium','onions'",
  "['4','carrots'",
  "['8 cloves','garlic'",
  "['4 tbsp','tomato paste'",
  "['56 oz (two 28 oz cans)','crushed tomatoes'",
  "['2 cups','red wine'",
  "['2 cups','milk'",
  "['4 tsp','Italian seasoning'",
  "['1–2 tsp','kosher salt'",
  "['48–64 oz','pasta'",
  '10–12 qt',
  '2 lb ground beef and 2 lb Italian sausage',
  '56 oz crushed tomatoes and 2 cups milk',
  '48–64 oz pasta'
];
for (const marker of required) assert.ok(page.includes(marker), `missing 2x marker: ${marker}`);
for (const stale of ['<strong>12 servings</strong>', '<span class="chip">3 lb total meat</span>', "['1½ lb','80/20 ground beef']", "['1½ lb','Italian sausage'", "['3 medium','onions'", "['3','carrots'", "['6 cloves','garlic'", "['3 tbsp','tomato paste']", "['42 oz (one 28 oz + one 14–15 oz can)','crushed tomatoes']", "['1½ cups','red wine']", "['1½ cups','milk']", "['36–48 oz','pasta']"]) assert.ok(!page.includes(stale), `stale 1.5x marker remains: ${stale}`);
const ingredientsBlock = page.match(/const ingredients=\[([\s\S]*?)\n\];/);
assert.ok(ingredientsBlock, 'ingredient data must exist');
const ingredientRows = (ingredientsBlock[1].match(/\['/g) || []).length;
assert.equal(ingredientRows, 14, 'checklist data should have 14 items');
assert.ok(page.includes('ingredients.map(([amount,name,note],i)=>`<label class="ingredient"><input type="checkbox"'), 'each ingredient must render as a checklist control');
console.log('bolognese 2x content: PASS');
