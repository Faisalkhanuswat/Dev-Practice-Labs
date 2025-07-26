import configuration from './yaml.config'

const { policy } = configuration();

const whitelist = policy?.whitelist ? policy.whitelist.split(',') : [];

export const corsOptions = {
    origin: function (origin: string, callback: Function) {
        if (whitelist.includes('*') || whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            // `Not allowed by CORS`
            callback(null, false);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false
}