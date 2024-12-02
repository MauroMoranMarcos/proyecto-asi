import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/staff/signUp', config('POST', user),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);

}