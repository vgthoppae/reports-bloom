const handlerProvider = require('./mods/r53-event-handler')

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log(event);
        handlerProvider.handleEvent(event);

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'about to process the route53 event',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};