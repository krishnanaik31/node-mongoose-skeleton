import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import { constants as EMAIL_CONST } from '../constant/email';
import { logger, level } from '../config/logger';
sgMail.setApiKey(EMAIL_CONST.EMAIL_SEND_KEY);

const algorithm = 'aes-128-cbc';
const key = 'keithpassword';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
export const sendStatus = (res, statusCode) => {
  res.status(statusCode);
};

export const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

export const sendJSONResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

export const redirectRequest = (res, url) => {
  res.redirect(url);
};

export const createSuccessResponseJSON = (code, data) => {
  const response = {
    code: code,
    data: data
  };
  return response;
};

export const createErrorResponseJSON = (code, error) => {
  const errorResponse = {
    code: code,
    error: error
  };
  return errorResponse;
};

export const encrypt = data => {
  const mykey = crypto.createCipher(algorithm, key);
  let mystr = mykey.update(data, inputEncoding, outputEncoding);
  mystr += mykey.final('hex');
  return mystr;
};

export const decrypt = data => {
  const mykey = crypto.createDecipher(algorithm, key);
  let mystr = mykey.update(data, outputEncoding, inputEncoding);
  mystr += mykey.final('utf8');
  return mystr;
};

export const sendEmail = async (to, from, subject, text, html) => {
  logger.log(
    level.debug,
    `utility sendEmail to=${to}, from=${from},subject=${subject},
     text=${text},
     html=${html}`
  );
  const msg = {
    to,
    from,
    subject,
    text,
    html
  };
  try {
    const result = await sgMail.send(msg);
    logger.log(
      level.debug,
      `utility sendEmail result=${JSON.stringify(result)}`
    );
  } catch (error) {
    logger.log(
      level.error,
      `utility sendEmail to=${to}, from=${from},subject=${subject},
      error=${error}`
    );
  }
};
