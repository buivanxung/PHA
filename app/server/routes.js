var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
// var EM = require('./modules/email-dispatcher');

var dot = require('dot-object')
const dgram = require('dgram');
var uint32 = require('uint32');
const server = dgram.createSocket('udp4');

var pg = require('pg')

var configpg = {
  user:'pha_meter',
  database: 'pha_data',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max:10,
  idleTimeoutMillis:30000,
};
var pool = new pg.Pool(configpg);
// var nodemailer = require('nodemailer');
// var hps = require('nodemailer-express-handlebars');

// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'anhxungce@gmail.com',
//     pass: 'Anhxung13521067'
//   }
// });

// transporter.use('compile',hps({
//   viewPath:'app/server/views',
//   extName:'.ejs'
// }))


module.exports = function(app) {

// main login page //
  app.get('/', function(req, res){
  	// check if the user's credentials are saved in a cookie //
  		if (req.cookies.user == undefined || req.cookies.pass == undefined){
  			res.render('login', { title: 'Hello - Please Login To Your Account' });
  		}	else{
  	// attempt automatic login //
  			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
  				if (o != null){
  				    req.session.user = o;
  					res.redirect('/home');
  				}	else{
  					res.render('login', { title: 'Hello - Please Login To Your Account' });
  				}
  			});
  		}
  	});

  app.post('/', function(req, res){
  		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
  			if (!o){
  				res.status(400).send(e);
  			}	else{
  				req.session.user = o;
  				if (req.body['remember-me'] == 'true'){
  					res.cookie('user', o.user, { maxAge: 900000 });
  					res.cookie('pass', o.pass, { maxAge: 900000 });
  				}
  				res.status(200).send(o);
  			}
  		});
  });

  // logged-in user homepage //

  app.get('/home', function(req, res) {
    if (req.session.user == null){
      res.redirect('/');
    }	else{
      pool.connect(function (err, client, done) {
        if (err) {
          return console.error('error fetching client from pool', err)
        }
        client.query("select * from db_meter", function (err, node1) {
          done();
          app.set('view engine', 'ejs');
           res.render("data.ejs",{list:node1});
             app.set('view engine', 'jade');
         });
  });
}
});
  app.get('/homedata', function(req, res) {
      if (req.session.user == null){
    // if user is not logged-in redirect back to login page //
        res.redirect('/');
      }	else{
        app.set('view engine', 'ejs');
        res.render('homedata', {
          title : 'Home',
          countries : CT,
          udata : req.session.user
        });
        app.set('view engine', 'jade');
      }
  });

  app.get('/user', function(req, res) {
  		if (req.session.user == null){
  	// if user is not logged-in redirect back to login page //
  			res.redirect('/');
  		}	else{
  			res.render('home', {
  				title : 'User',
  				countries : CT,
  				udata : req.session.user
  			});
  		}
  });

  app.post('/user', function(req, res){
  		if (req.session.user == null){
  			res.redirect('/');
  		}	else{
  			AM.updateAccount({
  				id		: req.session.user._id,
  				name	: req.body['name'],
  				email	: req.body['email'],
  				pass	: req.body['pass'],
  				country	: req.body['country']
  			}, function(e, o){
  				if (e){
  					res.status(400).send('error-updating-account');
  				}	else{
  					req.session.user = o;
  			// update the user's login cookies if they exists //
  					if (req.cookies.user != undefined && req.cookies.pass != undefined){
  						res.cookie('user', o.user, { maxAge: 900000 });
  						res.cookie('pass', o.pass, { maxAge: 900000 });
  					}
  					res.status(200).send('ok');
  				}
  			});
  		}
  });

  app.post('/logout', function(req, res){
  		res.clearCookie('user');
  		res.clearCookie('pass');
  		req.session.destroy(function(e){ res.status(200).send('ok'); });

  });

  // creating new accounts //

  app.get('/signup', function(req, res) {
  		res.render('signup', {  title: 'Signup', countries : CT });
  });

  app.post('/signup', function(req, res){
  		AM.addNewAccount({
  			name 	: req.body['name'],
  			email 	: req.body['email'],
  			user 	: req.body['user'],
  			pass	: req.body['pass'],
  			country : req.body['country']
  		}, function(e){
  			if (e){
  				res.status(400).send(e);
  			}	else{
  				res.status(200).send('ok');
  			}
  		});
  });

  // password reset //

  app.post('/lost-password', function(req, res){
  	// look up the user's account via their email //
  		AM.getAccountByEmail(req.body['email'], function(o){
  			if (o){
  				EM.dispatchResetPasswordLink(o, function(e, m){
  				// this callback takes a moment to return //
  				// TODO add an ajax loader to give user feedback //
  					if (!e){
  						res.status(200).send('ok');
  					}	else{
  						for (k in e) console.log('ERROR : ', k, e[k]);
  						res.status(400).send('unable to dispatch password reset');
  					}
  				});
  			}	else{
  				res.status(400).send('email-not-found');
  			}
  		});
  });

  app.get('/reset-password', function(req, res) {
  		var email = req.query["e"];
  		var passH = req.query["p"];
  		AM.validateResetLink(email, passH, function(e){
  			if (e != 'ok'){
  				res.redirect('/');
  			} else{
  	// save the user's email in a session instead of sending to the client //
  				req.session.reset = { email:email, passHash:passH };
  				res.render('reset', { title : 'Reset Password' });
  			}
  		})
  });

  app.post('/reset-password', function(req, res) {
  		var nPass = req.body['pass'];
  	// retrieve the user's email from the session to lookup their account and reset password //
  		var email = req.session.reset.email;
  	// destory the session immediately after retrieving the stored email //
  		req.session.destroy();
  		AM.updatePassword(email, nPass, function(e, o){
  			if (o){
  				res.status(200).send('ok');
  			}	else{
  				res.status(400).send('unable to update password');
  			}
  		})
  });

  // view & delete accounts //

  app.get('/print', function(req, res) {
  		AM.getAllRecords( function(e, accounts){
  			res.render('print', { title : 'Account List', accts : accounts });
  		})
  });

  app.post('/delete', function(req, res){
  		AM.deleteAccount(req.body.id, function(e, obj){
  			if (!e){
  				res.clearCookie('user');
  				res.clearCookie('pass');
  				req.session.destroy(function(e){ res.status(200).send('ok'); });
  			}	else{
  				res.status(400).send('record not found');
  			}
  	    });
  });

  app.get('/reset', function(req, res) {
  		AM.delAllRecords(function(){
  			res.redirect('/print');
  		});
  });


  function getdata( a, data) {
  	   //console.log(dot.pick(a,data));
  	   return dot.pick( a,data);
  };

  function hextoLSB (str) {
    return Buffer.from(str, 'hex').readInt32LE();
  }

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    try {
    var parse_data = JSON.parse(msg);
    }
    catch(e) {
     return console.error(e);
    }
    var liter = 0;
    var nodeeui = getdata('rx.moteeui', parse_data);
    var appeui = getdata('rx.appeui', parse_data);
    var port = getdata('rx.userdata.port', parse_data);
    var payload = getdata('rx.userdata.payload', parse_data);
    var num = getdata('rx.userdata.seqno', parse_data);
    console.log(num + " "+nodeeui+ " " + appeui + " " + port+ " " + payload +" " );
    if(nodeeui != null) {
      pool.connect(function (err, client, done) {
          if (err) {
            return console.error('error fetching client from pool', err)
          }
          var buf = new Buffer(payload,'base64');
          var phyPayload = buf.toString();
          var str = "";
          if (port == 14) {
            liter = hextoLSB(phyPayload);
            console.log(liter);
          }
          if (port == 24) {
            for (i  = 0; i < 8; i ++) {
              str +=phyPayload[i];
            }
            liter = hextoLSB(str);
          }
   client.query("INSERT INTO db_meter(num, nodeeui, appeui, port, phyPayload, liter, created_at, updated_at) VALUES('"+num+"','"+nodeeui+"','"+appeui+"','"+port+"','"+phyPayload+"','"+liter+"','Now()','Now()')", function(err, result) {
            done();
            if (err) {
              return console.error('error happened during query', err)
            }
          })
        })
      }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(9999);

  	 //////////////////////
  app.get("/raw", function(req,res) {
    if (req.session.user == null){
      res.redirect('/home');
    }	else{
  		 res.render("dataraw.ejs");
     }
  });
  app.get("/visualize", function(req,res) {
    if (req.session.user == null){
      res.redirect('/');
    }	else{
      pool.connect(function (err, client, done) {
        if (err) {
          return console.error('error fetching client from pool', err)
        }
        client.query("select rssi, created_at from lora_imst where device_name = 'Node_1'", function (err, node1) {
          done();
          if (err) {
            res.end();}
            client.query("select rssi, created_at from lora_imst where device_name = 'Node_2'", function (err, node2) {
              done();
              if (err) {
                res.end();}
                client.query("select rssi, created_at from lora_imst where device_name = 'Node_3'", function (err, node3) {
                  done();
                  if (err) {
                    res.end();}
                    client.query("select rssi, created_at from lora_imst where device_name = 'Node_4'", function (err, node4) {
                      done();
                      if (err) {
                        res.end();}
                        client.query("select rssi, created_at from lora_imst where device_name = 'Node_5'", function (err, node5) {
                          done();
                          if (err) {
                            res.end();}
                            client.query("select rssi, created_at from lora_imst where device_name = 'Node_6'", function (err, node6) {
                              done();
                              if (err) {
                                res.end();}
                                client.query("select rssi, created_at from lora_imst where device_name = 'Node_7'", function (err, node7) {
                                  done();
                                  if (err) {
                                    res.end();}
                                    client.query("select rssi, created_at from lora_imst where device_name = 'Node_8'", function (err, node8) {
                                      done();
                                      if (err) {
                                        res.end();}
                                        client.query("select rssi, created_at from lora_imst where device_name = 'Node_9'", function (err, node9) {
                                          done();
                                          if (err) {
                                            res.end();}
           res.render("visualize.ejs",{listN1:node1,
                                    listN2:node2,
                                    listN3:node3,
                                    listN4:node4,
                                    listN5:node5,
                                    listN6:node6,
                                    listN7:node7,
                                    listN8:node8,
                                    listN9:node9
               }); //render
              });
             });
            });
           });
          });
         });
        });
       });
      });
     });
   }
  });
  app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
