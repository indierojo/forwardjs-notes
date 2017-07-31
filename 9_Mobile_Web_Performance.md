## Mobiile Web Perf
Estelle Weyl (Instart Logic) www.standardista.com

## Abstract
Some of your users are on mobile browsers that may be more advanced than the desktop browsers of other users, but chances are those phones with their advanced browsers may have similar memory and bandwidth constraints to the computer you threw out or recycled 5 years ago.

While as developers we’re finally enjoying the ubiquity of modern browsers accessing the web, it’s the devices themselves that are now creating constraints we always need to consider. The issue with mobile isn’t “Old IE”, but rather battery life, latency, memory and UI responsiveness. In this session, we’ll discuss best practices to make sure your site performs well, no matter how your user is accessing your content.

## Mobile Ecosystem
* Top Devices - mostly premiere phones, decent amount (1GB+) of RAM
* Emerging Markets
  * 3.2 billion online, of those 1.1b w/ high-speed internet
  * Next billion users, most devices are feature phones, 32-64MB RAM, keep in mind that that's on top of sytem services
* Android fragmentation
* Aspect Ratios are actually generally rectangular
* Feature Phones improving, screen size, cores, RAM all going up
* When developing, we're developing on beasts of machines.
* Page Size (in MB) on average has increased 400%+, (Avg > 3MB)
  * Case study, Youtube budgetted everything other than the video to 100KB 'Project Feature' - improved market reach

## What goes into Perf?
* Download
* Parse
* Execute
* Perceived Perf === more important

## Device considerations
* Very powerful browsers
* Less powerful CPUs
* Not plugged in, metered data
* Small screens
* Different interface modal (touch vs. keyb+mouse)
* battery, latency, memory, responsiveness

#### Things we can control
* # of http reqs,
* # of bytes
* Images, animations, interations
* Responsiveness

#### Things we can't
* Network/Latency
* Hardware
* Bandwidth

#### Latency
* As compared to on your Computer, we have a few extra hops to the cell tower, phone comp, and then internet

## Page load
Http -> DNS -> TCP - request -> server stuff -> response -> parse -> render -> rerender

## Dealing w/ Network/Latency
* YSlow - yahoo
* Lighthouse
* PageSpeed
* Basically, audit, do some no-brainer things
* Also, minimize requests
* Reduce DNS lookups

## Optimizing For Perf
1. Configure the Viewport
 see: <meta name="viewport" />
2. Optimize all Images
 Images are most of your page load size
 * <picture> or srcset both allow you to specify multiple sizes
3. Optimize Video
 * Avg bytes per content as of July 1 / 2017 is ~700kb
 * <video> is equivalent to <picture>
 * If you're doing something like a hero video where you don't play audio, use something like ffmpeg to remove the audio, which can be somewhat substantial
4. Everything Else
 * Stylesheets first, scripts after the body
 * responsive doesn't necessarily reduce the size
 * Look into progressive webapps