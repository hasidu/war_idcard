export default function Request(type, url, data, cb){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {

      if (xhr.readyState === 4) {
          if (cb && xhr.response){
              if(typeof(xhr.response) === 'string'){
                  cb(JSON.parse(xhr.response));
              }else(
                  cb(xhr.response)
              )
          }
      }
  }
  
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}
