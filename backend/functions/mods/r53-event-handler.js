const ssm = require('./ssm-param-store')

const handleCreateHostedZone = async (event) => {
  const hostedZone = event.detail.responseElements.hostedZone
  const key = "/HostedZoneConfig/Dev/id"
  const index = hostedZone.id.lastIndexOf("/")
  const value = hostedZone.id.substring(index + 1)
  ssm.storeParam(key, value, "repbloom")
}

exports.handleEvent = async (event) => {
  if (event.detail.eventSource === 'route53.amazonaws.com'  &&
      event.detail.eventName === 'CreateHostedZone') {
        handleCreateHostedZone(event);
  }

}