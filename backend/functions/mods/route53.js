var AWS = require('aws-sdk');
const route53 = new AWS.Route53();
const ssm = new AWS.SSM({
  region: process.env.region,
});

const rsParams = {
  HostedZoneId: '',
  StartRecordType: 'A',
  MaxItems: '1',
};

const getHostedZoneName = (qdn) => {
  const regex = /\..*\.$/; //grab the main domain name
  try {
    const ret = qdn.match(regex);
    return ret[0].slice(1);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const getHostedZoneId = async (hostedZoneName) => {
  const key = `/${hostedZoneName}/dev/HostedZoneConfig/id`;

  const ret = await ssm
    .getParameter({ Name: key, WithDecryption: true })
    .promise();
  return ret.Parameter.Value;
};

exports.recordExists = async (fullDomainName) => {
  let qdn = fullDomainName;
  //make sure there is period in the end - as route 53 stores the domain with a trailing period
  if (fullDomainName.slice(-1) !== '.') {
    qdn = fullDomainName + '.';
  }
  const hostedZoneName = getHostedZoneName(qdn);
  console.log(`hosted zone name is ${hostedZoneName}`);

  rsParams.HostedZoneId = await getHostedZoneId(hostedZoneName);

  //this is the requested domain name - for eg., options.brainbloomapps.com
  rsParams.StartRecordName = qdn;
  console.log(`Checking for domain ${qdn}`);

  const ret = await route53.listResourceRecordSets(rsParams).promise();

  let retCode = 500;
  if (ret && ret.ResourceRecordSets) {
    if (ret.ResourceRecordSets.length === 0) retCode = 200;
    ret.ResourceRecordSets.forEach((e) => {
      if (
        e.Name === rsParams.StartRecordName &&
        e.Type === rsParams.StartRecordType
      ) {
        console.log('Record match found');
        retCode = 409;
      } else {
        console.log('No record match found');
        retCode = 200;
      }
    });
  }
  return retCode;
};
