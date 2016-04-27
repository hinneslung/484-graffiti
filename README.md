#HKIGSHOPS Client Version 2.0 Development
###Directory Layout

/
----/app 
--------/scripts 
------------/controllers ---> templates's controllers
------------/directives ---> templates's directives + our directives
------------/filters --> templates's filters + our filters
------------/services --> templates's services + our services
------------app.ctrl.js --> main app controllers
------------app.js --> template load modules
------------config.js --> app-wise configs
------------config.lazyload.js --> template's config lazy loading
------------config.router.js --> config $stateProvider for routing and lazy loading *.ctrl.js & views
--------/views
------------/components --> common components view templates
------------layout.html --> mount root ng-app
--------index.html --> main index html loading js and css files
/assets --> templates' img, icon, css, scss
/e2e-tests
/html --> templates' html only html
/libs --> templates' angular & HTML5 library

