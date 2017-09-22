Jasmine
=======

Standalone Jasmine
------------------

I'm including the standalone, static-web-file-based, released version of Jasmine as it's the simplest way to get tests running in this environment. Ordinarily I'd use a build system and a test runner of some sort (ex: Webpack + Karma). This does mean I have to manually specify both source and spec files; that's not too onerous for this small project.

Vanilla Jasmine
---------------

When I'm doing real-world projects, I usually need to spend time adding in extra functionality on top of Jasmine to make testing more efficient and readable. Part of this is supporting a "Given When Then" syntax. There's other features inspired by rSpec that I usually end up reimplementing too. I'm not doing any of that here in the interest of time. Jasmine's "describe" syntax is OK enough for this project.

Test Data
---------

In real-world projects, I like using randomized data and factories rather than hard-coding test data, or using fixtures. In this project, I'll just use hard-coded test cases in the interest of time.

