## BB UI -  Local Development

### Command to install package
brazil ws --create -n HVHCareersFrontendApplicationUI
cd HVHCareersFrontendApplicationUI
brazil ws --use -p HVHCareersFrontendApplicationUI -vs 	HVHCandidateAppWebsiteCDK/release
cd src/HVHCareersFrontendApplicationUI

### Run ADA credentials for access resources in Gamma stage:

* **Gamma MX:** `ada credentials update --account=735199862045 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE`
* **Gamma US:** `ada credentials update --account=388028644549 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE`

### Build Packages

* HVHCareersFrontendApplicationUI
    * Go to configuration>webpack.config.js > KatalWebpackPlugin 
      * **For MX:** Change country to `MX`
      * **For US:** Change country to `US`
    * Run  `brazil-build start`
    
* HVHCandidateApplicationWebsite
    * **Gamma US:** `brazil-build server:gamma:us`
    * **Gamma MX:** `brazil-build server:gamma:mx`
    
### Run locally 
Get jobId from CS gamma-us/mx: https://gamma-us/mx.devo.jobsatamazon.hvh.a2z.com/app#/jobSearch and run: 

* Local entry url is: http://localhost:3000/application/us/#/pre-consent?jobId=xxxx
* Resume application entry Url: http://localhost:3000/application/us/#/resume-application?applicationId=xxxx

### Wiki

https://w.amazon.com/bin/view/HVH_Tech/CareerSite/NewHireOnboarding/BB_UI_Setup/