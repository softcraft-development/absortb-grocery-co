Jasmine
=======

Standalone Jasmine
------------------

I'm including the standalone, static-web-file-based, released version of Jasmine as it's the simplest way to get tests running in this environment. Ordinarily I'd use a build system and a test runner of some sort (ex: Webpack + Karma). This does mean I have to manually specify both source and spec files; that's not too onerous for this small project.

Vanilla Jasmine
---------------

When I'm doing real-world projects, I usually need to spend time adding in extra functionality on top of Jasmine to make testing more efficient and readable. Part of this is supporting a "Given When Then" syntax. There's other features inspired by rSpec that I usually end up reimplementing too. These enhancements often make the test descriptions/structure flow more smoothly and help eliminate code duplication. I'm not doing any of that here in the interest of time. Jasmine's "describe" syntax is OK enough for this project.

Test Data
---------

In real-world projects, I like using randomized data and factories rather than hard-coding test data, or using fixtures. In this project, I'll just use hard-coded test cases in the interest of time.

Note that I use prime numbers when coming up with test values; I use each prime in exactly one spot in a test. This can help me track down how a value is being calculated; if a unique prime is used in a multiplication, then it's products will be unique too. It's also easier to track down additions & subtractions when the operands are prime.

Paths & Dependencies
--------------------

Normally I'd be using ES6 modules/imports and a web app builder like Webpack to handle all of the filename resolution and dependency management. We don't have that here though, so I've added some quick & dirty workarounds in dependencies.js.
