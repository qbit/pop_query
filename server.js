#!/usr/bin/env node

var http = require( 'http' ),
pg = require( 'pg' ),
server;

server = http.createServer( function( req, res ) {
  var data = [];

  req.on( 'data', function( chunk ) {
    data.push( chunk );
  });

  req.on( 'end', function() {
    var geoj = JSON.parse( data.join( '' ).toString() );

    // pass the majobber back to postgres and do an ST_Contains kinda
    // query - pass back awesomesauce
    geoj.features.forEach( feat, idx ) {
      feat.properties = feat.properties || {};

      if ( feat.properties.population ) {
        feat.properties.population = 0;
      }
    });

    
    res.writeHead( 200, { 'Content-Type': 'applicatoin/json' } );
    res.end( JSON.stringify({}) );
  });
}).listen( 3030 );
