const ssm = require('./ssm-param-store');

exports.handleEvent = async (event) => {
  if (
    event.detail.eventSource === 'route53.amazonaws.com' &&
    event.detail.eventName === 'CreateHostedZone'
  ) {
    await handleCreateHostedZone(event);
  } else {
    console.log(
      `Unhandled event ${event.detail.eventName} from ${event.detail.eventSource}`
    );
  }
};

//extract the hosted zone id and store it in SSM params
const handleCreateHostedZone = async (event) => {
  const hostedZone = event.detail.responseElements.hostedZone;

  //params to have this hierarchy - easy to apply IAM policies on
  const key = `/${hostedZone.name}/${process.env.lifecycle}/HostedZoneConfig/id`;
  const index = hostedZone.id.lastIndexOf('/');
  const value = hostedZone.id.substring(index + 1);
  await ssm.storeParam(key, value, `${hostedZone.name}`);
};
