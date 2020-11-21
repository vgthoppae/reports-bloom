const ssm = require('./ssm-param-store')

exports.handleCreateHostedZone = (event) => {
  const hostedZone = event.detail.responseElements.hostedZone
  const key = "/HostedZoneConfig/Dev/id"
  const index = hostedZone.id.lastIndexOf("/")
  const value = hostedZone.id.substring(index)
  ssm.storeParam(key, value)
}

exports.getHandler = (event) => {
  if (event.detail.eventSource === 'route53.amazonaws.com'  &&
      event.detail.eventName === 'CreateHostedZone') {
        return handleCreateHostedZone;
  }

}