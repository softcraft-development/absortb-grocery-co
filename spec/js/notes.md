Jasmine
=======

Vanilla Jasmine
---------------

When I'm doing real-world projects, I usually need to spend time adding in extra functionality on top of Jasmine to make testing more efficient and readable. Part of this is supporting a "Given When Then" syntax. There's other features inspired by rSpec that I usually end up reimplementing too. I'm not doing any of that here in the interest of time. Jasmine's "describe" syntax is OK enough for this project.

Test Data
---------

In real-world projects, I like using randomized data and factories rather than hard-coding test data, or using fixtures. In this project, I'll just use hard-coded test cases in the interest of time.

Paths & Dependencies
--------------------

Normally I'd be using ES6 modules/imports and a web app builder like Webpack to handle all of the filename resolution and dependency management. We don't have that here though, so I've added some quick & dirty workarounds in dependencies.js.