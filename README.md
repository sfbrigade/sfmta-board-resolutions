# SFMTA Board Resolutions


## Project Needs (+Leads)
 - **QA Geocoding** Set up a process to fix discrepancies in data and feed them back to the source 
 - **Change Basemap from Mapbox to ESRI** https://github.com/esri/esri-leaflet 
 - **Scrape PDFS of board resolutions into machine-readable data** (Nike)
 - **Develop Product Vision** 
 - **User-testing** document successes, use-cases, datasets to add, etc.


## Current Team Members
 - **Allan**
 - **Jason**
 - **Sergey**
 - **Scott**
 - **Nike**
 - **Kate**
 - **Sheffield**
 
 
 ## Vision: Problems We Hope to Solve
 - Increase stakeholder engagement around proposed changes to SF's transportation infrastructure
 
 
 ## Links
* Test prototype: http://sfmta.xtreet.org/resolutions-map
* Get on [Slack](http://c4sf.me/slack)
  * Add prj-sf-trip4SF as a channel
* Get on [GitHub](http://c4sf.me/joingithub)
  * Find sfbrigade/sfmta-board-resolutions
* Visit Google Drive folder: https://drive.google.com/drive/folders/0B_zAxkoAf-U6NGY1Zlk4UDl2Z28
* Attend [Code for San Francisco](http://codeforsanfrancisco.org/events) hack nights on Wednesdays from 6-9



 
 
 
 # Inherited Technical portion of the Read.me from SF Crime Data
 

 ## Working in Github
  If you want to contribute to this project please follow these instructions:
  - fork the repository in to your account
  - open terminal, cd to a folder you want your files saved in.
  - clone from your repository:
  `git clone https://github.com/youraccount/sf-crime-data`
  - setup upstream to main repository:
  `git remote add upstream https://github.com/sfbrigade/sf-crime-data`
  - make sure your upstream and origin are correct:
  `git remote -v`
  - make edits in gh-pages branch:
  `git checkout gh-pages`
  - make changes from your local folder. Everytime you work on it make sure to pull any updates:
  `git pull upstream gh-pages`
  - When your ready to submit changes:
```
  git add <changed file names>
  git commit -m "type your message here"
  git push origin gh-pages
```
  - go to your git hub account in your browser and make a pull request from there. The dropdown should look like Main Repo/gh-pages to Forked Repo/gh-pages.

## Running Codebase Locally
If you want to download the github repository and run the code locally on your Apple machine,
- open terminal
- go to the folder directory
- run 'python -m SimpleHTTPServer'
- go to a browser and type in localhost:"PORT_NUMBER"


## Background in Technical Tools Used
* Add [ZenHub](https://www.zenhub.com/) plug-in to GitHub
  * Review how ZenHub works
* Review issues on ZenHub boards (within GitHub: sfbrigade/sf-crime-data)
* Clone the site to your dev machine and get it running locally
  * See readme.md "Running Codebase Locally"
  * See readme.md "Working in Github"
  * Alternately use your GitHub account's hosting option for gh-pages
  * Review how to call the API (Export)
* Visit [Mapbox.com](https://www.mapbox.com/)
  * Review their map offerings
  * Review how to call the API
* If you want to contribute to the code base...
  * Set up a "public hosting" location like GitHub pages or Firebase
  	* This will be used to share your changes for team testing and code reviews
  * Comment on the issue you would like to work on
  * Continue to collaborate and code using Slack and GitHub
* If "life happens" and you won't have time to finish an issue due to new demands, do let us know, so we can re-assign.


## Stack

The following are among the libraries and extensions used:

[Bootstrap](http://getbootstrap.com/) – "a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development"

+ [Bootstrap 3 Typeahead](https://github.com/bassjobsen/Bootstrap-3-Typeahead)
+ [Date Range Picker](http://www.daterangepicker.com/)

[jQuery ](https://jquery.com/) - "The Write Less, Do More, JavaScript Library"

+ [URI.js](https://medialize.github.io/URI.js/jquery-uri-plugin.html) – "URI.js offers simple, yet powerful ways of working with query string, has a number of URI-normalization functions and converts relative/absolute paths"
+ [DataTables](https://datatables.net/)
    + [Buttons](https://datatables.net/extensions/buttons/)
    + [colVis](https://datatables.net/extensions/colvis/)
    + [FixedHeader](https://datatables.net/extensions/fixedheader/)

[Leaflet](http://leafletjs.com/) – "An open-source JavaScript library for mobile-friendly interactive maps"

+ [Mapbox](https://www.mapbox.com/) - "The location platform for developers and designers
APIs for maps, geocoding, driving directions, and more"
+ [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) – "Provides Beautiful Animated Marker Clustering functionality"
+ [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw) - "Adds support for drawing and editing vectors and markers"
+ [Leaflet.Sleep](https://github.com/CliffCloud/Leaflet.Sleep) – "Prevent unwanted scroll capturing; let your map sleep"

[Moment.js](http://momentjs.com/) – "Parse, validate, manipulate, and display dates and times in JavaScript"
 
[noUiSlider](https://refreshless.com/nouislider/) – "JavaScript Range Slider"


