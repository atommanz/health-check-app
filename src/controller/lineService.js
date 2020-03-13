import { apiFetch } from './helpers'
import config from './config'

export const getAccessToken = async (code) => {
    const body = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${process.env.REACT_APP_HOSTING || 'http://localhost:3000'}`,
        client_id: config.clientId,
        client_secret: config.channelSecret

    }

    return new Promise((resolve) => {
        apiFetch({
            url: 'https://api.line.me/oauth2/v2.1/token',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            body,
        }).then((res) => {
            console.log('res', res)
            return resolve(res) 
        })
    })
}