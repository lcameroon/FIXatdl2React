import _ from 'lodash';
import moment from 'moment';

export const SOHCHAR = '|';

export const checksum = (str: string) => {
  let chksm = 0;
  for (let i = 0; i < str.length; i++) {
    chksm += str.charCodeAt(i);
  }

  chksm = chksm % 256;

  let checksumstr = '';
  if (chksm < 10) {
    checksumstr = '00' + (chksm + '');
  } else if (chksm >= 10 && chksm < 100) {
    checksumstr = '0' + (chksm + '');
  } else {
    checksumstr = '' + (chksm + '');
  }

  return checksumstr;
};

export const convertMapToFIX = (map: any) => {
  return convertToFIX(map, map[8], map[52], map[49], map[56], map[34]);
};

export const convertToFIX = (
  msgraw: any,
  fixVersion: string,
  timeStamp: string,
  senderCompID: string,
  targetCompID: string,
  outgoingSeqNum: string
) => {
  //sys.log('c2F:'+JSON.stringify(msgraw));
  //defensive copy
  const msg: any = {};
  for (const tag in msgraw) {
    if (msgraw.hasOwnProperty(tag)) {
      msg[tag] = msgraw[tag];
    }
  }

  delete msg['9']; //bodylength
  delete msg['10']; //checksum

  //TODO why is there a timestamp when a timeStamp is passed in?
  //const timestamp = new Date();
  const headermsgarr: string[] = [];
  const bodymsgarr: string[] = [];
  const trailermsgarr: string[] = [];

  //msg['8'] = fixVersion; //fixversion
  //msg['52'] = timeStamp; //timestamp
  //msg['49'] = senderCompID; //sendercompid
  //msg['56'] = targetCompID; //targetcompid
  //msg['34'] = outgoingSeqNum; //seqnum

  headermsgarr.push('35=' + msg['35'], SOHCHAR);
  if (_.isNumber(timeStamp)) {
    headermsgarr.push('52=' + moment.utc(timeStamp), SOHCHAR);
  } else {
    headermsgarr.push('52=' + timeStamp, SOHCHAR);
  }
  headermsgarr.push('49=' + senderCompID, SOHCHAR);
  headermsgarr.push('56=' + targetCompID, SOHCHAR);
  headermsgarr.push('34=' + outgoingSeqNum, SOHCHAR);

  for (const tag in msg) {
    if (
      msg.hasOwnProperty(tag) &&
      tag !== '8' &&
      tag !== '9' &&
      tag !== '35' &&
      tag !== '10' &&
      tag !== '52' &&
      tag !== '49' &&
      tag !== '56' &&
      tag !== '34' &&
      tag !== ''
    )
      bodymsgarr.push(tag, '=', msg[tag], SOHCHAR);
  }

  const headermsg = headermsgarr.join('');
  const trailermsg = trailermsgarr.join('');
  const bodymsg = bodymsgarr.join('');

  const outmsgarr = [];
  outmsgarr.push('8=', fixVersion, SOHCHAR);
  outmsgarr.push('9=', headermsg.length + bodymsg.length + trailermsg.length, SOHCHAR);
  outmsgarr.push(headermsg);
  outmsgarr.push(bodymsg);
  outmsgarr.push(trailermsg);

  let outmsg = outmsgarr.join('');

  outmsg += '10=' + checksum(outmsg) + SOHCHAR;

  return outmsg;
};

export const convertToMap = (msg: string) => {
  const fix: any = {};
  const keyvals = msg.split(SOHCHAR);
  for (const kv in Object.keys(keyvals)) {
    const kvpair = keyvals[kv].split('=');
    fix[kvpair[0]] = kvpair[1];
  }
  return fix;
};
