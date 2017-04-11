this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["test_01"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "	<h2>By "
    + alias2((helpers.fullName || (depth0 && depth0.fullName) || alias1).call(depth0,(depth0 != null ? depth0.author : depth0),{"name":"fullName","hash":{},"data":data}))
    + "</h2>\n	<div class=\"body\">"
    + alias2(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n	<meta charset=\"UTF-8\">\n	<title>Document</title>\n</head>\n<body>\n\n\n<div class=\"post\">\n	<h1>By "
    + alias2((helpers.fullName || (depth0 && depth0.fullName) || alias1).call(depth0,(depth0 != null ? depth0.author : depth0),{"name":"fullName","hash":{},"data":data}))
    + "</h1>\n	<div class=\"body\">"
    + alias2(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper)))
    + "</div>\n	<span>Test one</span>\n	<h1>Comments</h1>\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n	\n</body>\n</html>";
},"useData":true});