#!/bin/bash
browsers=("browserstack:chrome@64.0:OS X High Sierra,browserstack:chrome@63.0:OS X High Sierra,browserstack:firefox@58.0:OS X High Sierra,browserstack:firefox@57.0:OS X High Sierra" "browserstack:safari@11.0:OS X High Sierra,browserstack:safari@10.1:OS X Sierra,browserstack:edge@16.0:Windows 10,browserstack:edge@15.0:Windows 10,browserstack:ie@11.0:Windows 10")

for i in "${browsers[@]}"
do
  ./node_modules/.bin/testcafe "${i}" e2e-tests/tests/*.js -r xunit:browserstack-results/res.xml --app 'npm start'
done