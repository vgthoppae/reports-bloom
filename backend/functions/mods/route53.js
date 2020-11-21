
var AWS = require("aws-sdk");
const route53 = new AWS.Route53();

const hzoneParams = {
  Id: ''
}

const rsParams = {
  HostedZoneId: '',
  StartRecordType: 'A',
  MaxItems: '1'
}

exports.recordExists = function(subDomain) {   
rsParams.StartRecordName = `${subDomain}.brainbloomapps.com.`
  console.log(`Checking for domain ${rsParams.StartRecordName}`)

  route53.listResourceRecordSets(rsParams, (err, data) => {
    if (err) console.log(err)

    if (data && data.ResourceRecordSets) {
      data.ResourceRecordSets.forEach(e => {
        if (e.Name ===  rsParams.StartRecordName &&
            e.Type === rsParams.StartRecordType) {
          console.log('Record match found')
        } else {
          console.log('No record match found')
        }
      });
      
    }

  })
}
