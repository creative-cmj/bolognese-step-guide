import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const required = [
  '12 servings',
  '3 lb total meat',
  '1½ lb','80/20 ground beef',
  '1½ lb','Italian sausage',
  "['3 medium','onions'",
  "['3','carrots'",
  "['6 cloves','garlic'",
  "['3 tbsp','tomato paste'",
  "['42 oz (one 28 oz + one 14–15 oz can)','crushed tomatoes'",
  "['1½ cups','red wine'",
  "['1½ cups','milk'",
  "['3 tsp','Italian seasoning'",
  "['¾–1½ tsp','kosher salt'",
  "['36–48 oz','pasta'",
  '7–8 qt',
  '1½ lb ground beef and 1½ lb Italian sausage',
  '42 oz crushed tomatoes and 1½ cups milk',
  '36–48 oz pasta'
];
for (const marker of required) assert.ok(page.includes(marker), `missing scaled marker: ${marker}`);
for (const stale of ['<strong>8 servings</strong>', '<span class="chip">2 lb total meat</span>', "['1 lb','80/20 ground beef']", "['1 lb','Italian sausage'", "['2 medium','onions'", "['2','carrots'", "['4 cloves','garlic'", "['2 tbsp','tomato paste']", "['1 can (28 oz)','crushed tomatoes']", "['1 cup','red wine']", "['1 cup','milk']", "['24–32 oz','pasta']"]) assert.ok(!page.includes(stale), `stale base-batch marker remains: ${stale}`);
const ingredientsBlock = page.match(/const ingredients=\[([\s\S]*?)\n\];/);
assert.ok(ingredientsBlock, 'ingredient data must exist');
const ingredientRows = (ingredientsBlock[1].match(/\['/g) || []).length;
assert.equal(ingredientRows, 14, 'checklist data should have 14 items');
assert.ok(page.includes('ingredients.map(([amount,name,note],i)=>`<label class="ingredient"><input type="checkbox"'), 'each ingredient must render as a checklist control');
console.log('bolognese 1.5x content: PASS');
