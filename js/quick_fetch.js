/****************************************************************************************
 * Author: Rahul Dhole
 * url: https://github.com/p1-rde/quickFetch
 * License: Open Source
 * Description: This is a jQuery plugin that allows you to fetch data from a JSON API and insert it into
 * your HTML without writing any JavaScript.
 * **************************************************************************************/

jQuery( document ).ready(function() {
  jQuery('[fetch]').each(function() {
    var url = jQuery(this).attr('fetch');
    var variable_name = jQuery(this).attr('data-save');
    var html = jQuery(this).html();

    jQuery.getJSON(url, function(data) {
      window[variable_name] = data;
      var regex = new RegExp('{' + variable_name + '.*?}', 'g');
      jQuery(this).html(html.replace(regex, function(match) {
        var data_attribute = match.replace('{', '').replace('}', '').split(variable_name)[1];
        if (data_attribute == '') {
          return JSON.stringify(window[variable_name]);
        } else {
          return eval(`window[variable_name]${data_attribute}`);
        }
      }));
    }.bind(this));
  });
});
