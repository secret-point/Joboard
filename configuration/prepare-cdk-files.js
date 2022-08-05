const brazil = require('@amzn/brazil');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

writePackaging();
writeLambdaTransform();

function writeLambdaTransform() {
  const data = {
    archive_system: 'archive_empty',
    data_files: ['packaging_additional_published_artifacts']
  };
  const dir = path.resolve(brazil.buildDir, 'aws_lambda');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`${dir}/lambda-transform.yml`, yaml.dump(data));
}

function writePackaging() {
  const data = {
    artifacts: {
      paths: {
        'packaging_additional_published_artifacts/': 'packaging_additional_published_artifacts/'
      }
    }
  };
  const dir = path.resolve(brazil.buildDir, 'Packaging');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`${dir}/CloudFormation.yml`, yaml.dump(data));
}
