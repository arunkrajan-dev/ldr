Meteor.methods({
    "getFileFromGdrive": function() {
       var url = "https://www.googleapis.com/drive/v2/files/1ixJSZ3JILNJqzHZV6KAI9mlV4pObhzX8L_Gx2IguXfk";
       console.log("====== START - GDrive Get File =======");
       try {
       var result = Meteor.http.get(url, {
           'headers' : { 
             'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
             'Content-Type': 'application/json' 
           },
         });
        console.log("Result: ", JSON.stringify(result.data.title, null, 4));
        return JSON.stringify(result.data.title, null, 4);
       } catch(error){
           console.log("***** [ERROR] -  " + error);
           if (error && error.response && error.response.statusCode == 401) {
   		      console.log("[INFO] Calling ExangeRefresh Token ");
   		      Meteor.call('exchangeRefreshToken', function (error) {
   		    	console.log("[INFO] Exchange call back return msg - ", error);
   		    		    	if (error)
   		    		    		return error;
   		    		    	console.log("[INFO] Calling getFileFromGdrive after token refersh");
   		    		    	getFileFromGdrive();
   		    		    });
   		    	}
       } finally {
         console.log("===== END - GDrive Get File =====");
         //return true;  
       }
    },    
    
    "createGdriveFolder": function(title, caseId) {

        var url = "https://www.googleapis.com/drive/v2/files";
        console.log("====== START - GDrive Create Folder =======");
        try {
        var result = Meteor.http.post(url, {
            'headers' : { 
              'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
              'Content-Type': 'application/json' 
            },
            'data': {
                 "mimeType": "application/vnd.google-apps.folder",
                 "title": title,
                 "folderColorRgb": "orange"
            }
          });
        console.log("[INFO] Folder Id: ", result.data.id);
        Caseprofile.update({ _id: caseId }, { $set: {"folderId": result.data.id}});
        return result.data.id;
        } catch(error){
            console.log("***** [ERROR] " + error);
            if (error && error.response && error.response.statusCode == 401) {
    		      console.log("[INFO] Calling ExangeRefresh Token ");
    		      Meteor.call('exchangeRefreshToken', function (error) {
    		    	console.log("[INFO] Exchange call back return msg - ", error);
    		    		    	if (error)
    		    		    		return error;
    		    		    	console.log("[INFO] Calling createGdriveFolder after token refersh", title);
    		    		    	createGdriveFolder(title, caseId);
    		    		    });
    		    	}
        } finally {
          console.log("===== END - GDrive Create Folder =====");
          return true;  
        }
            
    },
    
   "listFilesFromGdrive": function() {
       return "List Of Files From Gdrive";
   },
   
   "uploadFileToGdrive": function() {
       return "File Uploaded To Gdrive";
   },
   
   "deleteFileFromGdrive": function() {
       return "Given file is deleted";
   }
});