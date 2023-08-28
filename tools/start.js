const { exec } = require('child_process');
const { join } = require('path');
const { cwd } = require('process');
const { ensureExists } = require('./fs');

const course = require('../course.json');
const PORT = process.env.PORT ?? '1234';
const NAME_SPACE = 'nextjs-';

(function cli(params) {
  const [lessonNumber] = params;

  if (lessonNumber == undefined) {
    console.log('\x1b[33m%s\x1b[0m', 'Please, specify lesson name to start first');
    return logAvailableLessonNames(course.lessons);
  }

  const sub = `${NAME_SPACE}${lessonNumber}`;
  const path = join(cwd(), 'lessons', sub, 'index.html');

  ensureExists(path);

  console.log(`Starting ${sub} presentation`);
  console.log(`Starting developer server on http://localhost:${PORT}`);
  console.log('PATH: ', path);

  exec(`npx parcel ${path}`);

  /**
   * Logs all lesson names available to start
   * @param {[{name:string}]} lessons
   */
  function logAvailableLessonNames(lessons) {
    console.log('Available lessons are: ');
    lessons.map((l) => l.name).forEach((name) => console.log(name));
  }
})(process.argv.splice(2));
