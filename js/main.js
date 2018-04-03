var wikiAPI = {
  init: function() {
    this.cacheDom();
    this.render();
    this.bindEvents();
  },

  Cache: {},

  cacheDom: function() {
    this.Cache.$button = $( '.js-refresh-article' );
    this.Cache.$header = $( '.js-article-header' );
    this.Cache.$content = $( '.js-article-content' );
  },

  render: function() {
    this.getPages();
  },

  bindEvents: function() {
    this.Cache.$button.on( 'click', function( e ) {
      wikiAPI.getPages();
    });
  },

  getPages: function() {
    var wikiURL = 'https://en.wikipedia.org/w/api.php';

    $.ajax({
    	type: 'GET',
    	url: wikiURL,
    	data: {
        action: 'query',
        format: 'json',
        generator: 'random',
        grnlimit: '10',
        prop: 'extracts',
        exsentences: '10',
      	exlimit: 'max',
      	exintro: 1,
      	explaintext: 1,
      	exsectionformat: 'plain',
      	excontinue: '1',
        grnnamespace: '0'
      },
    	dataType: 'jsonp',
      headers: {
        'Api-User-Agent': 'Test/1.0'
      },
    	success: function( jsondata ) {
        for ( var i in jsondata.query.pages ) {
          if ( jsondata.query.pages.hasOwnProperty( i ) ) {
            wikiAPI.Cache.$header.html( jsondata.query.pages[i].title );
            wikiAPI.Cache.$content.html( jsondata.query.pages[i].extract );
          }
        }
    	}
    });
  }
}

wikiAPI.init();
