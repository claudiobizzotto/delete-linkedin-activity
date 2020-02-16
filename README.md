# Delete Linkedin Activity

## What

Scripts for automated deletion of Linkedin activity.

**Disclaimer: these scripts will ruthlessly delete ALL your Linkedin activity. They were made for that. Use at your own risk.**

## Why

As of now, Linkedin doesn't offer a _bulk-delete_ option for personal activity. There's also no API available for that. Thanks, Bill!

## How

Use the scripts provided here to delete posts, comments and likes:

1. open your web browser;
2. go to the correct Linkedin page (see below);
3. open the browser's JavaScript console;
4. paste the corresponding script in the JavaScript console;
5. execute it!

Bam! New Linkedin, new life.

**Note:** these scripts have only been tested on a pretty recent version of Firefox. Let me know if they break on other browsers and I'll do my best to fix them. (Unless it's Internet Explorer, in which case you're on your own...)

### Posts

Use `delete-posts.js` to delete all posts authored by you. Open your browser and go to _Me >> Posts & Activities > Posts_ (or `https://www.linkedin.com/in/{username}/detail/recent-activity/shares`) and execute the script from the JavaScript console.

### Comments

Use `delete-comments.js` to delete all comments authored by you. Open your browser and go to _Me >> Posts & Activities_ (or `https://www.linkedin.com/in/{username}/detail/recent-activity`) and execute the script from the JavaScript console.

### Likes

Use `delete-likes.js` to delete all likes authored by you. Open your browser and go to _Me >> Posts & Activities_ (or `https://www.linkedin.com/in/{username}/detail/recent-activity`) and execute the script from the JavaScript console.

## FAQ

### Is this legal?

I'm not a lawyer, but I'm sure of one thing: no one can tell me how to use my goddamn web browser. (It's called "_client_ side" for a reason...) All these scripts are doing is to automate interactions you'd otherwise have with the webpage (your own Linkedin profile) with a mouse and a keyboard. Bottom line: it's **your** data.

### How do I use the JavaScript console on my favorite browser?

* Firefox: <https://developer.mozilla.org/en-US/docs/Tools/Browser_Console>
* Chrome: <https://developers.google.com/web/tools/chrome-devtools/console>
* Safari: <https://developer.apple.com/safari/tools>
* Brave: no, thanks. Seriously, don't use that thing.

### Why do they throw so many errors?

I've created these scripts for personal use: once I got them to work, I was more than satisfied. (Did you really think I enjoyed writing JavaScript on a Sunday afternoon?) They'll still get the job done, despite the error messages. Plus, have you ever payed attention to all those errors thrown by Linkedin's own scripts? Ha!

It's just a bunch of front end JavaScript errors, loca. Who cares?

### Will Linkedin punish me?

Linkedin will only punish you if the scripts run too fast -- in that case, they may temporarily block your IP address, but that's about it. As a safeguard, I've added a bunch of timers to slow things down and not bombard their APIs with requests. Feel free to fork this repo and tweak those values if you want, but right now the time values used by default (between two and five seconds) should be just fine.

### Will Linkedin still keep the content somewhere?

Excellent question! But I have no idea... Given the history behind Microsoft (and similar companies), I presume all our personal data is processed, packaged and carefully placed inside [Steve Ballmer's ham sandwich](https://wiki.c2.com/?SteveBallmer). Yum yum!

### How do I contribute?

Start by selling your car and eating less meat, how about that?

### What's the moral of the story?

The less JavaScript you write, the more you live!
