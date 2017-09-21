API Folder Notes
----------------

This is where the JSON data files are going to live. A real-world UI would most likely be getting this from the server API, so we might as well call this directory "api", and treat it as if it's a server endpoint (as much as we can while still using a filesystem).

I generally try to use RESTful APIs in my applications. GraphQL looks like an interesting alternative, as it solves some of the ambiguity in straight REST for some common circumstances. Facebook has to figure out the patent issues in the license first though.

 I'll fake a typical dynamic RESTful path through directories. So, for example, the (relative) path to the customer initial basket state will be /customer/\_customerid\_/basket. Anything with \_underscores\_ indicates a dynamic path element. (In an ideal real-world app, this would be replaced with a  unique, unchanging, human-friendly & URL-compatible text slug.)


