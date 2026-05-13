import handler from '../api/index.js';
import { EventEmitter } from 'events';

class MockRequest extends EventEmitter {
  constructor(url, method = 'GET', headers = {}) {
    super();
    this.url = url;
    this.method = method;
    this.headers = {
      host: 'localhost',
      ...headers
    };
  }
}

class MockResponse extends EventEmitter {
  constructor() {
    super();
    this.statusCode = 200;
    this.headers = {};
    this.body = '';
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }

  end(content) {
    if (content) this.body += content;
    this.emit('finish');
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(obj) {
    this.setHeader('Content-Type', 'application/json');
    this.body = JSON.stringify(obj);
    this.emit('finish');
  }
}

async function runTest() {
  console.log('--- Testing / ---');
  const req = new MockRequest('/');
  const res = new MockResponse();
  
  res.on('finish', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    if (res.body.includes('This page didn\'t load')) {
      console.log('RESULT: FAILED (Error page rendered)');
    } else if (res.body.includes('<!doctype html>')) {
      console.log('RESULT: SUCCESS (HTML rendered)');
    } else {
      console.log('RESULT: UNKNOWN');
      console.log('Body snippet:', res.body.substring(0, 200));
    }
  });

  try {
    await handler(req, res);
  } catch (err) {
    console.error('CRASH in handler:', err);
  }
}

runTest();
