const ssm = require('./ssm-param-store');

const ssm_key_prefix = `/brainbloomapps/${process.env.lifecycle}`;

const handleCreateHostedZone = async (event) => {
  const hostedZone = event.detail.responseElements.hostedZone;
  const key = ssm_key_prefix + '/HostedZoneConfig/id';
  const index = hostedZone.id.lastIndexOf('/');
  const value = hostedZone.id.substring(index + 1);
  ssm.storeParam(key, value, 'brainbloomapps');
};

exports.handleEvent = async (event) => {
  if (
    event.detail.eventSource === 'route53.amazonaws.com' &&
    event.detail.eventName === 'CreateHostedZone'
  ) {
    handleCreateHostedZone(event);
  }
};
