function processData(data) {
  $('#signOnUrl').html(data["signOnUrl"]);
  $('#signOutUrl').html(data["signOutUrl"]);
  $('#changePasswordUrl').html(data["changePasswordUrl"]);
  $('#downloadCertificate').html('<a href="' + data["idpCertDownload"] + '">' + data["idpCertDownload"] + '</a>');
   $('#downloadCertificatePem').html('<a href="' + data["idpCertDownload"] + '?fileExtension=pem">' + data["idpCertDownload"] + '</a>');
  $('#idpMetadata').html(data["idpMetadata"]);
  $('#x509CertText').html(data["x509CertText"]);
  $('#x509CertTextPem').html(data["x509CertTextPem"]);
  $('#x509CertTextPem').css("white-space", "pre");
  $('#certFingerPrint').html(data["certFingerPrint"]);
  $('#validFrom').html(data["validFrom"]);
  $('#validTo').html(data["validTo"]);
  $('#issuer').html(data["issuer"]);
$('#metadataUrl').html(data["signOnUrl"]);
 $('#errorUrl').html(data["signOutUrl"]);
 $('#timeoutUrl').html(data["signOutUrl"]);
 $('#delAuthUrl').html(data["delAuthUrl"]);
 $('#saml11SignOnUrl').html(data["saml11SignOnUrl"]);    
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
$(document).ready(function($) {
  // This condition is to ensure that the ajax api code is executed only on the intended pages
  if ($('#loginAdminApp').length > 0) {
    var app = getURLParameter('app');
    var subdomain = getURLParameter('subdomain');
    var instanceId = getURLParameter('instanceId');
    var baseAdminUrl = getURLParameter('baseAdminUrl');
    var url;
    if ((subdomain == null && baseAdminUrl == null) || app == null || instanceId == null) {
      $('#loginAdminApp').show();
    } else {
      var endpoint = '/api/internal/v1/setup/help/saml/' + app + '/' + instanceId + '?callback=processData';
      if (baseAdminUrl) {
        url = baseAdminUrl + endpoint;
      } else if (subdomain) {
        url = 'https://' + subdomain + '.okta-admin.com' + endpoint;
      }
      $.ajax({
        type: 'GET',
        url: url,
        jsonp: false,
        jsonpCallback: 'processData',
        dataType: 'jsonp',
        success: function(json) {
          $('#loginAdminApp').hide();
        },
        error: function(e,jqXHR,ajaxSettings,thrownError) {
          $('#loginAdminApp').show();
        },
        timeout: 3000
      });
    }
  }
});
