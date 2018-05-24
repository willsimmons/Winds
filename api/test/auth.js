var request = require('request')
var expect = require('chai').expect
var suite = require('./suite')
import config from "../src/config"
import logger from "../src/utils/logger"
import dbPromise from  "../src/utils/db"

describe('Color Code Converter API', async function() {
  // setup an empty mongodb test database
  // setup configs for testing
  // start a test webserver
  if (config.env != "test") {
    logger.warn(`config has the wrong env for testing ${config.env}`)
  }
  if (process.env.NODE_ENV != "test") {
    logger.warn(`wrong env set for testing ${process.env.NODE_ENV}`)
  }
  if (config.database.uri.indexOf('localhost') == -1) {
    logger.warn(`mongodb database uri is not configured for testing ${config.database.uri}`)
  } else {
    let db = await dbPromise

    var names = Object.keys(data.collections)
    async.each(name, function(name, cb) {
      db.createCollection(name, function(err, collection) {
        if (err) return cb(err)
        collection.insert(data.collections[name], cb)
      })
    })
    // This is faster then dropping the database
    db.collections(function(err, collections) {
      async.each(collections, function(collection, cb) {
        if (collection.collectionName.indexOf('system') === 0) {
          return cb()
        }
        collection.remove(cb)
      })
    })
  }
  if (~config.cache.uri.indexOf('localhost')) {
    logger.warn(`redis uri is not configured for testing`)
  }
  console.log(1)



	describe('RGB to Hex conversion', function() {
		var url = 'http://localhost:3000/rgbToHex?red=255&green=255&blue=255';

		it('returns status 200', function(done) {
			request(url, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('returns the color in hex', function(done) {
			request(url, function(error, response, body) {
				expect(body).to.equal('ffffff');
				done();
			});
		});
	});

	describe('Hex to RGB conversion', function() {
		var url = 'http://localhost:3000/hexToRgb?hex=00ff00';

		it('returns status 200', function(done) {
			request(url, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('returns the color in RGB', function(done) {
			request(url, function(error, response, body) {
				expect(body).to.equal('[0,255,0]');
				done();
			});
		});
	});
});
