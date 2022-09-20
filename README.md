## BB UI -  Local Development

### Command to install package
brazil ws --create -n HVHCareersFrontendApplicationUI
cd HVHCareersFrontendApplicationUI
brazil ws --use -p HVHCareersFrontendApplicationUI -vs 	HVHCandidateAppWebsiteCDK/release
cd src/HVHCareersFrontendApplicationUI

### Run ADA credentials for access resources in beta stage:

`ada credentials update --account=344441347779 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE`

### Build Packages

* HVHCareersFrontendApplicationUI
    * Run  `brazil-build start`
    
* HVHCandidateApplicationWebsite
    * RUn `brazil-build server`
    
### Run locally 
Get jobId from CS beta: https://beta-us.devo.jobsatamazon.hvh.a2z.com/app#/jobSearch and run: 

* Local entry url is: http://localhost:3000/application/us/#/pre-consent?jobId=xxxx
* Resume application entry Url: http://localhost:3000/application/us/#/resume-application?applicationId=xxxx

### Wiki

https://w.amazon.com/bin/view/HVH_Tech/CareerSite/NewHireOnboarding/BB_UI_Setup/