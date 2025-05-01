
// Appended by cron on 2025-05-01


// Appended by cron on 2025-05-01
$ npm start

And call it:

$ npm run

It should then compile and run with the following error message:

Could not load ':api/json' on port 3000

The solution to this problem is to create a function that only accepts JSON and returns a Promise as an argument.

This should be straightforward:

$ npm run

then, you can call it to fetch JSON from a given URL:

$ npm run

This should return:

Request: json

If you need to wait for something, you can use the --wait-for option.

Example:

$ npm run fetchJSON

And then try to execute it
