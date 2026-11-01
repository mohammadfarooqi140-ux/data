# Glassy CRM — Source Code & Setup Guide

## What this is

Glassy CRM is a complete CRM dashboard design built as **one single HTML file**. There is no build step, no server, and nothing to install. You open the file in a browser and the dashboard is there.

Each version in this folder (`glassy-crm-v4.html`, `glassy-crm-v5.html`, `glassy-crm-v6.html`, `glassy-crm-v7.html`) is a different visual style of the same idea: a glass-effect dashboard with pages for an overview/home screen, a sales pipeline, payments, and clients. Pick whichever style you like best. They all work the same way.

**What works out of the box:**

- Full navigation between pages (sidebar/tabs switch instantly)
- The complete layout, styling, charts and tables, exactly as designed
- Realistic sample data so you can see how every page is meant to look

**What does not work yet (by design):**

- There is no backend and no database
- Forms and buttons are visual only — **nothing you type in is saved**
- The company name, clients and numbers are sample data, not your real data

So treat the file as the finished design. The fastest way to turn it into a real, working CRM for your own business is to hand it to an AI coding tool with the prompt below. That takes a few minutes and needs no coding from you.

## Quick start

1. Download the HTML file for the version you want (open the file on GitHub, then use the download button, or copy the raw link).
2. Double-click it. It opens in any modern browser (Chrome, Edge, Firefox, Safari).
3. Click through the pages to explore the design.

That is all you need to view it. To actually use it as your CRM, continue to the next section.

## Make it yours with AI (recommended)

You do not need to code this by hand. Any AI coding tool can turn the design into a working CRM for you:

- **Claude** (claude.ai or Claude Code)
- **Codex** (ChatGPT)
- **Antigravity** (Google)
- **Cursor**
- Or any similar AI coding app/platform

**How to do it:**

1. Open your AI coding tool of choice and start a new project/chat.
2. Attach or upload the Glassy CRM HTML file you downloaded.
3. Copy the prompt below, paste it in, and fill in the two bracketed bits (your business name and what your business does).
4. Let the AI build it. When it finishes, run the project it gives you — you now have a working CRM in this design, with your data, where everything actually saves.

**The prompt — copy and paste exactly:**

```text
I am giving you a single HTML file. It is the design reference for a CRM dashboard I want for my business.

My business: [YOUR BUSINESS NAME HERE] — [ONE LINE ON WHAT YOUR BUSINESS DOES, e.g. "a building company that does home extensions"].

Use the attached HTML file as the exact design and layout reference and turn it into a fully working CRM for my business. Rules:

1. Keep the visual design identical — same layout, same colours, same glass effect, same fonts, same page structure. Do not redesign it.
2. Make everything actually work: navigation between all pages, every button, every form. No dead buttons and no placeholder screens.
3. Forms must really save. Adding or editing a client, moving a deal through the pipeline, and recording a payment must all store the data and still be there when the page is reloaded or the app is reopened.
4. Store the data properly: use local storage for a simple single-user version, or a real backend with a database if your platform supports it — pick whichever gives me a version that genuinely saves and works, and tell me which one you chose.
5. Replace ALL sample data with my business: my company name everywhere the sample company name appears, and starter data that fits my type of business instead of the sample clients and numbers.
6. Keep it as one project I can run easily. At the end, give me simple step-by-step instructions for how to open and use it, written for a non-technical person.
```

**Tips for a better result:**

- If the tool asks questions before building, answer them briefly and let it continue — the answers help it match your business.
- After the first version works, you can ask the same tool for changes in plain words, e.g. "add a page for appointments" or "change the accent colour to blue". It will keep the design and adjust the code.
- Keep your copy of the original HTML file somewhere safe. If an AI session ever makes a mess, you can start a fresh chat with the original file and the prompt above and rebuild cleanly.

## Editing it manually (if you code)

The file is plain HTML, CSS and JavaScript in one place. Open it in any text/code editor (VS Code, Notepad++, etc.):

- **Company name:** search the file for the sample company name (e.g. "Merrick Homes", "Alderbrook Homes" or "Ashcombe Homes", depending on the version) and replace every instance with yours.
- **Sample data:** the clients, deals and payment figures live in JavaScript data near the end of the file (look for arrays of objects with names and amounts). Edit the values directly.
- **Colours:** search for the CSS variables at the top of the `<style>` section (names like `--accent`). Change the hex value once and it updates across the dashboard.
- **Text and labels:** headings, menu labels and button text are plain text inside the HTML — search for the words you see on screen and edit them.

Save the file and refresh the browser to see your changes. Remember: manual edits change how it looks, but the file on its own still has no storage — for saving data, use the AI route above.

## Files in this folder

| File | Style |
|---|---|
| `glassy-crm-v4.html` | Light glass |
| `glassy-crm-v5.html` | Dark glass, violet accent |
| `glassy-crm-v6.html` | Colourful glass (coral, teal, amber, violet) |
| `glassy-crm-v7.html` | Soft cream frosted glass, sage accent |

Each file is self-contained — you only need the one you choose.
