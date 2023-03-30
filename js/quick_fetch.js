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

    jQuery.getJSON(url, function(data) {
      var variable_name = jQuery(this).attr('name') || jQuery(this).attr('id');
      window[variable_name] = data;
      replace(this, variable_name);
      replaceLoops(this, variable_name);
      window[variable_name] = null;
    }.bind(this));
  });
});

function replace(scope, variable_name) {
  var html = jQuery(scope).html();
  var regex = new RegExp('{' + variable_name + '.*?}', 'g');

  jQuery(scope).html(html.replace(regex, function(match) {
    var data_attribute = match.replace('{', '').replace('}', '').split(variable_name)[1];
    if (data_attribute == '') {
      return JSON.stringify(window[variable_name]);
    } else {
      return eval(`window[variable_name]${data_attribute}`);
    }
  }));
}

function replaceLoops(scope, variable_name) {
  var foreach_regex = new RegExp('<foreach.*?>.*?</foreach>', 'gs');
  var html = jQuery(scope).html();
  var matches = html.match(foreach_regex);
  if (!matches) return;
  var loop_variable = matches[0].match(/data="(.*?)"/)[1];
  if (loop_variable && loop_variable != variable_name) return;

  //looping attributes are {*}: <h1>{title}</h1><p>{description}</p><p>{ingredients}</p>
  // target is eval(`window[variable_name]${each_data_attribute}`);
  var loop_attributes_regex = new RegExp('{(.*?)}', 'g');
  var loop_attributes = matches[0].match(loop_attributes_regex);

  console.log(matches);
  console.log(variable_name);
  console.log(loop_attributes);
  var loop_html = matches[0];
  // console.log("sample:" + eval(`window[variable_name]${loop_attributes[0]}`));
}

