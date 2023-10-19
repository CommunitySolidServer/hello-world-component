# Hello World component

A Hello World component that can be injected into a 
[Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer/) (CSS) instance
using [Components.js](https://github.com/LinkedSoftwareDependencies/Components.js/).
It logs a message when called, and its configuration injects it into CSS
so that it is called every time the server starts.

This repository can be used as an example of how to create a new component for CSS.
Many different repository structures are possible,
the one used here is just an example.

The major version of this repository corresponds to the CSS major version it supports.

Below we go over all the files in the repository and how they relate to the component.

## tsconfig.json
You can configure your TypeScript project in any way you want,
but to be able to reuse most of this example repository,
you will want to keep the `"outDir": "dist"` setting,
which makes it so all generated files are created in the `dist` folder.

## package.json
Contains all the important Components.js configurations. 
You will want to update this file according to your project needs, such as name, repository, version and so on.

### Components.js fields
All fields below are used to allow Components.js to discover everything about your project,
and will have to be updated.

`lsd:module` tells Components.js what the identifier is of your module.

`lsd:components` tells Components.js where it can find an RDF description of all components created in your project.
If you keep the structure of this project this value can stay the same.

`lsd:contexts` tells Components.js which contexts to use to interpret the component descriptions in this project,
and where to find them.

`lsd:importPaths` tells Components.js how to convert certain URLs to file paths. 
This means that if you add a new folder to your project that contains files relevant for Components.js,
it will need to be added here.
But if you use the same structure as this project these entries are enough as they describe (in order):
 * Where to find the context.
 * Where to find custom configurations.
 * Where to find the descriptions of all the classes.

When creating your own project you will need to update all the URLs above and replace `hello-world-module`
with your own package name, and the version number with your version number.
Note that Components.js only uses major version number, so the URL will always contain `x.0.0`,
even if your version number is `x.y.z`.

### Scripts
There are several helper scripts here such as `start` to start the server with the given settings and config,
and `build` to both build the TypeScript and Components.js files.

The script that you will want to change is `build:components`,
specifically the `-r` flag which determines which prefix will be used in the generated configurations.
All field descriptions can be found [here](https://github.com/LinkedSoftwareDependencies/Components-Generator.js#usage).

## .componentsignore
There are sometimes classes the Components.js generator has difficulties with to interpret.
Often these are references to default Node.js classes or from external dependencies that do not use Components.js.
Such classes can be added as strings to the array in this file so they can be ignored.
You can see this file being referenced in the `build:components` script mentioned above.

## src
This folder should contain all the source code of your project. Subfolders are allowed.
One thing that is important and often forgotten is that you need to have an `index.ts`
that exports **all** classes defined in your project.
The Components.js generator will use to file to generate its descriptions,
so if it's not in there the generator does not know it exists.

### src/HelloWorld.ts
In general when creating a class to inject into CSS, 
you will want to extend an interface/abstract class from the main repository.
Which one depends on what you want to do and where your component would fit into the architecture.
Some more information about the architecture can be found in 
the CSS [documentation](https://communitysolidserver.github.io/CommunitySolidServer/).

In this specific case we wanted something to happen during server startup, so we extended `Initializer`.
Just extending the correct interface is not enough though, it also needs to be added through configuration.
More on this below.

## config
Here we put all instantiations and configurations of our created components. Subfolders are allowed.
For more information on how to configure Components.js components we refer to both 
the Components.js [documentation](https://componentsjs.readthedocs.io/)
and the CSS [documentation](https://communitysolidserver.github.io/CommunitySolidServer/).

Note that the files here are not required to make this repository a valid Components.js project,
but they do make it much easier when other people want to make use of your component
so they do not have to configure everything themselves.

### config/hello-world.json
Since this project only has 1 small class with no parameters,
the configuration simply initializes that 1 class and assigns it a unique identifier.
We import our own new context at the top so Component.js recognizes our new class.
It knows where to find this context due to the fields added in the `package.json` above.
Note that this identifier does not have to start with `urn:` or look like that,
any valid URI is accepted.

## hello-world-file.json
This file is used as a single example on how to start a CSS instance,
injected with the new component.
Since there are so many ways to configure CSS, it is impossible to cover everything,
but this should already give a clear example to other users on what needs to be configured to add the new component.

In this case, we started from the `file.json` configuration of CSS. 
We imported our own custom configuration to have access to the instantiation of our new class.
We then add that instantiation to the list of Initializers that get executed when the server starts.

Something that is easily missed is that at the top of this configuration, we are now importing 2 contexts:
our own new context, and the original one from CSS.

This file can also be combined with the CSS configuration tool as described 
[here](https://github.com/CommunitySolidServer/configuration-generator/).
For example, you can generate configurations that already include the necessary extra lines to add the new component
[here](https://communitysolidserver.github.io/configuration-generator/v7/?config=https%3A%2F%2Fraw.githubusercontent.com%2FCommunitySolidServer%2Fhello-world-component%2Fmain%2Fhello-world-file.json).

## hello-world-partial.json
Similar to hello-world-file.json this configuration defines how the new component is added to a CSS instance.
The difference being that this one lacks all the necessary imports.
This can be combined with an already existing CSS configuration
by providing both as config parameters when starting CSS.
An example of the difference can be seen in the `start` and `start-alt` scripts in the `package.json`.

Such a configuration can also be injected into the configuration tool as can be seen
[here](https://communitysolidserver.github.io/configuration-generator/v7/?config=https%3A%2F%2Fraw.githubusercontent.com%2FCommunitySolidServer%2Fhello-world-component%2Fmain%2Fhello-world-partial.json).

## test
An important part of creating a new component is testing to make sure everything works correctly.
For this we make use of the [jest](https://jestjs.io/) test framework,
but any test framework that has TypeScript support can be used.

### test/config/hello-world-memory.json
This is a configuration file that is used to test a server running with our new component.
It is very similar to the `hello-world-file.json` from above,
but configured so that everything is stored in memory, to prevent writing files during tests,
and so that the server immediately initializes on startup so no manual setup is needed.

### test/integration/Server.test.ts
One thing we want to test is if the server with our new component behaves as expected.
This integration test sets up a complete and running CSS instance and performs an HTTP request to see the response.
More details on how this happens can be found in the file itself.

### test/unit/HelloWorld.test.ts
To make sure all our individual classes do what we want them to do,
we need to have unit tests to test all possible situations.
In this case we make sure the logger gets called with the correct string.

### jest.config.js
A minimal jest configuration.
To extend this, see https://jestjs.io/docs/configuration.
