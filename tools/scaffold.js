const { render } = require('mustache');
const { join } = require('path');
const { readFile, writeFile, exists } = require('./fs');
const { cwd } = require('process');
const { mkdirSync } = require('fs');
const course = require('../course.json');

const ROOT = './lessons';
const LAYOUT = './templates/_layout.html';
const BODY = './templates/_body.html';
const TEXT = './templates/_text.md';

function scaffold(layout, body, text, lesson, i) {
  const { name, title } = lesson;
  if (!name) {
    console.error(`\r\nLesson with title ${title} has no name. Scaffolding canceled`);
    return;
  }

  const folder = join(cwd(), ROOT, name);
  const pathToBody = join(folder, 'body.html');
  const pathToLayout = join(folder, 'index.html');
  const pathToText = join(folder, 'text.md');

  lesson.i = i;

  const folderExists = exists(folder);

  if (!folderExists) {
    mkdirSync(folder);
  }

  const bodyExists = exists(pathToBody);
  const textExists = exists(pathToText);

  // always regenerate index.html for consistency
  const indexHtml = render(layout, lesson);
  writeFile(pathToLayout, indexHtml);
  // don't regenerate body if it already in place
  if (!bodyExists) {
    const bodyHtml = render(body, lesson);
    writeFile(pathToBody, bodyHtml);
  }

  if (!textExists) {
    const textMd = render(text, lesson);
    writeFile(pathToText, textMd);
  }
}

(function cli([lessonName]) {
  const layout = readFile(LAYOUT);
  const body = readFile(BODY);
  const text = readFile(TEXT);

  course.lessons = course.lessons.filter((x) => !x.hidden);

  if (lessonName == null) {
    process.stdout.write(`Syncing ALL lectures...`);
    course.lessons.forEach((lesson, index) => scaffold(layout, body, text, lesson, index));

    console.log('DONE');

    return;
  }

  const lessonNumber = course.lessons.findIndex((x) => x.name === lessonName);
  const lesson = course.lessons[lessonNumber];

  if (!lesson) {
    console.log(`Lesson ${lessonName} doesn't exist, ABORTING...`);
    return;
  }

  process.stdout.write(`Scaffolding lesson ${lesson.name}... `);
  scaffold(layout, body, text, lesson, lessonNumber);

  console.log('DONE');
})(process.argv.splice(2));
