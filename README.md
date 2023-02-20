## BB UI -  Local Development

### Command to install package
brazil ws --create -n HVHCareersFrontendApplicationUI
cd HVHCareersFrontendApplicationUI
brazil ws --use -p HVHCareersFrontendApplicationUI -vs 	HVHCandidateAppWebsiteCDK/release
cd src/HVHCareersFrontendApplicationUI

### Run ADA credentials for access resources in Gamma stage:

* **Gamma MX:** `ada credentials update --account=735199862045 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE`
* **Gamma US:** `ada credentials update --account=388028644549 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE`
* **Gamma UK:** `ada credentials update --account=755705506210 --provider=conduit --role=HVH-CA-EcsService-UK-gamm-EcsTaskInstanceRoleE38DB-15YBKS4MMV17C`

### Build Packages
    
* HVHCandidateApplicationWebsite
    * **Gamma US:** `brazil-build start:gamma:us`
    * **Gamma MX:** `brazil-build start:gamma:mx`
    * **Gamma UK:** `brazil-build start:gamma:uk`

* HVHCareersFrontendApplicationUI
    * Go to configuration>webpack.config.js > KatalWebpackPlugin
        * **For MX:** Change {{Country}} developmentValue to `MX`
        * **For US:** Change {{Country}} developmentValue to `US`
        * **For UK:** Change {{Country}} developmentValue to `UK`
    * Run  `brazil-build start`

### Run locally 
Get jobId from CS gamma-us/mx: https://gamma-us/mx.devo.jobsatamazon.hvh.a2z.com/app#/jobSearch and run: 

* Local entry url is: http://localhost:3000/application/us/#/pre-consent?jobId=xxxx
* Delete browser cookie `hvh-locale` to avoid cache wrong locale.
  And locale sent to API will be determined by {{Country}} developmentValue.
* Resume application entry Url: http://localhost:3000/application/us/#/resume-application?applicationId=xxxx

### For more information about above steps:
https://quip-amazon.com/xJjAAfIOEPvj/How-to-switch-your-BB-local-dev-env-to-other-countrystage

### For future country build and development env integration
https://quip-amazon.com/iABmA1QOE2OH/SOP-BB-UI-Country-build-and-make-local-consume-it

### Wiki
https://w.amazon.com/bin/view/HVH_Tech/CareerSite/NewHireOnboarding/BB_UI_Setup/
