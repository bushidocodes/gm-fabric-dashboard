# README #

Blackbox is a web automation framework for writing both front-end UI and back-end API tests. It is written in Java and uses JUnit, Selenium WebDriver, and the Jersey API client.

## Prerequisites ##

### Running UI Tests in Google Chrome (Recommended) ###

You will need to download the [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) in order for the WebDriver to be able to attach to a Chrome instance.

### Running UI Tests in Mozilla Firefox ###

The very latest versions of Firefox are usually not yet supported by WebDriver. Please see the [list of supported platforms](http://www.seleniumhq.org/about/platforms.jsp) to determine which version of Firefox you will need to have installed. This framework is currently using Selenium 2.53.0, which significantly limits the number of compatible versions of Firefox.