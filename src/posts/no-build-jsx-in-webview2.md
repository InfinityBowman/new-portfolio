---
title: 'No-Build JSX in WebView2'
date: '2025-10-25'
summary: 'Transpiling JSX on the fly in a WebView2 Winforms app.'
---

### How can we use JSX without a build step?

Let's get some context first as to why one would even want this as it is surely less efficient than transpiling before hand. At my current position, we have pretty strict requirements to be able to edit source code on client machines as we are often on site making tweaks and fixing bugs. The tech stack before I got there was Winforms as a host with the original WebBrowser view which uses internet explorer 11. This was pretty limiting and with Windows 11 coming around, I wanted to modernize the tech stack. Edge comes preinstalled on all Windows 11 machines (and very hard to remove) so I decided to take the same approach as Tauri and use the pre-existing webview rather than bringing our own like Electron. This worked amazingly well and now we had all the power of modern JavaScript, CSS, HTML, and browser standards available in chromium.

The next step was to move from vanilla JavaScript to using a library. React 19 isn't even a real module you can load in the browser anymore and React 18 is quite heavy at 140kb. But I wanted to keep things simple and standard so Preact was a good choice. It comes in at only 10kb minified which is quite nice. Now with the library secured, we need a way to transpile it on the fly.

WebView2 offers a nice handler we can tap in called the 'WebResourceRequested' which lets us intercept all web requests from the browser and do whatever we want with them. Anything going out into the internet we can deny for security, and anything asking for JSX files we can then hold the request, execute an async transpile script (we'll come back to this) and then return the code as if it had aways been JavaScript. The browser knows how to resolve ES modules so we don't have to do anything with those, just transpile one file at a time.

I mentioned a transpile script. How did we get a transpiler? If we think about existing, small, portable JSX transpilers, we are pretty limited. Babel is quite massive at 3.5mb and includes a lot of shim and polyfilling logic that we don't need and can't easily be code split. And I did try pretty hard to get that smaller; forked the repo, removed a bunch of stuff, but the smallest I could reasonably get it was 2mb. Which is pretty impressive but still massive. So I looked into how Babel does it's compilation and found that I could just manually hack together a combination of estree, acorn, and astring into a small, pure JSX transpiler that could handle the h transform. 'h' is the syntax Preact uses instead of React.createElement() as h() is a fair bit more compact. Anyways, I got a working JSX transpiler in 240kb which I could then plug into the WebView2 and had a fully working application running from JSX files with Preact components.

Here is the code that can generate a JavaScript function that we can then call from the C# winforms app with the untranspiled JSX string:

```javascript
import { Parser } from 'acorn';
import acornJsx from 'acorn-jsx';
import { buildJsx } from 'estree-util-build-jsx';
import * as astring from 'astring';

// Transpile JSX code to JS using acorn + estree + astring
window.jsxTranspile = function (code) {
  const ast = Parser.extend(acornJsx()).parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  });
  // Transform JSX nodes to h calls
  buildJsx(ast, {
    pragma: 'h',
    fragment: 'Fragment',
  });
  return astring.generate(ast);
};
```

Now it's important to note that this is not something that should ever be done for any large consumer application as transpiling JSX as the browser is requesting the files is not efficient at all compared to a build step that transpiles and minifies everything beforehand. Also, I think the above script had an odd bug in one of the libraries where I had to manually go in and switch a React.createElement into an h() call in the final output.

This isn't a solution we ended up with since it was quite complex and we can just do buildless Preact with htm. But it shows the power available with the WebResourceRequested handler in WebView2 and how we could almost set up our own NodeJS in C# Winforms. The possibilities provided are quite cool. You could for example, fetch files on the computer from a normal JavaScript fetch call or deny fetches to certain domains or all external domains for security.
