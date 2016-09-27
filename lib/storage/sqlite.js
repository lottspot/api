'use strict';

/**
 * sqlite.js
 * @file Implementation of a sqlite3 backed storage class
 */

 /**
  * Accept attributes used to consruct an API object
  *
  * @callback apiObjectFactory
  * @param {Error}  err
  * @param {Object} attrs
  */

var sqlite3 = require('sqlite3');

/** @class */
function Storage(path){
  this.db = new sqlite3.Database(path);
}

/**
 * Retrieve CampaignInfo attributes by id
 *
 * @param {Number} id
 * @param {apiObjectFactory} cb
 */
Storage.prototype.get_campaigninfo = function(id, cb){
  stmt = this.db.prepare('SELECT * FROM campaign_info WHERE campaign_id = ?')
  stmt.get(id, cb)
};

/**
 * Retrieve CandidateInfo attributes by
 * id of an associated campaign
 *
 * @param {Number} id
 * @param {apiObjectFactory} cb
 */
Storage.prototype.get_candidateinfo_by_campaign(id, cb){
  stmt = this.db.prepare(
    'SELECT cd.candidate_id, cd.candidate_name FROM canidate_info AS cd ' +
    'JOIN campaign_info AS cp ON cd.candidate_id = cp.candidate_id '      +
    'WHERE cp.campaign_id = ?'
  );
  stmt.get(id, cb)
};

module.exports = Storage
